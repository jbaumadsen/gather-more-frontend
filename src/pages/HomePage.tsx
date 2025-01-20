import React from 'react';
import { Link } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

const HomePage: React.FC = () => {
  const { user } = useUserContext();
  return (
    <>
      {user ? (
        <div>
          <h1>Home Page</h1>
          <p>Welcome to the home page</p>
          <Link to="/profile">Profile</Link>
        </div>
      ) : (
        <div>
          <h1>Home Page</h1>
          <p>Welcome to the home page</p>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/league-manager">League Manager</Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
