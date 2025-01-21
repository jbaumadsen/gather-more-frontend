import axios from 'axios';
import { CardPool } from '../types/cardPool.types';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getCardPools = async () => {
  const response = await axios.get(`${apiBaseUrl}/cardpool`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  console.log("response", response);
  return response.data;
}

export const addCardToCardPool = async (cardPoolId: string, cardId: string) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/cardpool/addCard`, {
      cardPoolId,
      cardId
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

// send the entire cardPool object to update the card pool
export const updateCardPool = async ( cardPool: CardPool) => {
  const response = await axios.put(`${apiBaseUrl}/cardpool/`, cardPool, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  console.log("response", response);
  return response.data;
}

// create a new card pool
export const createCardPool = async (cardPool: CardPool) => {
  const response = await axios.post(`${apiBaseUrl}/cardpool`, cardPool, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}
