import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import Header from '../pages/Header';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <Header />
          {/* Main Content */}
          <main className="flex flex-1 justify-center items-center bg-gray-50 bg-[url('/src/assets/smartBin4.jpeg')] bg-cover bg-center min-h-screen" >
          <div className=" absolute top-36 left-10 text-center bg-white bg-opacity-80 p-6 rounded-md shadow-lg">
              <h1 className="text-2xl font-bold text-gray-700 mb-4">
                FOR CLEANER TOMORROW
              </h1>
              <div className="flex items-center justify-center space-x-4 text-gray-700 font-semibold text-lg">
                <span>Track</span>
                <FaArrowRight className="text-purple-500" />
                <span>Manage</span>
                <FaArrowRight className="text-purple-500" />
                <span>Sustain</span>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Home;
