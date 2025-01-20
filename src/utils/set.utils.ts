import axios from 'axios';
import { Set } from '../types/set.types';

export const fetchSets = async (apiBaseUrl: string, token: string): Promise<Set[]> => {
  const response = await axios.get(`${apiBaseUrl}/set`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};