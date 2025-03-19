import React, { useEffect, useState } from 'react';
import useCardPool from '../../context/cardPools/useCardPool';
import { Card } from '../../types/card.types';
import { useCardLibrary } from '../../context/cardLibrary/useCardLibrary';
const CardPoolDisplay: React.FC = () => {
  const { cards } = useCardLibrary();
  const { currentCardPool } = useCardPool();
  const [cardPoolCards, setCardPoolCards] = useState<Card[]>([]);

  useEffect(() => {
    // console.log("currentCardPool", currentCardPool);
    // console.log("cards", cards);
    if (!currentCardPool) return;
    // console.log("currentcardpool exists");
    const updatedCardPoolCards: Card[] = currentCardPool?.cards
      .map((cardMultiverseId: string) => cards.find((c: Card) => c.multiverseId === cardMultiverseId))
      .filter((card): card is Card => card !== undefined);
    // console.log("updatedCardPoolCards", updatedCardPoolCards);
    setCardPoolCards(updatedCardPoolCards);
    if (updatedCardPoolCards.length === 0) {
      // console.log("no cards in card pool");
      if (currentCardPool.cards.length > 0) {
        // console.log("cards in card pool are not empty");
        // rerender
        setCardPoolCards(updatedCardPoolCards);
      }
    }
  }, [currentCardPool, cards]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Card Pool: {currentCardPool?.name}</h2>
      {cardPoolCards.map((card: Card, index: number) => (
        <div key={card._id + index.toString()}>
          <h3>{card.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default CardPoolDisplay;