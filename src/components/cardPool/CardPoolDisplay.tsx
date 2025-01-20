import React, { useEffect } from 'react';
import useUserContext from '../../hooks/useUserContext';
import { Card } from '../../types/card.types';

const CardPoolDisplay: React.FC = () => {
  const { currentCardPool } = useUserContext();

  useEffect(() => {
    console.log("currentCardPool in CardPoolDisplay", currentCardPool);
    // card is an 
  }, [currentCardPool]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Card Pool: {currentCardPool?.name}</h2>
      {currentCardPool?.cards.map((card: Card, index: number) => (
        <div key={card._id + index.toString()}>
          <h3>{card.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default CardPoolDisplay;