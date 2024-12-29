import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const WardData = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search input

  useEffect(() => {
    const fetchWards = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/adminHome/wardData");
        setWards(response.data.data);
      } catch (error) {
        console.error("Error fetching wards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWards();
  }, []);

  const filteredWards = wards.filter((ward) =>
    ward.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Ward Data</h1>
      
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by Name"
          className="px-4 py-2 border border-gray-400 rounded"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      
      {filteredWards.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-400 w-7/12 text-left mx-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2 w-1/4">Ward ID</th>
              <th className="border border-gray-400 px-4 py-2 w-3/4">Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredWards.map((ward) => (
              <tr key={ward.wardId}>
                <td className="border border-gray-400 px-4 py-2">{ward.wardId}</td>
                <td className="border border-gray-400 px-4 py-2">{ward.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No wards found.</p>
      )}
    </div>
  );
};

export default WardData;
