import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const acceptInvite = async (seasonId: string): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }

  await axios.put(
    `${apiBaseUrl}/season/${seasonId}/accept-invite`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then((response) => {
    return response.data;
  }).catch((error) => {
    console.error('Error accepting invite:', error);
    throw error;
  });

};