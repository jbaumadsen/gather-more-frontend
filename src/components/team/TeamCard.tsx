import { Card } from "../../types/card.types";

const TeamCard = ({ card }: { card: Card }) => {
  // if image url starts 
  // const modifiedImageUrl = card.imageUrl.replace("http:", "https");

  return (
    <div className="relative group">
      {/* Card Image */}
      <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200"
      />

      {/* Tooltip */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-full opacity-0 group-hover:opacity-100 bg-white text-sm text-gray-800 shadow-md rounded-lg p-4 w-64 transition-opacity duration-200 z-10">
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
      </div>
    </div>
  );
};

export default TeamCard;
