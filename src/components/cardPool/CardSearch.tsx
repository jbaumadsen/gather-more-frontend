import React, { useCallback } from 'react';
import { debounce } from 'lodash';

interface CardSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CardSearch: React.FC<CardSearchProps> = ({ searchTerm, setSearchTerm }) => {
  // Create a debounced version of setSearchTerm to avoid excessive filtering
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    [setSearchTerm]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update the input value immediately for UI responsiveness
    e.target.value = value;
    // Debounce the actual search operation
    debouncedSetSearchTerm(value);
  };

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Search Cards
      </label>
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Search by card name..."
        defaultValue={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default CardSearch;