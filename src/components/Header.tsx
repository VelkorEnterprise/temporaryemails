import React from 'react';

const Header: React.FC<{ onNavigateBlog: () => void, onGoHome: () => void }> = ({ onNavigateBlog, onGoHome }) => {
  return <header className="text-white p-4">Header</header>;
};

export default Header;
