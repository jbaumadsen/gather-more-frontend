import React from 'react';
import { Card } from '../../types/card.types';
import useCardQuantities from '../../hooks/useCardQuantities';

interface CardItemProps {
  card: Card;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const { getQuantity, addCard, removeCard } = useCardQuantities();
  const quantity = getQuantity(card.multiverseId);

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Card image or placeholder */}
      <div className="aspect-ratio-box" style={{ paddingBottom: '140%' }}>
        {card.imageUrl ? (
          <img 
            src={card.imageUrl} 
            alt={card.name} 
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-card.png'; }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center p-2 text-center">
            <span>{card.name}</span>
          </div>
        )}
      </div>
      
      {/* Quantity overlay */}
      <div className="absolute top-0 left-0 right-0 flex justify-between p-1 bg-black bg-opacity-60 text-white">
        {/* <div className="text-xs font-medium truncate mr-1">{card.name}</div> */}
        <div className="text-sm font-bold">{quantity > 0 ? `x${quantity}` : ''}</div>
      </div>
      
      {/* Control buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-1 bg-black bg-opacity-60">
        <button 
          onClick={() => removeCard(card)}
          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center transition-opacity"
          disabled={quantity <= 0}
          style={{ opacity: quantity <= 0 ? 0.5 : 1 }}
          aria-label={`Remove ${card.name}`}
        >
          <span className="text-lg font-bold">-</span>
        </button>
        <button 
          onClick={() => addCard(card)}
          className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center"
          aria-label={`Add ${card.name}`}
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>
      
      {/* Optional mana cost display */}
      {/* {card.manaCost && (
        <div className="absolute top-0 right-0 p-1 bg-black bg-opacity-60 rounded-bl-md">
          <span className="text-xs text-white">{card.manaCost}</span>
        </div>
      )} */}
    </div>
  );
};

export default CardItem;