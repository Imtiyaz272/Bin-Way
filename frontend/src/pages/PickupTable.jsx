/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

const PickupTable = ({ bins }) => {
  const [pickupStatus, setPickupStatus] = useState(
    bins.map((bin) => ({ binId: bin.binId, pickedUp: false }))
  );

  const handlePickup = async (binId) => {
    try {
      await axios.post("http://localhost:5000/pickupHome/updateBinStatus", { binId });

      setPickupStatus((prevStatus) =>
        prevStatus.map((bin) =>
          bin.binId === binId ? { ...bin, pickedUp: true } : bin
        )
      );
    } catch (error) {
      console.error("Error updating bin status:", error);
      alert("Failed to update the bin status. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pickup Table</h2>
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b border-gray-300 text-gray-600 text-left text-sm font-medium">
              Bin ID
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-gray-600 text-left text-sm font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {pickupStatus.map((bin) => (
            <tr key={bin.binId} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b border-gray-300 text-gray-700 text-sm">
                {bin.binId}
              </td>
              <td className="px-6 py-4 border-b border-gray-300">
                {!bin.pickedUp ? (
                  <button
                    onClick={() => handlePickup(bin.binId)}
                    className="relative flex items-center justify-center w-12 h-12 bg-purple-300 text-white rounded-full hover:bg-purple-400 transition-all duration-300"
                  >
                    <span className="absolute opacity-100 transition-opacity duration-300 text-xs text-gray-700">
                      Pickup
                    </span>
                  </button>
                ) : (
                  <div
                    className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full transition-all duration-300"
                  >
                    <FiCheck className="w-6 h-6" />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PickupTable;
