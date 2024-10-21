"use client";

import React from 'react';

const QuestionnaireComponent = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md flex-grow flex flex-col gap-4">
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Questionnaire Instructions</h2>
        <p className="text-gray-600">Placeholder for instructions or introductory questions</p>
      </div>
      <div className="flex-grow bg-gray-200 p-6 rounded-md flex items-center justify-center">
        <p className="text-gray-600">Questionnaire Placeholder</p>
      </div>
    </div>
  );
};

export default QuestionnaireComponent;