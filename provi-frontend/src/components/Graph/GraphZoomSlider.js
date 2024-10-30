"use client";

import React, { useState } from 'react';

const GraphZoomSlider = () => {
  const [zoom, setZoom] = useState(0);

  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-2/3 bg-white p-4 shadow-md rounded-md flex items-center gap-4">
      <button className="text-lg font-semibold">-</button>
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={zoom}
        onChange={handleZoomChange}
        className="w-32 "
      />
      <button className="text-lg font-semibold">+</button>
    </div>
  );
};

export default GraphZoomSlider;
