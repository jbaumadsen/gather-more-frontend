import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProgramContext } from '../../context/ProgramContext'; // Import ProgramContext
import UserListModal from './UserListModal/UserListModal'; // Import the new component
import './navBar.scss';

const NavBar = () => {
  const { user, setUser } = useContext(ProgramContext); // Use useContext to access user and setUser
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSwitchUser = () => {
    setIsModalOpen(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Remove currentUser from localStorage
    setUser({}); // Reset user state on logout
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/leagues">Leagues</Link>
        </li>
      </ul>
      <div className="navbar-right">
        {user.token ? (
          <>
            <span className="navbar-email">{user.email}</span>
            <button onClick={handleSwitchUser} className='navbar-switch-user'>Switch User</button>
            <button onClick={handleLogout} className="navbar-logout">Logout</button>
            
          </>
        ) : (
          <Link to="/signup">Signup</Link>
        )}
      </div>
      {isModalOpen && <UserListModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
};

export default NavBar;
