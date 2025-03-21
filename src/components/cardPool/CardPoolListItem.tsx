import React from 'react';
import { CardPool } from '../../types/cardPool.types';
import useCardPool from '../../context/useCardPoolContext';

interface CardPoolListItemProps {
  cardPool: CardPool;
}

const CardPoolListItem: React.FC<CardPoolListItemProps> = ({ cardPool }) => {

  const { setCurrentCardPool } = useCardPool();
  const handleEditCardPool = (cardPool: CardPool) => {
    console.log("cardPool", cardPool);
    setCurrentCardPool(cardPool);
  }

  return (
    // add padding to the left
    <div className="flex flex-row justify-between hover:bg-gray-100 cursor-pointer pl-4" onClick={() => handleEditCardPool(cardPool)}>
      <span>{cardPool.name}</span>
    </div>
  );
};

export default CardPoolListItem;