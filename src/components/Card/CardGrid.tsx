import CardComponent from "./CardComponent";
import { Card } from "../../types/card.types";

const CardGrid = ({ cards }: { cards: Card[] }) => {
  // sort cards by rarity
  const sortedCards = cards.sort((a, b) => {
    const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Mythic'];
    return rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {sortedCards.map((card) => (
        <CardComponent key={card._id} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;
