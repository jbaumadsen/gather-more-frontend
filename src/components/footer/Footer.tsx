// components/footer/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white mt-8 py-4">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} Gather More. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;