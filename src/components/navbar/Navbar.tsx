import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUserContext from '../../context/useUserContext';
import NavbarLogo from './NavbarLogo';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import DevButtons from './DevButtons';

const Navbar: React.FC = () => {
  const { setToken, user } = useUserContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const environmentType = import.meta.env.VITE_ENVIRONMENT_TYPE;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavbarLogo />
        
        {/* Hamburger button - visible on mobile only */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLinks />
          
          {user && user?.username && (
            <span className="text-lg text-gray-300 flex items-center">
              Welcome, {user?.username}!
            </span>
          )}
          
          {user && user?.roles?.includes('admin') && (
            <Link to="/admin-panel" className="hover:text-gray-300 flex items-center">
              Admin Panel
            </Link>
          )}
          
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onLogout={handleLogout} 
      />
      
      {/* Developer tools - only shown in development */}
      {environmentType === 'development' && <DevButtons />}
    </nav>
  );
};

export default Navbar;