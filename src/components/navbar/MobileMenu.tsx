import React from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import useUserContext from '../../context/useUserContext';


interface MobileMenuProps {
  isOpen: boolean;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onLogout }) => {
  const { user } = useUserContext();
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-gray-700 mt-2 rounded-md p-4 flex flex-col space-y-4">
      {/* Navigation Links */}
      <div className="flex flex-col space-y-3">
        <NavLinks />
        
        {user && user?.roles?.includes('admin') && (
          <Link to="/admin-panel" className="hover:text-gray-300">
            Admin Panel
          </Link>
        )}
      </div>
      
      {/* User Information */}
      {user && user?.username && (
        <div className="text-gray-300 border-t border-gray-600 pt-3">
          Welcome, {user?.username}!
        </div>
      )}
      
      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="bg-blue-500 text-white p-2 rounded hover:bg-red-700 transition duration-300 w-full"
      >
        Logout
      </button>
    </div>
  );
};

export default MobileMenu;