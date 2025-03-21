import React from 'react';
import CardPoolCsvUpload from './CardPoolCsvUpload';
import useCardPool from '../../context/useCardPoolContext';

const BulkAddTab: React.FC = () => {
  const { currentCardPool } = useCardPool();

  if (!currentCardPool) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please select a card pool first</p>
        <p className="mt-2 text-sm text-gray-400">
          Go to the "Create Card Pool" tab to create or select a card pool
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Bulk Adding to: {currentCardPool.name}</h2>
        <p className="text-sm text-gray-600">
          Upload a CSV file to add multiple cards to your card pool at once.
        </p>
      </div>
      <CardPoolCsvUpload />
    </div>
  );
};

export default BulkAddTab;