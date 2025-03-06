import React, { useState } from 'react';
import useUserContext from "../../hooks/useUserContext";
import { importSetCards, deleteSetCards } from "../../services/cards.services";
import { fetchSets } from "../../services/set.services";
import FileUploadInput from './FileUploadInput';
import { Card } from '../../types/card.types';

const ManageSetCardsButtons: React.FC = () => {
  const { token, sets, setSets } = useUserContext();
  const [cardsData, setCardsData] = useState<Card[] | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importProgress, setImportProgress] = useState<{ current: number, total: number } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const handleFileLoaded = (data: Card[]) => {
    setCardsData(data);
    setIsDataLoaded(true);
    console.log("Cards data loaded successfully", data.length, "cards");
  };

  const handleImportSetCards = async (setName: string) => {
    if (!cardsData) {
      alert("Please upload the cards JSON file first");
      return;
    }

    setIsImporting(true);
    setImportProgress({ current: 0, total: 0 });
    setImportError(null);

    const set = sets.find((set) => set.name === setName);
    console.log("setName", setName);
    console.log("set", set);
    
    if (token && set) {
      try {
        // Set up a listener for batch updates
        const originalFetch = window.fetch;
        window.fetch = function(input, init) {
          const response = originalFetch(input, init);
          
          // If this is a batch request and contains batch information
          if (typeof input === 'string' && 
              input.includes('/admin/sets/import-cards') && 
              init?.body) {
            try {
              const body = JSON.parse(init.body.toString());
              if (body.batchNumber && body.totalBatches) {
                setImportProgress({ 
                  current: body.batchNumber, 
                  total: body.totalBatches 
                });
              }
            } catch (e) {
              // Ignore parsing errors
              console.log("Parsing error:", e);
            }
          }
          
          return response;
        };
        
        const response = await importSetCards(set, token, cardsData);
        console.log("response", response);
        
        // Restore original fetch
        window.fetch = originalFetch;
        
        setSets(await fetchSets(token));
      } catch (error: unknown) {
        console.error("Import error:", error);
        setImportError(error instanceof Error ? error.message : "An error occurred during import");
      } finally {
        setIsImporting(false);
      }
    } else {
      console.log("No token found");
      setIsImporting(false);
    }
  }

  const handleDeleteSetCards = async (setName: string) => {
    const set = sets.find((set) => set.name === setName);
    
    if (token && set) {
      const response = await deleteSetCards(set, token);
      console.log("response", response);
      setSets(await fetchSets(token));
    } else {
      console.log("No token found");
    }
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Manage Set Cards</h1>
      
      {/* File Upload Component */}
      <FileUploadInput 
        onFileLoaded={handleFileLoaded} 
        accept=".json"
        label="Upload MTG Cards JSON File (default-cards.json)" 
      />
      
      {isDataLoaded && (
        <div className="p-2 mb-4 bg-green-100 text-green-800 rounded-md">
          ✅ Cards data loaded successfully ({cardsData?.length || 0} cards)
        </div>
      )}
      
      {isImporting && (
        <div className="p-3 mb-4 bg-blue-100 text-blue-800 rounded-md">
          <div className="flex items-center mb-2">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium">Importing cards...</span>
          </div>
          
          {importProgress && (
            <div>
              <div className="w-full bg-blue-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(importProgress.current / importProgress.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                Processing batch {importProgress.current} of {importProgress.total}
              </p>
            </div>
          )}
        </div>
      )}
      
      {importError && (
        <div className="p-2 mb-4 bg-red-100 text-red-800 rounded-md">
          ❌ Error: {importError}
        </div>
      )}
      
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-xl font-bold">Not Imported Sets</h2>
          {sets
            .filter(set => !set.isImported)
            .map((set) => (
              <div key={set._id} className="flex items-center">
                <button 
                  className={`${isDataLoaded ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'} text-white p-2 rounded-md`} 
                  onClick={() => handleImportSetCards(set.name)}
                  disabled={!isDataLoaded}
                >
                  {set.name}
                </button>
                {!isDataLoaded && (
                  <span className="ml-2 text-sm text-gray-500">
                    (upload JSON first)
                  </span>
                )}
              </div>
            ))
          }
        </div>
        
        <div className="flex flex-col gap-4 w-1/2">
          <h2 className="text-xl font-bold">Imported Sets</h2>
          {sets
            .filter(set => set.isImported)
            .map((set) => (
              <div key={set._id}>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md" 
                  onClick={() => handleDeleteSetCards(set.name)}
                >
                  {set.name}
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ManageSetCardsButtons;