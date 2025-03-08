// contexts/cardPools/CardPoolContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CardPool } from '../../types/cardPool.types';
import * as cardPoolService from '../../services/cardPools/cardPool.service';

// Define the context interface
interface ICardPoolContext {
  // Card pool state
  cardPools: CardPool[];
  currentCardPool: CardPool | null;
  isLoading: boolean;
  error: string | null;
  
  // Card pool CRUD operations
  setCurrentCardPool: (cardPool: CardPool | null) => void;
  createCardPool: (cardPool: Omit<CardPool, '_id'>) => Promise<CardPool>;
  updateCardPool: (cardPool: CardPool) => Promise<CardPool>;
  deleteCardPool: (id: string) => Promise<void>;
  
  // Card operations
  addCardToPool: (cardId: string) => Promise<void>;
  removeCardFromPool: (cardId: string) => Promise<void>;
  addCardsToPool: (cardIds: string[]) => Promise<void>;
  getCardQuantities: () => Record<string, number>;
}

// Create the context
const CardPoolContext = createContext<ICardPoolContext | undefined>(undefined);

// Provider component
interface CardPoolProviderProps {
  children: ReactNode;
}

export const CardPoolProvider: React.FC<CardPoolProviderProps> = ({ children }) => {
  // State
  const [cardPools, setCardPools] = useState<CardPool[]>([]);
  const [currentCardPool, setCurrentCardPool] = useState<CardPool | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch card pools on component mount
  useEffect(() => {
    fetchCardPools();
  }, []);
  
  // Fetch all card pools
  const fetchCardPools = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const pools = await cardPoolService.getCardPools();
      setCardPools(pools);
    } catch (err) {
      setError('Failed to fetch card pools');
      console.error('Error fetching card pools:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create a new card pool
  const createCardPool = async (cardPool: Omit<CardPool, '_id'>): Promise<CardPool> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newCardPool = await cardPoolService.createCardPool(cardPool);
      setCardPools(prevPools => [...prevPools, newCardPool]);
      return newCardPool;
    } catch (err) {
      const errorMessage = 'Failed to create card pool';
      setError(errorMessage);
      console.error(errorMessage, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update an existing card pool
  const updateCardPool = async (cardPool: CardPool): Promise<CardPool> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedCardPool = await cardPoolService.updateCardPool(cardPool);
      setCardPools(prevPools => 
        prevPools.map(pool => 
          pool._id === updatedCardPool._id ? updatedCardPool : pool
        )
      );
      
      // Update current card pool if it's the same one
      if (currentCardPool && currentCardPool._id === updatedCardPool._id) {
        setCurrentCardPool(updatedCardPool);
      }
      
      return updatedCardPool;
    } catch (err) {
      const errorMessage = 'Failed to update card pool';
      setError(errorMessage);
      console.error(errorMessage, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a card pool
  const deleteCardPool = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await cardPoolService.deleteCardPool(id);
      setCardPools(prevPools => prevPools.filter(pool => pool._id !== id));
      
      // Reset current card pool if it's the one that was deleted
      if (currentCardPool && currentCardPool._id === id) {
        setCurrentCardPool(null);
      }
    } catch (err) {
      const errorMessage = 'Failed to delete card pool';
      setError(errorMessage);
      console.error(errorMessage, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add a card to the current card pool
  const addCardToPool = async (cardId: string): Promise<void> => {
    if (!currentCardPool?._id) {
      setError('No card pool selected');
      return;
    }
    
    try {
      const updatedCardPool = await cardPoolService.addCardToCardPool(
        currentCardPool._id, 
        cardId
      );
      setCurrentCardPool(updatedCardPool);
      
      // Update in the cardPools array too
      setCardPools(prevPools => 
        prevPools.map(pool => 
          pool._id === updatedCardPool._id ? updatedCardPool : pool
        )
      );
    } catch (err) {
      setError('Failed to add card to pool');
      console.error('Error adding card to pool:', err);
      throw err;
    }
  };
  
  // Remove a card from the current card pool
  const removeCardFromPool = async (cardId: string): Promise<void> => {
    if (!currentCardPool?._id) {
      setError('No card pool selected');
      return;
    }
    
    try {
      const updatedCardPool = await cardPoolService.removeCardFromCardPool(
        currentCardPool._id,
        cardId
      );
      setCurrentCardPool(updatedCardPool);
      
      // Update in the cardPools array too
      setCardPools(prevPools => 
        prevPools.map(pool => 
          pool._id === updatedCardPool._id ? updatedCardPool : pool
        )
      );
    } catch (err) {
      setError('Failed to remove card from pool');
      console.error('Error removing card from pool:', err);
      throw err;
    }
  };
  
  // Add multiple cards to the current card pool
  const addCardsToPool = async (cardIds: string[]): Promise<void> => {
    if (!currentCardPool?._id) {
      setError('No card pool selected');
      return;
    }
    
    try {
      const updatedCardPool = await cardPoolService.addCardsToPool(
        currentCardPool._id,
        cardIds
      );
      setCurrentCardPool(updatedCardPool);
      
      // Update in the cardPools array too
      setCardPools(prevPools => 
        prevPools.map(pool => 
          pool._id === updatedCardPool._id ? updatedCardPool : pool
        )
      );
    } catch (err) {
      setError('Failed to add cards to pool');
      console.error('Error adding cards to pool:', err);
      throw err;
    }
  };
  
  // Get quantities of each card in the current card pool
  const getCardQuantities = (): Record<string, number> => {
    if (!currentCardPool) return {};
    
    const quantities: Record<string, number> = {};
    currentCardPool.cards.forEach(cardId => {
      quantities[cardId] = (quantities[cardId] || 0) + 1;
    });
    
    return quantities;
  };

  // Context value
  const value: ICardPoolContext = {
    cardPools,
    currentCardPool,
    isLoading,
    error,
    setCurrentCardPool,
    createCardPool,
    updateCardPool,
    deleteCardPool,
    addCardToPool,
    removeCardFromPool,
    addCardsToPool,
    getCardQuantities,
  };

  return (
    <CardPoolContext.Provider value={value}>
      {children}
    </CardPoolContext.Provider>
  );
};

export default CardPoolContext;