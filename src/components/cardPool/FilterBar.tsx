import React from 'react';
import ColorFilter from './ColorFilter';
import SetFilter from './SetFilter';
import CardSearch from './CardSearch';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showCardPoolOnly: boolean;
  setShowCardPoolOnly: (show: boolean) => void;
  selectedColors: Set<string>;
  toggleColor: (color: string) => void;
  selectedSets: Set<string>;
  toggleSet: (set: string) => void;
  availableSets: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  showCardPoolOnly,
  setShowCardPoolOnly,
  selectedColors,
  toggleColor,
  selectedSets,
  toggleSet,
  availableSets
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <CardSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="showCardPoolOnly"
              checked={showCardPoolOnly}
              onChange={() => setShowCardPoolOnly(!showCardPoolOnly)}
              className="mr-2"
            />
            <label htmlFor="showCardPoolOnly" className="text-sm font-medium text-gray-700">
              Show Card Pool Only
            </label>
          </div>
        </div>
        
        <div>
          <ColorFilter 
            selectedColors={selectedColors} 
            toggleColor={toggleColor} 
          />
        </div>
      </div>

      <SetFilter 
        selectedSets={selectedSets} 
        toggleSet={toggleSet} 
        availableSets={availableSets} 
      />
    </div>
  );
};

export default FilterBar;