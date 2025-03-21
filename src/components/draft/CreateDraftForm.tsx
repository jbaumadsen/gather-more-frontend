import { createDraft } from "../../services/draft.service";
import { Draft } from "../../types/draft.types";
import { useState, useEffect } from "react";
import { CardPool } from "../../types/cardPool.types";
import useSeasonContext from "../../context/useSeasonContext";
import useCardPoolContext from "../../context/useCardPoolContext";


const CreateDraftForm: React.FC = () => {
  const { currentSeason, getSeasonData } = useSeasonContext();
  const { cardPools } = useCardPoolContext();
  const [selectedCardPool, setSelectedCardPool] = useState<CardPool | null>(null);
  const [packStructure, setPackStructure] = useState({rare: 1, uncommon: 2, common: 3});
  const [numberOfRounds, setNumberOfRounds] = useState<number>(3);

  useEffect(() => {
    setSelectedCardPool(cardPools[0]);
  }, [cardPools]);


  const handleCreateDraft = async () => {
    console.log("currentSeason", currentSeason);
    console.log("selectedCardPool", selectedCardPool);
    console.log("cardPools", cardPools);
    const newDraft: Draft = {
      name: "Draft 1",
      seasonId: currentSeason?._id || '',
      cardPoolId: selectedCardPool?._id || '',
      teams: currentSeason?.teams || [],
      status: 'pending',
      currentRound: 1,
      packStructure: packStructure,
      packs: [],
      rounds: numberOfRounds
    };
    await createDraft(newDraft);
    getSeasonData();
  };


  return (
    <>
      {currentSeason?.draft ? (
        <>
          <h3 className="text-lg font-semibold">Current Draft: {currentSeason?.draft}</h3>
          <div className="text-sm text-gray-500">{JSON.stringify(currentSeason?.draft)}</div>
        </>
      ) : currentSeason ? (
        <div className="flex flex-col gap-2">
          {/* create inputs for pack structure and number of rounds*/}
          <div className="flex flex-row gap-2">
            <input type="number" placeholder="Number of Rounds" className="border-2 border-gray-300  p-2 rounded-md" value={numberOfRounds} onChange={(e) => {
              setNumberOfRounds(parseInt(e.target.value));
            }}/><span> Rounds</span>
          </div>
          <div className="flex flex-row gap-2">
            <input type="number" placeholder="Number of Rare Cards Per Pack" className="border-2 border-gray-300 p-2 rounded-md" value={packStructure.rare} onChange={(e) => {
              setPackStructure({...packStructure, rare: parseInt(e.target.value)});
            }}/><span> Rare</span>
          </div>
          {/* row */}
          <div className="flex flex-row gap-2">
            <input type="number" placeholder="Number of Uncommon Cards Per Pack" className="border-2 border-gray-300  p-2 rounded-md" value={packStructure.uncommon} onChange={(e) => {
              setPackStructure({...packStructure, uncommon: parseInt(e.target.value)});
            }}/>
            <span> Uncommon</span>
          </div>
          {/* row */}
          <div className="flex flex-row gap-2">
            <input type="number" placeholder="Number of Common Cards Per Pack" className="border-2 border-gray-300 p-2 rounded-md" value={packStructure.common} onChange={(e) => {
              setPackStructure({...packStructure, common: parseInt(e.target.value)});
            }}/>
            <span className="text-sm text-gray-500"> Common</span>
          </div>
          {/* row */}
          <div className="flex flex-row gap-2 w-1/4">
            <select className="bg-blue-500 text-white p-2 rounded-md w-full" onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setSelectedCardPool(cardPools.find((cardPool) => cardPool._id === e.target.value) || null);
            }}>
            {cardPools.map((cardPool) => (
              <option key={cardPool._id} value={cardPool._id}>{cardPool.name}</option>
            ))}
            </select>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 w-1/4" onClick={() => {
            handleCreateDraft();
          }}>Create Draft</button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No season selected</div>
      )}
    </>
  );
};

export default CreateDraftForm;