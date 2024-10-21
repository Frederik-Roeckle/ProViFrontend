"use client";

import React from 'react';

const UploadQuestionnaire = ({ questionnaireLabel, questionnaireName }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Upload {questionnaireLabel}</h2>
      <div className="flex items-center gap-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
        <div className="text-gray-600">Current Dataset: {questionnaireName}</div>
      </div>
    </div>
  );
};

export default UploadQuestionnaire;