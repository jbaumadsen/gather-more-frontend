import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const authUtils = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  register: async (username: string, email: string, password: string) => {
    await axios.post(`${apiBaseUrl}/auth/register`, { username, email, password });
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};