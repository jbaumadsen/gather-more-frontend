// a form to edit a card pool primarily for adding/removing cards from the pool
// the form should have a pane with the images of the cards in the pool just the top of each card should be visible until the user hovers over the card
// clicking on a card should remove it from the pool

// there should be an input that allows the user to search for a card by name that updates as the user types with the next 10 results of the search pressing enter should add the top suggested card to the pool

// toggle buttons for the sets that exist in the db should be visible and the user should be able to select which sets they want to include in the pool
// the user should be able to save the changes

// import { useState } from 'react';
// import useUserContext from '../../hooks/useUserContext';
import React, { useEffect } from 'react';
import useUserContext from '../../hooks/useUserContext';
import AddCardToPoolForm from './AddCardToPoolForm';
import { updateCardPool } from '../../utils/cardPool.utils';

const EditCardPoolForm: React.FC = () => {
  const { currentCardPool } = useUserContext();

  // useEffect(() => {
  //   console.log(currentCardPool);
  // }, [currentCardPool]);

  const handleSave = async () => {
    if (currentCardPool) {
      await updateCardPool(currentCardPool);
    }
  }

  return (
    <div className="flex flex-col ">
      {currentCardPool ? (
        <div className="flex flex-col bg-green-100">
          <h2>Edit Card Pool: {currentCardPool.name}</h2>
          <AddCardToPoolForm />
          <button className="bg-blue-500 text-white rounded-md p-2 w-1/4" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>No card pool selected</h2>
        </div>
      )}
    </div>
  );
};

export default EditCardPoolForm;
