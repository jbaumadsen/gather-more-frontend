import React from 'react';
import { CardPool } from '../../types/cardPool.types';
import useUserContext from '../../hooks/useUserContext';

interface CardPoolListItemProps {
  cardPool: CardPool;
}

const CardPoolListItem: React.FC<CardPoolListItemProps> = ({ cardPool }) => {

  const { setCurrentCardPool } = useUserContext();
  const handleEditCardPool = (cardPool: CardPool) => {
    // console.log("cardPool", cardPool);
    setCurrentCardPool(cardPool);
  }

  return (
    <div className="flex flex-row justify-between">
      <span>{cardPool.name}</span>
      <button className="bg-blue-500 text-white px-2 py-1 rounded-md" onClick={() => handleEditCardPool(cardPool)}>Edit</button>
    </div>
  );
};

export default CardPoolListItem;