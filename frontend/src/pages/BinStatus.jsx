import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import Spinner from "../components/Spinner";

const BinStatus = () => {
  const [wardId, setWardId] = useState("");
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pickedUpBins, setPickedUpBins] = useState([]);

  const fetchBins = () => {
    if (!wardId) {
      alert("Please enter a ward name.");
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:5000/adminHome/binStatus/${wardId}`)
      .then((res) => {
        setBins(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Failed to fetch bins. Please try again.");
      });
  };

  const handlePickedUpBins = () => {
    const pickedBins = bins.filter((bin) => bin.status === "picked up").map((bin) => bin.binId);
    setPickedUpBins(pickedBins);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Bin Status</h1>

      {/* Search Section */}
      <div className="mb-6 flex items-center bg-purple-200 text-white rounded-full px-4 py-2 shadow-md">
        <FaSearch className="text-gray-900 mr-2" />
        <input
          type="text"
          value={wardId}
          onChange={(e) => setWardId(e.target.value)}
          placeholder="Enter ward ID"
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-900 outline-none"
        />
        <button
          onClick={fetchBins}
          className="ml-4 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all"
        >
          Submit
        </button>
      </div>

      {/* Bin List */}
      {bins.length > 0 ? (
        <div>
        <div className="flex flex-wrap gap-6">
          {bins.map((bin, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="relative w-12 h-40 border border-gray-300 bg-gray-200 rounded-lg overflow-hidden shadow"
              >
                <div
                  className="absolute bottom-0 left-0 w-full bg-purple-300"
                  style={{ height: `${bin.fillLevel}%` }}
                ></div>
              </div>
              <p className="mt-2 font-bold text-center">{bin.binId}</p>
            </div>
          ))}
        </div>
        <button
        onClick={handlePickedUpBins}
        className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center shadow-lg hover:bg-green-600 transition-all"
      >
        <FiCheck className="mr-2" /> Picked Up Today
      </button>
        </div>
      ) : (
        <p className="text-gray-600">No bins found.</p>
      )}

      {/* Picked-Up Bin IDs Display */}
      {pickedUpBins.length > 0 && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Picked Up Bin IDs:</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {pickedUpBins.map((binId, index) => (
              <li key={index}>{binId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BinStatus;
