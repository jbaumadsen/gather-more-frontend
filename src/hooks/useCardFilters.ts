// hooks/useCardFilters.ts
import { useState, useEffect, useMemo } from 'react';
import useCardLibrary from '../context/cardLibrary/useCardLibrary';
import useCardPool from '../context/cardPools/useCardPool';
import { Card } from '../types/card.types';

// Define filter criteria interface
interface FilterCriteria {
  searchTerm?: string;
  showCardPoolOnly?: boolean;
  selectedSets?: string[];
  selectedColors?: string[];
  types?: string[];
}

const useCardFilters = () => {
  // Use our contexts
  const { cards } = useCardLibrary();
  const { currentCardPool } = useCardPool();
  
  // State for filters
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCardPoolOnly, setShowCardPoolOnly] = useState(true);
  const [selectedSets, setSelectedSets] = useState<Set<string>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set(['W', 'U', 'B', 'R', 'G', 'M', 'C']));

  // Get all available sets from cards
  const availableSets = useMemo(() => {
    const sets = new Set<string>();
    cards.forEach(card => {
      if (card.set) sets.add(card.set);
    });
    return Array.from(sets).sort();
  }, [cards]);

  // Initialize selected sets when available sets change
  useEffect(() => {
    if (availableSets.length > 0 && selectedSets.size === 0) {
      setSelectedSets(new Set(availableSets));
    }
  }, [availableSets, selectedSets.size]);

  // Apply all filters when filter state changes
  useEffect(() => {
    if (!cards || cards.length === 0) return;
    
    // Apply filters using the filterCards function
    const filtered = filterCards({
      searchTerm,
      showCardPoolOnly,
      selectedSets: Array.from(selectedSets),
      selectedColors: Array.from(selectedColors)
    });
    
    setFilteredCards(filtered);
  }, [cards, currentCardPool, showCardPoolOnly, searchTerm, selectedSets, selectedColors]);

  // Function to filter cards by all criteria
  const filterCards = (filters: FilterCriteria): Card[] => {
    let results = [...cards];

  // Filter by card pool 
  console.log("results[0] in useCardFilters ln 64", results[0]);
  console.log("currentCardPool in useCardFilters ln 67", currentCardPool);
  
if (filters.showCardPoolOnly && currentCardPool) {
  console.log("currentCardPool in useCardFilters ln 67", currentCardPool.cards[0]);
  results = results.filter(card => 
    currentCardPool.cards.some(poolCard => 
      typeof poolCard === 'string' && 
      poolCard === card.multiverseId
    )
  );
}

    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter(card => 
        card.name.toLowerCase().includes(term)
      );
    }

    // Filter by sets
    if (filters.selectedSets && filters.selectedSets.length > 0) {
      results = results.filter(card => 
        card.set && filters.selectedSets?.includes(card.set)
      );
    }

    // Filter by colors
    if (filters.selectedColors && filters.selectedColors.length > 0) {
      results = results.filter(card => {
        if (!card.colors || card.colors.length === 0) {
          return filters.selectedColors?.includes('C') ?? false;
        }
        if (card.colors.length > 1) {
          return filters.selectedColors?.includes('M') ?? false;
        }
        return card.colors.some(color => filters.selectedColors?.includes(color) ?? false);
      });
    }
    
    // Filter by types
    if (filters.types && filters.types.length > 0) {
      results = results.filter(card => 
        card.types && card.types.some(type => filters.types?.includes(type))
      );
    }

    // Sort results
    results.sort((a, b) => {
      // Color order: W, U, B, R, G, Multicolor, Colorless
      const colorOrder: Record<string, number> = { W: 5, U: 2, B: 1, R: 4, G: 3, M: 6, C: 7 };
      const getColorWeight = (card: Card): number => {
        if (!card.colors || card.colors.length === 0) return 7; // Colorless
        if (card.colors.length > 1) return 6; // Multicolor
        const firstColor = card.colors[0];
        return colorOrder[firstColor] || 8;
      };

      const colorCompare = getColorWeight(a) - getColorWeight(b);
      if (colorCompare !== 0) return colorCompare;

      // Mana cost
      const manaCostA = a.cmc || 0;
      const manaCostB = b.cmc || 0;
      if (manaCostA !== manaCostB) return manaCostA - manaCostB;

      // Name
      return a.name.localeCompare(b.name);
    });

    return results;
  };

  // Search cards by criteria (a more focused search than filterCards)
  const searchCards = (criteria: {
    name?: string;
    set?: string;
    colors?: string[];
    types?: string[];
  }): Card[] => {
    return filterCards({
      searchTerm: criteria.name,
      selectedSets: criteria.set ? [criteria.set] : undefined,
      selectedColors: criteria.colors,
      types: criteria.types,
      showCardPoolOnly: false // Don't limit to card pool when searching
    });
  };

  // Toggle set filter
  const toggleSet = (set: string): void => {
    const newSets = new Set(selectedSets);
    if (newSets.has(set)) {
      newSets.delete(set);
    } else {
      newSets.add(set);
    }
    setSelectedSets(newSets);
  };

  // Toggle color filter
  const toggleColor = (color: string): void => {
    const newColors = new Set(selectedColors);
    if (newColors.has(color)) {
      newColors.delete(color);
    } else {
      newColors.add(color);
    }
    setSelectedColors(newColors);
  };

  return {
    filteredCards,
    searchTerm,
    setSearchTerm,
    showCardPoolOnly,
    setShowCardPoolOnly,
    selectedSets,
    toggleSet,
    selectedColors,
    toggleColor,
    availableSets,
    filterCards,
    searchCards
  };
};

export default useCardFilters;