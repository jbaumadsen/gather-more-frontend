import axios from 'axios';
import { CardPool } from '../types/cardPool.types';

// Base API URL - adjust as needed
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// export const getCardPools = async () => {
//   const response = await axios.get(`${apiBaseUrl}/cardpool`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   console.log("response", response);
//   return response.data;
// }

export const addCardToCardPool = async (cardPoolId: string, multiverseId: string) => {
  try {
    console.log("multiverseId", multiverseId);
    const response = await axios.post(`${apiBaseUrl}/cardpool/addCard`, {
      cardPoolId,
      multiverseId
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding card to card pool", error);
    throw error;
  }
}

// // send the entire cardPool object to update the card pool
// export const updateCardPool = async ( cardPool: CardPool) => {
//   const response = await axios.put(`${apiBaseUrl}/cardpool/`, cardPool, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   console.log("response", response);
//   return response.data;
// }

// // create a new card pool
// export const createCardPool = async (cardPool: CardPool) => {
//   const response = await axios.post(`${apiBaseUrl}/cardpool`, cardPool, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   return response.data;
// }



/**
 * Get all card pools for the current user
 */
export const getCardPools = async (): Promise<CardPool[]> => {
  const response = await fetch(`${apiBaseUrl}/card-pools`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch card pools: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Get a specific card pool by ID
 */
export const getCardPoolById = async (id: string): Promise<CardPool> => {
  const response = await fetch(`${apiBaseUrl}/card-pools/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch card pool: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Create a new card pool
 */
export const createCardPool = async (cardPool: Omit<CardPool, '_id'>): Promise<CardPool> => {
  const response = await fetch(`${apiBaseUrl}/cardpool`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    credentials: 'include',
    body: JSON.stringify(cardPool),
  });

  if (!response.ok) {
    throw new Error(`Failed to create card pool: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Update an existing card pool
 */
export const updateCardPool = async (cardPool: CardPool): Promise<CardPool> => {
  const response = await fetch(`${apiBaseUrl}/card-pools/${cardPool._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(cardPool),
  });

  if (!response.ok) {
    throw new Error(`Failed to update card pool: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Delete a card pool
 */
export const deleteCardPool = async (id: string): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/card-pools/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete card pool: ${response.statusText}`);
  }
};

/**
 * Add multiple cards to a card pool
 */
export const addCardsToPool = async (
  cardPoolId: string, 
  multiverseIds: string[],
  token: string
): Promise<CardPool> => {
  // console.log("multiverseIds", multiverseIds);
  console.log("token", token);
  const response = await fetch(`${apiBaseUrl}/cardpool/${cardPoolId}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify({ multiverseIds }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add cards to pool: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Remove a card from a card pool
 */
export const removeCardFromPool = async (
  poolId: string, 
  cardId: string
): Promise<CardPool> => {
  const response = await fetch(`${apiBaseUrl}/card-pools/${poolId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to remove card from pool: ${response.statusText}`);
  }

  return response.json();
};
