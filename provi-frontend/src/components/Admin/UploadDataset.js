"use client";

import React from 'react';

const UploadDataset = ({ datasetLabel, datasetName }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Upload/Change {datasetLabel}</h2>
      <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center h-32 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">New Upload</button>
      </div>
      <div className="text-gray-600">Current Dataset: {datasetName}</div>
    </div>
  );
};

export default UploadDataset;