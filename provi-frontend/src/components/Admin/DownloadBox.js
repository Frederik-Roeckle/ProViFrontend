"use client";

import React from 'react';

const DownloadBox = ({ title }) => {
  const handleDownload = () => {
    // add the get method from python backend from freddy
    console.log(`${title} - Download button clicked`);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-auto w-full flex flex-col gap-4 items-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadBox;

