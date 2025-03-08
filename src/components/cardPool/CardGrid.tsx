import React from 'react';
import CardItem from './CardItem';
import { Card } from '../../types/card.types';

interface CardGridProps {
  cards: Card[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  if (!cards.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No cards found matching the current filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <CardItem key={card.multiverseId} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;