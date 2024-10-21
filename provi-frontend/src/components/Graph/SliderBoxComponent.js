"use client";

import React from 'react';
import SliderComponent from './SliderComponent';

const SliderBoxComponent = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Adjust Parameters</h2>
      <SliderComponent label="Activities" id="sliderA" />
      <SliderComponent label="Connections" id="sliderC" />
    </div>
  );
};

export default SliderBoxComponent;