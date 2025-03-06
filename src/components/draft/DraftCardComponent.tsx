import { Card } from "../../types/card.types";
import { pickCard } from "../../services/draft.services";
import useUserContext from "../../hooks/useUserContext";

const DraftCardComponent = ({ card }: { card: Card }) => {

  const { currentUserTeam, currentDraft, getDraftData } = useUserContext();

  const handlePickCard = async () => {
    if(!currentUserTeam || !currentDraft || !currentUserTeam.packQueue[0] || !currentUserTeam._id || !currentDraft._id) {
      return;
    }
    await pickCard(currentUserTeam.packQueue[0], card.multiverseId, currentUserTeam._id, currentDraft._id);
    await getDraftData();
  };

  return (
    <div className="relative group" onClick={handlePickCard}>
      {/* Card Image */}
      {/* <img
        src={card.imageUrl}
        alt={card.name}
        className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200"
      /> */}

      {/* Tooltip */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0  opacity-0 group-hover:opacity-100 bg-white text-sm text-gray-800 shadow-md rounded-lg p-4 w-60 transition-opacity duration-200 z-10"> */}
        <h3 className="font-bold mb-1">{card.name}</h3>
        <p className="text-gray-600 text-xs mb-2">{card.set}</p>
        <p className="text-xs">
          <span className="font-semibold">Mana Cost:</span> {card.cost}
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
      {/* </div> */}
    </div>
  );
};

export default DraftCardComponent;
