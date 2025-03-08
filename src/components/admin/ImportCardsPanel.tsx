// components/sets/ImportCardsPanel.tsx
import React from 'react';
import FileUploadInput from './FileUploadInput';
import { Card } from '../../types/card.types';

interface ImportCardsPanelProps {
  onFileLoaded: (data: Card[]) => void;
  isDataLoaded: boolean;
  cardsCount: number;
  importError: string | null;
}

const ImportCardsPanel: React.FC<ImportCardsPanelProps> = ({ 
  onFileLoaded, 
  isDataLoaded, 
  cardsCount,
  importError 
}) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
      <h2 className="text-lg font-semibold mb-2">Import Cards</h2>
      <FileUploadInput 
        onFileLoaded={onFileLoaded} 
        accept=".json"
        label="Upload MTG Cards JSON File (default-cards.json)" 
      />
      
      {isDataLoaded && (
        <div className="mt-2 p-2 bg-green-100 text-green-800 rounded-md">
          ✅ Cards data loaded successfully ({cardsCount} cards)
        </div>
      )}
      
      {importError && (
        <div className="mt-2 p-2 bg-red-100 text-red-800 rounded-md">
          ❌ Error: {importError}
        </div>
      )}
    </div>
  );
};

export default ImportCardsPanel;