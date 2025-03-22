import { useState } from "react";
import { Card } from "../../types/card.types";
import { pickCard } from "../../services/draft.service";
import useDraftContext from "../../context/useDraftContext";
import useTeamContext from "../../context/useTeamContext";

const DraftCardComponent = ({ card }: { card: Card }) => {
  const { currentDraft, getDraftData } = useDraftContext();
  const { currentUserTeam } = useTeamContext();
  const [showModal, setShowModal] = useState(false);
  const [isPickingCard, setIsPickingCard] = useState(false);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePickCard = async () => {
    if(!currentUserTeam || !currentDraft || !currentUserTeam.packQueue[0] || !currentUserTeam._id || !currentDraft._id) {
      return;
    }

    setIsPickingCard(true);
    try {
      await pickCard(
        currentUserTeam.packQueue[0], 
        card.multiverseId, 
        currentUserTeam._id, 
        currentDraft._id
      );
      await getDraftData(currentDraft._id);
      setShowModal(false);
    } catch (error) {
      console.error("Error picking card:", error);
    } finally {
      setIsPickingCard(false);
    }
  };

  return (
    <>
      <div className="relative group" onClick={handleCardClick}>
        {/* Card Image */}
        <img
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
        />

        {/* Quick Info Overlay on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-end p-2">
          <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="font-bold">{card.name}</p>
            <p>{card.type}</p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Confirm Card Pick</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="p-4 flex flex-col md:flex-row gap-4">
              {/* Card Image */}
              <div className="md:w-1/3">
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="w-full rounded-lg shadow"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePickCard}
                    disabled={isPickingCard}
                    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${
                      isPickingCard ? "opacity-70 cursor-wait" : ""
                    }`}
                  >
                    {isPickingCard ? "Picking..." : "Pick This Card"}
                  </button>
                </div>
              
              {/* Card Details */}
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-2">{card.name}</h2>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Set</p>
                    <p className="font-medium">{card.set}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mana Cost</p>
                    <p className="font-medium">{card.manaCost || card.cmc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{card.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rarity</p>
                    <p className="font-medium">{card.rarity}</p>
                  </div>
                  {card.power && card.toughness && (
                    <div>
                      <p className="text-sm text-gray-600">P/T</p>
                      <p className="font-medium">{card.power}/{card.toughness}</p>
                    </div>
                  )}
                </div>
                
                
                {card.text && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Card Text</p>
                    <p className="italic">{card.text}</p>
                  </div>
                )}
                
                
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DraftCardComponent;