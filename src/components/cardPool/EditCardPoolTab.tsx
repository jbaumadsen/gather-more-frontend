import React, { useMemo } from 'react';
import useCardPool from '../../context/useCardPoolContext';
import useCardLibrary from '../../context/useCardLibraryContext';
import FilterBar from './FilterBar';
import CardGrid from './CardGrid';
import useCardFilters from '../../hooks/useCardFilters';

const EditCardPoolTab: React.FC = () => {
  const { currentCardPool } = useCardPool();
  const { cards } = useCardLibrary();
  const {
    filteredCards,
    searchTerm,
    setSearchTerm,
    showCardPoolOnly,
    setShowCardPoolOnly,
    selectedSets,
    toggleSet,
    selectedColors,
    toggleColor,
    availableSets
  } = useCardFilters();

  // Calculate card statistics by rarity
  const cardStats = useMemo(() => {
    if (!currentCardPool || !cards.length) {
      return {
        total: 0,
        rare: 0,
        uncommon: 0,
        common: 0,
        mythic: 0,
        other: 0,
      };
    }

    // Create a map of multiverseIds to card objects for quick lookup
    const cardMap = new Map(cards.map(card => [card.multiverseId, card]));
    
    // Count by rarity
    const stats = {
      total: 0,
      rare: 0,
      uncommon: 0,
      common: 0,
      mythic: 0,
      other: 0,
    };
    
    // Iterate through multiverseIds in the pool and count by rarity
    currentCardPool.cards.forEach((multiverseId: string | number) => {
      // Ensure we're working with a string ID

      const cardId = typeof multiverseId === 'string' ? multiverseId : multiverseId.toString();
      
      stats.total++;
      
      const card = cardMap.get(cardId);
      
      if (!card || !card.rarity) {
        stats.other++;
        return;
      }
      
      const rarity = card.rarity.toLowerCase();
      if (rarity === 'rare') {
        stats.rare++;
      } else if (rarity === 'uncommon') {
        stats.uncommon++;
      } else if (rarity === 'common') {
        stats.common++;
      } else if (rarity === 'mythic' || rarity === 'mythic rare') {
        stats.mythic++;
      } else {
        stats.other++;
      }
    });
    
    return stats;
  }, [currentCardPool, cards]);

  if (!currentCardPool) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please select a card pool first</p>
        <p className="mt-2 text-sm text-gray-400">
          Go to the "Create Card Pool" tab to create or select a card pool
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Editing: {currentCardPool.name}</h2>
        
        {/* Card Pool Statistics */}
        <div className="mb-4 grid grid-cols-4 gap-3 text-center">
          <div className="bg-white rounded-lg shadow p-3">
            <div className="text-2xl font-bold">{cardStats.total}</div>
            <div className="text-sm text-gray-600">Total Cards</div>
          </div>
          <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg shadow p-3">
            <div className="text-2xl font-bold text-yellow-800">
              {cardStats.rare + cardStats.mythic} 
              <span className="text-sm font-normal text-amber-700 ml-1">
                ({cardStats.mythic} mythic)
              </span>
            </div>
            <div className="text-sm text-yellow-900">Rares</div>
          </div>
          <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow p-3">
            <div className="text-2xl font-bold text-gray-700">{cardStats.uncommon}</div>
            <div className="text-sm text-gray-600">Uncommons</div>
          </div>
          <div className="bg-gradient-to-b from-black to-gray-800 rounded-lg shadow p-3">
            <div className="text-2xl font-bold text-white">{cardStats.common}</div>
            <div className="text-sm text-gray-300">Commons</div>
          </div>
        </div>
        
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showCardPoolOnly={showCardPoolOnly}
          setShowCardPoolOnly={setShowCardPoolOnly}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
          selectedSets={selectedSets}
          toggleSet={toggleSet}
          availableSets={availableSets}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Cards ({filteredCards.length})
          {filteredCards.length !== cardStats.total && showCardPoolOnly === false && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              (showing {filteredCards.length} of {cardStats.total} in pool)
            </span>
          )}
        </h3>
        <CardGrid cards={filteredCards} />
      </div>
    </>
  );
};

export default EditCardPoolTab;