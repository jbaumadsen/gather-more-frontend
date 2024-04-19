import React, { useState, useContext } from 'react';
import axios from 'axios';
import './signup.scss';
import { ProgramContext } from '../context/ProgramContext';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(ProgramContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', { email, password });
      console.log('User created:', response.data);
      setUser(response.data);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('User logged in:', response.data);
      setUser({...response.data, email});
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const handleErrorResponse = (error) => {
    if (error.response) {
      setError(error.response.data);
    } else if (error.request) {
      setError('No response from server');
    } else {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className="signup-form-container"> {/* Add the container class here */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>} {/* Use the error-message class for styling */}
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default SignupForm;