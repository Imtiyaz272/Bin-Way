import React, { useState } from 'react';
import axios from 'axios';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import Header from './Header';
import Spinner from '../components/Spinner';

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const submitReport = () => {
    if (!type || !area || !description) {
      enqueueSnackbar('Please fill in all required fields.', { variant: 'error' });
      return;
    }

    setLoading(true);
    const reportData = { type, area, name, description };

    axios
      .post('http://localhost:5000/citizen/report', reportData)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar('Your report has been submitted successfully.', { variant: 'success' });
        // Reset form fields
        setType('');
        setArea('');
        setName('');
        setDescription('');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error in submitting report. Please try again later.', { variant: 'error' });
      });
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen bg-purple-50 flex items-center justify-center">
          <div className="w-full max-w-lg p-6 bg-purple-200 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Submit a Report</h2>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-gray-900 font-semibold mb-1">Type of Issue</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 text-gray-900 bg-purple-100 border-none rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                >
                  <option value="" disabled>
                    Select type of issue
                  </option>
                  <option value="Damaged bin">Damaged bin</option>
                  <option value="Overflowing bin">Overflowing bin</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-gray-900 font-semibold mb-1">Area</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter the area"
                  className="w-full px-3 py-2 text-gray-900 bg-purple-100 border-none rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-900 font-semibold mb-1">Name (Optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name (optional)"
                  className="w-full px-3 py-2 text-gray-900 bg-purple-100 border-none rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-900 font-semibold mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue"
                  rows="4"
                  className="w-full px-3 py-2 text-gray-900 bg-purple-100 border-none rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                ></textarea>
              </div>

              <button
                onClick={submitReport}
                className="w-full py-2 mt-4 font-bold text-purple-100 bg-gray-900 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-50 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
