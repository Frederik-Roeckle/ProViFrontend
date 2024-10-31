"use client";

import React from 'react';
import SliderComponent from './SliderComponent';
import GraphZoomSlider from './GraphZoomSlider';

const GraphVisualComponent = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md h-full flex flex-col relative">
      <h2 className="text-lg font-semibold mb-4">Directly-Follows Graph</h2>
      <div className="flex-grow flex items-center justify-center rounded-md w-full mb-4 relative">
        <p className="text-gray-600">DFG Graph Placeholder</p>
      
        <div className=" flex gap-4 items-start mt-4">
          <div className="w-4/5">

          </div>
          <div className="absolute top-0 right-0 w-[15%] flex flex-col gap-4 md:rotate-90 ">

            <SliderComponent label="A" id="verticalSliderA " className="transform rotate-90"/>
            <SliderComponent label="C" id="verticalSliderC" className="transform rotate-90"/>
            
          </div>
          {/* <div className="absolute bottom-4 right-20">
            <GraphZoomSlider />
          </div> */}
          <div className="absolute bottom-0 right-20 ">
            <GraphZoomSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualComponent;


{/* <div className="flex gap-4 items-start mt-4"></div>
        <div className=" top-4 right-4 flex flex-col gap-4 md:rotate-90">
          <SliderComponent label="A" id="verticalSliderA" className="transform rotate-90"/>
          <SliderComponent label="C" id="verticalSliderC" className="transform rotate-90"/>
        </div >
      <div className="absolute bottom-4 right-4">
        <GraphZoomSlider  />
      </div>
    </div> */}