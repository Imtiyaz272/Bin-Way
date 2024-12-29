import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation(); 

  return (
    <header className="flex items-center justify-between p-4 border-b-4 bg-gray-900 text-white">
      <Link to='/'>
          <div className="text-2xl font-bold text-purple-300">
            Bin <span className="text-white">Way</span>
          </div>
      </Link>

      <nav className="space-x-4">
        <Link
          to="/report"
          className={`text-white hover:text-purple-300 ${
            location.pathname === '/report' ? 'border-b-2 border-purple-300' : ''
          }`}
        >
          Report
        </Link>

        <Link
          to="/auth/login"
          className={`text-white hover:text-purple-300 ${
            location.pathname === '/auth/login' ? 'border-b-2 border-purple-300' : ''
          }`}
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
