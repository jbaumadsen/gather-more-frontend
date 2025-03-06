import axios from 'axios';
import { Set } from '../types/set.types';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchSets = async ( token: string): Promise<Set[]> => {
  const response = await axios.get(`${apiBaseUrl}/set`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateSets = async ( token: string): Promise<void> => {
  console.log("token in updateSets from set.services.ts ln 13: ", token);
  const response = await axios.post(`${apiBaseUrl}/admin/set/refresh-all-sets`, 
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  );

  console.log("response.data in updateSets from set.services.ts ln 14: ", response.data);
  return response.data;
};

export const createSet = async (setName: string, setCode: string, token: string): Promise<Set> => {
  const response = await axios.post(`${apiBaseUrl}/admin/sets/create`, { name: setName, setCode }, {
    headers: {
      authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

