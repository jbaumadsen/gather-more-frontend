import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo: React.FC = () => {
  return (
    <div className="text-lg font-semibold">
      <Link to="/" className="hover:text-gray-300 flex items-center gap-2">
        <img src="/gather-more-icon.png" alt="GatherMore" className="w-10 h-10 md:w-16 md:h-16" />
        <span className="text-xl md:text-2xl font-bold">GatherMore</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;