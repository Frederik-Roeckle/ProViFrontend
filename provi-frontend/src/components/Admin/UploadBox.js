"use client";

import React from 'react';

const UploadBox = ({ title }) => {
  const handleUpload = () => {
    // add post method to backend for the dataset
    console.log(`${title} - Upload button clicked`);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-auto w-full flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 h-32 rounded-md">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleUpload}>New Upload</button>
      </div>
      <div className="mt-4">
        <h4 className="text-md font-medium">Current Dataset</h4>
        <div className="flex items-center justify-between border p-2 rounded-md mt-2">
          <span>Example1.xes</span>
          <span>604KB</span>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;

