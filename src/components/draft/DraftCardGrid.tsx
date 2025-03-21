import DraftCardComponent from "./DraftCardComponent";
import useDraftContext from "../../context/useDraftContext";
import { Card } from "../../types/card.types";
import { useState, useEffect } from "react";

const DraftCardGrid = () => {
  const { currentBoosterPackCards } = useDraftContext();
  // sort cards by rarity
  const [sortedCards, setSortedCards] = useState<Card[]>([]);

  useEffect(() => {
    const sortedCards = currentBoosterPackCards.sort((a, b) => {
      const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Mythic'];
      return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
    });
    setSortedCards(sortedCards);
  }, [currentBoosterPackCards]);

  if (!currentBoosterPackCards) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <h1 className="text-2xl font-bold border-b-2 border-gray-300 pb-2 w-full">Current Booster Pack</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {sortedCards && sortedCards.map((card, index) => (
          <DraftCardComponent key={card._id + index} card={card} />
        ))}
        {!currentBoosterPackCards.length && (
          <div className=" text-gray-500">No current booster pack</div>
        )}
      </div>
    </div>
  );
};

export default DraftCardGrid;
