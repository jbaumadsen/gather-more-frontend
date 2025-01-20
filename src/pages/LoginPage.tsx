import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserContext from '../hooks/useUserContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Used to redirect to the profile page after successful login
  const { setToken } = useUserContext();
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make the login request
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      const { token } = response.data;
      setToken(token);

      // console.log(response.data);

      // // Fetch user data after successful login and update context
      // const userResponse = await axios.get('http://localhost:5000/api/user/profile', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // console.log("userResponse", userResponse.data);
      // setUser(userResponse.data);  // Update user context with the fetched data

      // // Redirect to the profile page
      navigate('/profile');
    } catch (err) {
      setError('Invalid email or password: ' + err);
    }
  };

  return (
    <div className="max-w-md mt-4 mx-auto p-6 bg-gray-200 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default LoginPage;
