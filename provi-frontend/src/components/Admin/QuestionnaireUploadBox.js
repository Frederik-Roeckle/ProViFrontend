"use client";

import React, { useRef } from 'react';

const QuestionnaireUploadBox = ({ title }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`${title} - File selected: ${file.name}`);
      // Add the API Sent method
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md h-auto w-full flex flex-col gap-4 max-h-[500px]">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 h-32 rounded-md">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleUploadClick}>New Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>
      <div className="mt-4">
        <h4 className="text-md font-medium">Current Questionnaire</h4>
        <div className="flex items-center justify-between border p-2 rounded-md mt-2">
          <span>Questionnaire1.csv (need to add the reference from the database of current questionnaire</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireUploadBox;