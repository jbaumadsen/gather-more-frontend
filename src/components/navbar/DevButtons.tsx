import React from 'react';
import axios from 'axios';
import useUserContext from '../../context/useUserContext';

const DevButtons: React.FC = () => {
  const { token, setToken, getUserData } = useUserContext();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Quick login functions for development testing
  const quickLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/user/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      getUserData();
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  const handleSecret6Login = (e: React.FormEvent) => {
    e.preventDefault();
    quickLogin('secret6@agent.com', '66666666');
  };

  const handleSecret7Login = (e: React.FormEvent) => {
    e.preventDefault();
    quickLogin('secret7@agent.com', '77777777');
  };

  const handleSecret8Login = (e: React.FormEvent) => {
    e.preventDefault();
    quickLogin('secret8@agent.com', '88888888');
  };

  const handleSecret9Login = (e: React.FormEvent) => {
    e.preventDefault();
    quickLogin('secret9@agent.com', '99999999');
  };

  const handleDeleteInfo = async () => {
    await axios.delete(`${apiBaseUrl}/league/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-4 border-t border-gray-600 pt-3">
      <button
        onClick={handleSecret6Login}
        className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
      >
        Log Secret6 in
      </button>
      <button
        onClick={handleSecret7Login}
        className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
      >
        Log Secret7 in
      </button>
      <button
        onClick={handleSecret8Login}
        className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
      >
        Log Secret8 in
      </button>
      <button
        onClick={handleSecret9Login}
        className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
      >
        Log Secret9 in
      </button>
      <button
        onClick={handleDeleteInfo}
        className="bg-gray-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
      >
        Delete Info/Reset
      </button>
    </div>
  );
};

export default DevButtons;