"use client";

import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { logEvent } from "./logger"; 

const SliderComponent = ({ label, id, onChange, value, max, min }) => {
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 mb-2 bg-white rounded-md shadow-md">
      <label htmlFor={id} className="font-semibold">
        {label}:
      </label>
      <Slider
        aria-labelledby={id}
        value={value}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        step={1}
        marks
        min={min}
        max={max}
        orientation="vertical"
        style={{ height: 160 }}
      />
      <span className="font-semibold">
        {value}/{max}
      </span>
    </div>
  );
};

export default SliderComponent;
