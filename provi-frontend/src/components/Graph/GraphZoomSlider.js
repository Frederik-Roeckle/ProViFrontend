"use client";

import React, { useState } from "react";

const GraphZoomSlider = () => {
  const [zoom, setZoom] = useState(0);

  const handleZoomChange = (e) => {
    setZoom(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 p-4 mt-10 bg-white rounded-md shadow-md">
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
