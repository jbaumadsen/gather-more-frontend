import { useState, useEffect } from 'react';
import useCardPool from '../context/useCardPoolContext';
import { Card } from '../types/card.types';
import { addCardToCardPool, removeCardFromCardPool } from '../services/cardPools/cardPool.service';

const useCardQuantities = () => {
  const { currentCardPool, setCurrentCardPool } = useCardPool();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  // Initialize quantities based on current card pool
  useEffect(() => {
    if (!currentCardPool) {
      setQuantities({});
      return;
    }
    
    const newQuantities: Record<string, number> = {};
    currentCardPool.cards.forEach((cardId: string) => {
      newQuantities[cardId] = (newQuantities[cardId] || 0) + 1;
    });
    setQuantities(newQuantities);
  }, [currentCardPool]);
  
  // Get quantity for a specific card
  const getQuantity = (cardId: string): number => {
    return quantities[cardId] || 0;
  };
  
  // Add a card to the card pool
  const addCard = async (card: Card) => {
    if (!currentCardPool?._id) return;
    
    // Optimistically update UI
    setQuantities(prev => ({
      ...prev,
      [card.multiverseId]: (prev[card.multiverseId] || 0) + 1
    }));
    
    // Mark as loading
    setIsLoading(prev => ({ ...prev, [card.multiverseId]: true }));
    
    try {
      const updatedCardPool = await addCardToCardPool(currentCardPool._id, card.multiverseId);
      setCurrentCardPool(updatedCardPool);
    } catch (error) {
      console.error("Error adding card to card pool", error);
      
      // Revert the optimistic update if there was an error
      setQuantities(prev => ({
        ...prev,
        [card.multiverseId]: Math.max(0, (prev[card.multiverseId] || 0) - 1)
      }));
    } finally {
      // Clear loading state
      setIsLoading(prev => ({ ...prev, [card.multiverseId]: false }));
    }
  };
  
  // Remove a card from the card pool
  const removeCard = async (card: Card) => {
    if (!currentCardPool?._id) return;
    if (!quantities[card.multiverseId] || quantities[card.multiverseId] <= 0) return;
    
    // Optimistically update UI
    setQuantities(prev => ({
      ...prev,
      [card.multiverseId]: Math.max(0, (prev[card.multiverseId] || 0) - 1)
    }));
    
    // Mark as loading
    setIsLoading(prev => ({ ...prev, [card.multiverseId]: true }));
    
    try {
      const updatedCardPool = await removeCardFromCardPool(currentCardPool._id, card.multiverseId);
      setCurrentCardPool(updatedCardPool);
    } catch (error) {
      console.error("Error removing card from card pool", error);
      
      // Revert the optimistic update if there was an error
      setQuantities(prev => ({
        ...prev,
        [card.multiverseId]: (prev[card.multiverseId] || 0) + 1
      }));
    } finally {
      // Clear loading state
      setIsLoading(prev => ({ ...prev, [card.multiverseId]: false }));
    }
  };
  
  // Check if a card is currently being updated
  const isCardLoading = (cardId: string): boolean => {
    return isLoading[cardId] || false;
  };
  
  return {
    getQuantity,
    addCard,
    removeCard,
    isCardLoading
  };
};

export default useCardQuantities;