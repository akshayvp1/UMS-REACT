import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-300 text-gray-900 h-10 flex items-center justify-center text-sm w-full fixed bottom-0">
      <p>© {year} Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
