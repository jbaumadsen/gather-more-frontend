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
    <div 
      className="relative border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer group"
      onClick={() => addCard(card)}
    >
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
        <div className="text-sm font-bold">{quantity > 0 ? `x${quantity}` : ''}</div>
      </div>
      
      {/* Remove button - only visible on hover if quantity > 0 */}
      {quantity > 0 && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent's onClick
            removeCard(card);
          }}
          className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Remove ${card.name}`}
        >
          <span className="text-lg font-bold">-</span>
        </button>
      )}
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
    </div>
  );
};

export default CardItem;