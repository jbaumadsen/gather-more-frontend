// contexts/cardLibrary/CardLibraryContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Card } from '../../types/card.types';
import { Set } from '../../types/set.types';
import { CardService } from '../../services/card.service';
import { SetService } from '../../services/set.service';

// Define the context interface
interface ICardLibraryContext {
  // Card state
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  
  // Sets state
  sets: Set[];
  loadingSets: boolean;
  
  // Card operations
  fetchCards: () => Promise<void>;
}

// Create the context
const CardLibraryContext = createContext<ICardLibraryContext | undefined>(undefined);

// Provider component
interface CardLibraryProviderProps {
  children: ReactNode;
}

export const CardLibraryProvider: React.FC<CardLibraryProviderProps> = ({ children }) => {
  // State
  const [cards, setCards] = useState<Card[]>([]);
  const [sets, setSets] = useState<Set[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingSets, setLoadingSets] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch all cards and sets on component mount
  useEffect(() => {
    fetchCards();
    fetchSets();
  }, []);
  
  // Fetch all cards
  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const allCards = await CardService.getAllCards();
      setCards(allCards);
    } catch (err) {
      setError('Failed to fetch cards');
      console.error('Error fetching cards:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch all sets
  const fetchSets = async () => {
    setLoadingSets(true);
    
    try {
      const allSets = await SetService.fetchSets();
      setSets(allSets);
    } catch (err) {
      console.error('Error fetching sets:', err);
    } finally {
      setLoadingSets(false);
    }
  };

  // Context value
  const value: ICardLibraryContext = {
    cards,
    isLoading,
    error,
    sets,
    loadingSets,
    fetchCards
  };

  return (
    <CardLibraryContext.Provider value={value}>
      {children}
    </CardLibraryContext.Provider>
  );
};

export default CardLibraryContext;