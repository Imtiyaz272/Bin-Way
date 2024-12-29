import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Spinner from "../components/Spinner";

const IssuesReported = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null); // For the modal
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/adminHome/issues-reported")
      .then((res) => {
        setReports(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to fetch issues. Please try again later.", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar]);

  const handleResolveClick = (report) => {
    setSelectedReport(report); 
  };

  const handleModalClose = () => {
    setSelectedReport(null); 
  };

  const handleResolveConfirm = () => {
    if (selectedReport) {
      axios
        .delete(`http://localhost:5000/adminHome/resolved/${selectedReport._id}`)
        .then(() => {
          setReports((prev) => prev.filter((r) => r._id !== selectedReport._id));
          enqueueSnackbar("Issue resolved and removed successfully.", { variant: "success" });
          setSelectedReport(null);
        })
        .catch(() => {
          enqueueSnackbar("Failed to resolve issue. Please try again.", { variant: "error" });
        });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Reported Issues</h1>
      {reports.length > 0 ? (
        <div className="space-y-6 w-4/5 flex flex-col items-center">
          {reports.map((report, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 w-4/5 bg-white shadow"
            >
              <p className="text-gray-600">
                <strong>Subject :</strong> <strong>{report.issue}</strong>
              </p>
              <p className="text-gray-600">
                <strong>Area :</strong> {report.wardName}
              </p>
              <p className="text-gray-600">
                <strong>Submitted by :</strong> {report.citizen}
              </p>
              <p className="text-gray-600">
                <strong>Description :</strong> {report.description}
              </p>
              <p className="text-gray-600">
                <strong>Date :</strong> {new Date(report.date).toLocaleDateString()}
              </p>
              <button
                className="bg-purple-200 p-2 text-gray-700 rounded-lg text-sm mx-auto flex items-center justify-center hover:bg-purple-300"
                onClick={() => handleResolveClick(report)}
              >
                Resolved
              </button>
              {report.image && (
                <div className="mt-4">
                  <img
                    src={report.image}
                    alt="Issue"
                    className="rounded-lg max-h-48 object-cover w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No issues reported yet.</p>
      )}

      {selectedReport && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Resolve Issue</h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to mark this issue as resolved? This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleResolveConfirm}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesReported;
