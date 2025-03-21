import { Card } from "../../types/card.types";
import Tooltip from "../../components/ui/Tooltip";

const TeamCard = ({ card }: { card: Card }) => {
  // Generate the tooltip content
  const tooltipContent = (
    <>
      <h3 className="font-bold mb-1">{card.name}</h3>
      <p className="text-gray-600 text-xs mb-2">{card.set}</p>
      <p className="text-xs">
        <span className="font-semibold">Mana Cost:</span> {card.cmc}
      </p>
      <p className="text-xs">
        <span className="font-semibold">Type:</span> {card.type}
      </p>
      {card.text && (
        <p className="italic text-gray-600 text-xs mt-1">{card.text}</p>
      )}
      <p className="text-xs">
        <span className="font-semibold">Power/Toughness:</span>{" "}
        {card.power}/{card.toughness}
      </p>
      <p className="text-xs">
        <span className="font-semibold">Rarity:</span> {card.rarity}
      </p>
    </>
  );

  return (
    <Tooltip 
      content={tooltipContent}
      position="bottom"  // Will appear above when near bottom of screen
      width="w-72"     // Slightly wider for card details
    >
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200"
      />
    </Tooltip>
  );
};

export default TeamCard;