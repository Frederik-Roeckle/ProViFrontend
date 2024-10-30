"use client";

import React, { useState } from 'react';

const SliderComponent = ({ label, id }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 mb-4 w-64 -translate-x-1">
      <label htmlFor={id} className="font-semibold -rotate-90 ">{label}:</label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full h-2"
      />
      <span className="font-semibold -rotate-90">{value}%</span>
    </div>
  );
};

export default SliderComponent;
