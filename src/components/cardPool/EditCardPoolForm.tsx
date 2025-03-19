import React from 'react';
import useCardPool from '../../context/cardPools/useCardPool';
import AddCardToPoolForm from './AddCardToPoolForm';
import CardPoolCsvUpload from './CardPoolCsvUpload';

const EditCardPoolForm: React.FC = () => {
  const { currentCardPool } = useCardPool();

  return (
    <div className="flex flex-col">
      {currentCardPool ? (
        <div className="flex flex-col bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Edit Card Pool: {currentCardPool.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Add Cards</h3>
              <AddCardToPoolForm />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Bulk Import</h3>
              <CardPoolCsvUpload />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-lg text-gray-600">No card pool selected</h2>
          <p className="text-gray-500 mt-2">Please select or create a card pool to edit</p>
        </div>
      )}
    </div>
  );
};

export default EditCardPoolForm;