import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import LoginPage from './LoginPage';


const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Used to redirect to the login page after successful registration

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      // Send the registration request to the backend
      await axios.post(`${apiBaseUrl}/api/user/register`, { username, email, password });

      // Redirect to login page after successful registration
        navigate('/login');
    } catch (err) {
      setError('Error registering user: ' + err);
    }
  };

  return (
    <>
      <LoginPage />
    <div className="max-w-md mt-4 mx-auto p-6 bg-gray-200 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
    </>
  );
};

export default RegisterPage;
