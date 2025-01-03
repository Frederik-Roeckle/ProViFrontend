"use client";

import React from 'react';

export default function EndPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg h-auto w-3/4 mx-auto flex flex-col gap-8 my-16">
        <h1 className="text-3xl font-bold">Thank you for participating</h1>
        <p className="text-xl">
          Thank you for taking the time and participating in this experiment! 
          Your contribution is crucial to our research on understanding the user perspective of process mining visualizations. 
          <br />
          If you have any questions or would like to learn more about our research, please don’t hesitate to contact me at haege@uni-mannheim.de.
          <br />
          <br />
          Best
          <br />
          Marie
        </p>
      </div>
    </div>
  );
};

