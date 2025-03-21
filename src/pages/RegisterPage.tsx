import React, { useState } from 'react';
import axios from 'axios';
import useUserContext from '../context/useUserContext';
import { authUtils } from '../services/auth.service';

const RegisterPage: React.FC = () => {
  const { setToken } = useUserContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      // Send the registration request to the backend
      await authUtils.register(username, email, password);

      // log user in
      const response = await axios.post(`${apiBaseUrl}/user/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      setRegisterError('Error registering user: ' + err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await authUtils.login(email, password);
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      setLoginError('Error logging in: ' + err);
    }
  };

  return (
    <>
        {/* login form */}
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
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
            </form>
            {loginError && <p className="mt-2 text-red-500">{loginError}</p>}
        </div>
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
      {registerError && <p className="mt-2 text-red-500">{registerError}</p>}
    </div>
    </>
  );
};

export default RegisterPage;
