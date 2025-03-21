import React from 'react';
import useCardPoolContext from '../../context/useCardPoolContext';
import CardPoolListItem from './CardPoolListItem';

const CardPoolList: React.FC = () => {

  const { cardPools } = useCardPoolContext();
  console.log("cardPools", cardPools);

  return (
    <div className="flex flex-col md:col-span-1">
      <h1 className="text-2xl font-bold mb-4">Card Pool List</h1>
      {cardPools && cardPools.length > 0 && (
        // have space between each card pool
        <ul className="list-none border-l border-gray-300 pl-4 space-y-2">
          {cardPools && cardPools.map((cardPool) => (
            <CardPoolListItem cardPool={cardPool} key={cardPool._id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CardPoolList;
