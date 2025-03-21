import React from 'react';
import { Link } from 'react-router-dom';

// Interface for a navigation link
interface NavLink {
  path: string;
  label: string;
}

const NavLinks: React.FC = () => {
  // List of navigation links - easy to extend
  const links: NavLink[] = [
    { path: '/league-manager', label: 'League Manager' },
    { path: '/card-pool-manager', label: 'Card Pool Manager' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.path} 
          to={link.path} 
          className="hover:text-gray-300 flex items-center"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;