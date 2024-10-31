"use client";

import React from 'react';

const DownloadSurvey = ({ surveyLabel }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Download {surveyLabel}</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Download</button>
    </div>
  );
};

export default DownloadSurvey;