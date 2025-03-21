// components/sets/ManageSetsTable.tsx
import React, { useState } from 'react';
import useCardLibrary from "../../context/useCardLibraryContext";
import ImportCardsPanel from './ImportCardsPanel';
import SetsList from './SetsList';
import { Card } from '../../types/card.types';

const ManageSetsTable: React.FC = () => {
  const { sets } = useCardLibrary();
  const [cardsData, setCardsData] = useState<Card[] | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importingSetId, setImportingSetId] = useState<string | null>(null);
  const [importProgress, setImportProgress] = useState<{ current: number, total: number } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  // Handle data loaded from file input
  const handleFileLoaded = (data: Card[]) => {
    setCardsData(data);
    setIsDataLoaded(true);
  };

  // Update import progress
  const updateImportProgress = (current: number, total: number) => {
    setImportProgress({ current, total });
  };

  // Set importing status
  const setImportingStatus = (isImporting: boolean, setId: string | null = null, error: string | null = null) => {
    setIsImporting(isImporting);
    setImportingSetId(setId);
    if (error !== undefined) {
      setImportError(error);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Manage Sets</h1>
      
      {/* Import panel component */}
      <ImportCardsPanel 
        onFileLoaded={handleFileLoaded}
        isDataLoaded={isDataLoaded}
        cardsCount={cardsData?.length || 0}
        importError={importError}
      />
      
      {/* Sets table component */}
      <SetsList 
        sets={sets}
        cardsData={cardsData}
        isDataLoaded={isDataLoaded}
        isImporting={isImporting}
        importingSetId={importingSetId}
        importProgress={importProgress}
        onImportStatusChange={setImportingStatus}
        onImportProgressUpdate={updateImportProgress}
      />
    </div>
  );
};

export default ManageSetsTable;