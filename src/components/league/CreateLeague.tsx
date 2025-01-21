import React, { useState } from 'react';
import useUserContext from '../../hooks/useUserContext';
import { League } from '../../types/league.types';

const CreateLeague: React.FC = () => {
  const [name, setName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [ruleSet, setRuleSet] = useState('');
  const [cardSets, setCardSets] = useState('');
  const [hasDraft, setHasDraft] = useState(false);
  const [successMessage] = useState('');
  const [error, setError] = useState('');
  const [showCreateLeague, setShowCreateLeague] = useState(false);
  const { getLeagueData, createLeague } = useUserContext();

  const handleSubmitNewLeague = async (e: React.FormEvent) => {
    const splitCardSets = cardSets.split(',') || [];

    e.preventDefault();
    await createLeague({ name, maxPlayers, ruleSet, cardSets: splitCardSets, hasDraft } as League).catch(
      (error: Error) => {
        console.error("Error creating league", error);
        setError('Error creating league');
      }
    );
    getLeagueData();
    // console.log("league created : ", ownedLeagues);
  };

  return (
    <>
      
      <div className="mt-4 bg-gray-100 p-4 rounded-md">
      <button onClick={() => setShowCreateLeague(!showCreateLeague)} className="text-xl font-bold">Create New League</button>
      {showCreateLeague && 
        <form className="flex flex-col gap-2" onSubmit={handleSubmitNewLeague}>
          <input
            type="text"
            className="p-2  border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="League Name"
            required
          />
          <input
            type="number"
            className="p-2  border border-gray-300 rounded-md"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
            placeholder="Max Players"
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
            value={cardSets}
            onChange={(e) => setCardSets(e.target.value)}
            placeholder="Card Sets"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasDraft}
              onChange={() => setHasDraft(!hasDraft)}
            />
            Has Draft
          </label>
          <button type="submit" className="w-fit bg-blue-500 text-white p-2 rounded-md">Create League</button>
        </form>
      }
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
    {/* <button onClick={() => setShowCreateLeague(!showCreateLeague)} className="bg-gray-500 text-white p-2 rounded-md">Create League</button> */}
    </>
  );
};

export default CreateLeague;
