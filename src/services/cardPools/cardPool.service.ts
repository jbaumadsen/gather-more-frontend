// services/cardPools/cardPool.service.ts
import apiClient from '../api/client';
import endpoints from '../api/endpoints';
import { CardPool } from '../../types/cardPool.types';

/**
 * Get all card pools for the current user
 */
export const getCardPools = async (): Promise<CardPool[]> => {
  return apiClient.get<CardPool[]>(endpoints.cardPools.getAll);
};

/**
 * Get a specific card pool by ID
 */
export const getCardPoolById = async (id: string): Promise<CardPool> => {
  return apiClient.get<CardPool>(endpoints.cardPools.getById(id));
};

/**
 * Create a new card pool
 */
export const createCardPool = async (cardPool: Omit<CardPool, '_id'>): Promise<CardPool> => {
  return apiClient.post<CardPool>(endpoints.cardPools.create, cardPool);
};

/**
 * Update an existing card pool
 */
export const updateCardPool = async (cardPool: CardPool): Promise<CardPool> => {
  if (!cardPool._id) {
    throw new Error('Card pool ID is required for updating');
  }
  return apiClient.put<CardPool>(endpoints.cardPools.update(cardPool._id), cardPool);
};

/**
 * Delete a card pool
 */
export const deleteCardPool = async (id: string): Promise<void> => {
  return apiClient.delete(endpoints.cardPools.delete(id));
};

/**
 * Add a single card to a card pool
 */
export const addCardToCardPool = async (cardPoolId: string, multiverseId: string): Promise<CardPool> => {
  return apiClient.post<CardPool>(endpoints.cardPools.addCard, { cardPoolId, multiverseId });
};

/**
 * Remove a card from a card pool
 */
export const removeCardFromCardPool = async (cardPoolId: string, multiverseId: string): Promise<CardPool> => {
  return apiClient.delete<CardPool>(endpoints.cardPools.removeCard, {
    data: { cardPoolId, multiverseId }
  });
};

/**
 * Add multiple cards to a card pool
 */
export const addCardsToPool = async (
  cardPoolId: string, 
  multiverseIds: string[]
): Promise<CardPool> => {
  return apiClient.post<CardPool>(
    endpoints.cardPools.addCards(cardPoolId), 
    { multiverseIds }
  );
};