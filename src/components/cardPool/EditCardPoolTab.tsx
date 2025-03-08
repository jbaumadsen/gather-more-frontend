import React from 'react';
import useUserContext from '../../hooks/useUserContext';
import FilterBar from './FilterBar';
import CardGrid from './CardGrid';
import useCardFilters from '../../hooks/useCardFilters';

const EditCardPoolTab: React.FC = () => {
  const { currentCardPool } = useUserContext();
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
        <h3 className="text-lg font-semibold mb-4">Cards ({filteredCards.length})</h3>
        <CardGrid cards={filteredCards} />
      </div>
    </>
  );
};

export default EditCardPoolTab;