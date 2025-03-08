import React from 'react';

interface SetFilterProps {
  selectedSets: Set<string>;
  toggleSet: (set: string) => void;
  availableSets: string[];
}

const SetFilter: React.FC<SetFilterProps> = ({ selectedSets, toggleSet, availableSets }) => {
  const selectAllSets = () => {
    availableSets.forEach(set => {
      if (!selectedSets.has(set)) {
        toggleSet(set);
      }
    });
  };

  const clearAllSets = () => {
    selectedSets.forEach(set => {
      toggleSet(set);
    });
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Filter by Set
        </label>
        <div className="space-x-2">
          <button
            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            onClick={selectAllSets}
          >
            Select All
          </button>
          <button
            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            onClick={clearAllSets}
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
        {availableSets.map(set => (
          <button
            key={set}
            className={`px-2 py-1 text-xs rounded-md transition-colors ${
              selectedSets.has(set) 
                ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => toggleSet(set)}
            aria-pressed={selectedSets.has(set)}
          >
            {set}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SetFilter;