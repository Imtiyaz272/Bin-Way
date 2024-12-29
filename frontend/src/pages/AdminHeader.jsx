import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminHeader = () => {
  const location = useLocation(); // Get current route

  return (
    <header className="flex items-center justify-between p-4 border-b-4 bg-gray-900 text-white">
      <Link to='/'>
               <div className="text-2xl font-bold text-purple-300">
                 Bin <span className="text-white">Way</span>
               </div>
      </Link>

      <nav className="space-x-4">
        <Link
          to="/adminHome"
          className={`text-white hover:text-purple-300 ${
            location.pathname === '/adminHome' ? 'border-b-2 border-purple-300' : ''
          }`}
        >
          Home
        </Link>

        <Link
          to="/auth/logout"
          className={`text-white hover:text-purple-300 ${
            location.pathname === '/auth/logout' ? 'border-b-2 border-purple-300' : ''
          }`}
        >
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
