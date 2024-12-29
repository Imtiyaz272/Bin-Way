import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PickupHeader from "./PickupHeader";
import Spinner from "../components/Spinner";

const PickupHome = () => {
  const [loading, setLoading] = useState(false);
  const [ward, setWard] = useState("");
  const [officeId, setOffice] = useState("");
  const [wards, setWards] = useState(["W0004", "W0005", "W0006"]);
  const [offices, setOffices] = useState([
    "O01",
    "O02",
    "O03",
    "O04",
  ]);
  const navigate = useNavigate();

  const fetchRoute = async () => {
    if (!ward || !officeId) {
      alert("Please select both a ward and an office location.");
      return;
    }
    setLoading(true);
     axios.post("http://localhost:5000/pickupHome/getRoute", { ward, officeId })
     .then((response)=>{
      const routeData = response.data; 
      console.log(response.data);
      navigate("/pickupHome/showMap", { state: { routeData } })
     })
    .catch ((error) => {
      console.error("Error fetching route:", error);
      alert("Failed to fetch route. Please try again.");
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <PickupHeader />
          <div className="flex flex-col items-center justify-center flex-1 p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Route Finder</h1>
            <div className="w-full max-w-md">
              <div className="mb-6">
                <label className="block mb-2 text-lg font-medium text-gray-700">
                  Select Ward
                </label>
                <select
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                >
                  <option value="">-- Select Ward --</option>
                  {wards.map((wardName, index) => (
                    <option key={index} value={wardName}>
                      {wardName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-lg font-medium text-gray-700">
                  Select Office
                </label>
                <select
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  value={officeId}
                  onChange={(e) => setOffice(e.target.value)}
                >
                  <option value="">-- Select Office --</option>
                  {offices.map((officeName, index) => (
                    <option key={index} value={officeName}>
                      {officeName}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={fetchRoute}
                className="w-full px-6 py-3 text-lg font-semibold text-gray-900 bg-purple-300 rounded-lg shadow-lg hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              >
                Fetch Route
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PickupHome;
