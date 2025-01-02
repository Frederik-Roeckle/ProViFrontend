"use client";

import React from 'react';

const DownloadBox = ({ title }) => {
  const handleDownload = () => {
    // add the get method from python backend from freddy filter on the title wether ui, questionnaire or user and then use the responding get method
    console.log(`${title} - Download button clicked`);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-auto w-full flex flex-col gap-4 items-center max-h-[200px]">
      <h3 className="text-lg font-semibold">{title}</h3>
      <button className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleDownload}>Download </button>
    </div>
  );
};

export default DownloadBox;

