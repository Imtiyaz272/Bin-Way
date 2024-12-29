import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { Link, Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { FaExclamationCircle, FaTruck, FaMapMarkedAlt } from 'react-icons/fa'; // Import icons

const AdminHome = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <AdminHeader />
          <div className="flex flex-1">
            {/* Sidebar */}
            <nav className="w-1/4 bg-purple-200 p-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/adminHome/issues-reported"
                    className="flex items-center gap-2 p-4 bg-purple-100 rounded-lg text-center hover:bg-purple-300 transition"
                  >
                    <FaExclamationCircle className="text-xl text-gray-900" /> {/* Issue icon */}
                    Issues reported by user
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adminHome/binStatus/1"
                    className="flex items-center gap-2 p-4 bg-purple-100 rounded-lg text-center hover:bg-purple-300 transition"
                  >
                    <FaTruck className="text-xl text-gray-900" /> {/* Waste pickup icon */}
                    Status of the waste pickup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/adminHome/wardData"
                    className="flex items-center gap-2 p-4 bg-purple-100 rounded-lg text-center hover:bg-purple-300 transition"
                  >
                    <FaMapMarkedAlt className="text-xl text-gray-900" /> {/* Ward data icon */}
                    Ward data
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Dynamic Content */}
            <main className="flex-1 p-4 bg-gray-50">
              <Outlet />
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
