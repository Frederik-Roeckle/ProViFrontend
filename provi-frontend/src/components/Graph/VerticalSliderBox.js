"use client";

import React from 'react';
import SliderComponent from './SliderComponent';

const VerticalSliderBox = () => {
  return (
    <div className="flex flex-col gap-4 ml-4">
      <SliderComponent label="A" id="verticalSliderA" />
      <SliderComponent label="C" id="verticalSliderC" />
    </div>
  );
};

export default VerticalSliderBox;