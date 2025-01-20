import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchBoosterPackCards = async (boosterPackId: string) => {
  const response = await axios.get(`${apiBaseUrl}/boosterPack/${boosterPackId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
}