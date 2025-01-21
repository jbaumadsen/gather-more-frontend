import React from 'react';
import useUserContext from '../../hooks/useUserContext';
import CardPoolListItem from './CardPoolListItem';

const CardPoolList: React.FC = () => {

  const { cardPools } = useUserContext();
  // console.log("cardPools", cardPools);
  return (
    <div className="flex flex-col lg:w-1/4">
      <h1 className="text-2xl font-bold mb-4">Card Pool List</h1>
      {cardPools && cardPools.length > 0 && (
        <ul className="list-none border-l border-gray-300 pl-4">
          {cardPools && cardPools.map((cardPool) => (
            <CardPoolListItem cardPool={cardPool} key={cardPool._id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CardPoolList;
