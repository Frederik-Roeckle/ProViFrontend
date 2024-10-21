"use client";

import React, { useState } from 'react';

const SliderComponent = ({ label, id }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <label htmlFor={id} className="font-semibold">{label}:</label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-full"
      />
      <span className="font-semibold">{value}%</span>
    </div>
  );
};

export default SliderComponent;
