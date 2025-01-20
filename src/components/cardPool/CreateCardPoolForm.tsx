import React, { useState } from 'react';
import { createCardPool } from '../../utils/cardPool.utils';
import { CardPool } from '../../types/cardPool.types';
// import useUserContext from '../../hooks/useUserContext';

const CreateCardPoolForm: React.FC = () => {
  const [name, setName] = useState('');
  const [ruleSet, setRuleSet] = useState('');
  const [cardSets, setCardSets] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const { setCurrentCardPool } = useUserContext();

  const handleSubmitNewCardPool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCardPool: CardPool = { name, ruleSet, cardSets, cards: [] };
      const response = await createCardPool(newCardPool);
      setSuccessMessage('Card pool created successfully!');

      console.log("response", response);
      // setCurrentCardPool(response.data);
    } catch {
      setError('Error creating card pool');
    }
  };

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-md">
      <h3 className="text-xl font-bold">Create New Card Pool</h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmitNewCardPool}>
        <input
          type="text"
          className="p-2  border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Card Pool Name"
          required
        />
        <input
          type="text"
          className="p-2  border border-gray-300 rounded-md"
          value={ruleSet}
          onChange={(e) => setRuleSet(e.target.value)}
          placeholder="Rule Set"
        />
        <input
          type="text"
          className="p-2  border border-gray-300 rounded-md"
          value={cardSets.join(',')}
          onChange={(e) => setCardSets(e.target.value.split(','))}
          placeholder="Card Sets"
        />
        <button type="submit" className="w-fit bg-blue-500 text-white p-2 rounded-md">Create Card Pool</button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default CreateCardPoolForm;
