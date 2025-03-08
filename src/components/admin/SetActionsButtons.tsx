// components/sets/SetActionsButtons.tsx
import React, { useState } from 'react';
import { SetService } from "../../services/set.service";
import useUserContext from "../../hooks/useUserContext";
import { Set } from '../../types/set.types';
import { Card } from '../../types/card.types';
import EditSetForm from './EditSetForm';

interface SetActionsButtonsProps {
  set: Set;
  cardsData: Card[] | null;
  isDataLoaded: boolean;
  isImporting: boolean;
  onImportStatusChange: (isImporting: boolean, error: string | null) => void;
  onImportProgressUpdate: (current: number, total: number) => void;
}

const SetActionsButtons: React.FC<SetActionsButtonsProps> = ({ 
  set, 
  cardsData,
  isDataLoaded,
  isImporting,
  onImportStatusChange,
  onImportProgressUpdate
}) => {
  const { token, setSets } = useUserContext();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleImportSetCards = async () => {
    // Early return if required data is missing
    if (!token || !cardsData || !isDataLoaded) {
      return;
    }

    onImportStatusChange(true, null);
    
    try {
      const setCards = cardsData.filter((card) => 
        card.set.toLowerCase() === set.setCode.toLowerCase()
      );

      console.log("setCards in handleImportSetCards from SetActionsButtons.tsx ln 41: ", setCards.length);
      
      if (setCards.length === 0) {
        onImportStatusChange(false, `No cards found for set ${set.name} (code: ${set.setCode})`);
        return;
      }
      
      // Set up a listener for batch updates
      const originalFetch = window.fetch;
      window.fetch = function(input, init) {
        const response = originalFetch(input, init);
        
        if (typeof input === 'string' && 
            input.includes('/admin/sets/import-cards') && 
            init?.body) {
          try {
            const body = JSON.parse(init.body.toString());
            if (body.batchNumber && body.totalBatches) {
              onImportProgressUpdate(body.batchNumber, body.totalBatches);
            }
          } catch (e) {
            console.log("Parsing error:", e);
          }
        }
        
        return response;
      };
      
      await SetService.importSetCards(set, token, setCards);
      
      // Restore original fetch
      window.fetch = originalFetch;
      
      setSets(await SetService.fetchSets());
      onImportStatusChange(false, null);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during import";
      onImportStatusChange(false, errorMessage);
    }
  };

  const handleDeleteSetCards = async () => {
    if (!token) return;
    
    if (window.confirm(`Are you sure you want to delete all cards from ${set.name}?`)) {
      try {
        await SetService.removeSetCards(set);
        setSets(await SetService.fetchSets());
      } catch (error) {
        console.error("Error deleting set cards:", error);
        alert("Failed to delete set cards");
      }
    }
  };

  const handleSetUpdate = async (updatedSet: Set) => {
    if (!token) return;
    
    try {
      // Make sure the _id is included in the updatedSet
      const setToUpdate = {
        ...updatedSet,
        _id: set._id // Ensure the _id is passed from the original set
      };
      
      await SetService.updateSet(token, setToUpdate);
      setSets(await SetService.fetchSets());
      setShowEditForm(false);
    } catch (error) {
      console.error("Error updating set:", error);
      alert("Failed to update set");
    }
  };

  const handleDeleteSet = async () => {
    if (!token) return;
    
    if (window.confirm(`Are you sure you want to delete ${set.name}?`)) {
      try {
        await SetService.deleteSet(set._id);
        setSets(await SetService.fetchSets());
      } catch (error) {
        console.error("Error deleting set:", error);
        alert("Failed to delete set");
      }
    }
  };

  // Always render the component, but control button states based on data availability
  return (
    <div>
      <div className="flex justify-center space-x-2">
        <button
          className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => setShowEditForm(true)}
        >
          Edit
        </button>
        
        {set.isImported ? (
          <button
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDeleteSetCards}
            disabled={!token}
          >
            Delete Cards
          </button>
        ) : (
          <button
            className={`px-2 py-1 rounded ${
              isDataLoaded && !isImporting
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleImportSetCards}
            disabled={!isDataLoaded || isImporting || !token}
          >
            {isImporting ? 'Importing...' : 'Import Cards'}
          </button>
        )}
        <button
          className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={handleDeleteSet}
          disabled={!token}
        >
          Delete Set
        </button>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Set</h2>
            <EditSetForm 
              set={set} 
              onSubmit={handleSetUpdate}
              onCancel={() => setShowEditForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SetActionsButtons;