"use client";

import React, { useState, useEffect } from "react";
import SliderComponent from "./SliderComponent";
import GraphZoomSlider from "./GraphZoomSlider";
import SVGDisplay from "./SVGDisplay";

const GraphVisualComponent = () => {
  const [sliderAValue, setSliderAValue] = useState(4);
  const [sliderCValue, setSliderCValue] = useState(1);
  const [sliderMaxA, setSliderMaxA] = useState(4);
  const [sliderMaxC, setSliderMaxC] = useState(1);
  const [sliderMinA, setSliderMinA] = useState(1);
  const [sliderMinC, setSliderMinC] = useState(1);
  const [selectedSVG, setSelectedSVG] = useState("HundredHundred");
  //use max and min to be able to set values of slider A and C
  //rename SVGs based on activity number and edge number
  //add slider styles
  //update marks based on steps available
  useEffect(() => {
    //change image and slider values based on options
    if (sliderAValue === 4) {
      setSelectedSVG("HundredHundred");
      setSliderAValue(4);
      setSliderCValue(1);
      setSliderMaxC(1);
      setSliderMinC(1);
    } else if (sliderAValue === 3) {
      setSliderAValue(3);
      setSliderCValue(1);
      setSelectedSVG("EightyHundred");
      setSliderMaxC(1);
      setSliderMinC(1);
    } else if (sliderAValue === 2) {
      if (sliderCValue === 2) {
        setSliderMaxC(2);
        setSelectedSVG("SixtyHundred");
      } else if (sliderCValue === 1) {
        setSliderMaxC(2);
        setSliderCValue(1);
        setSelectedSVG("SixtyFifty");
      }
    } else if (sliderAValue === 1) {
      setSliderAValue(1);
      setSliderCValue(1);
      setSelectedSVG("ZeroZero");
      setSliderMaxC(1);
      setSliderMinC(1);
    }
  }, [sliderAValue, sliderCValue]);

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Directly-Follows Graph</h2>
      <div className="flex flex-row w-full mt-10 mb-4 rounded-md">
        <div className="w-[85%] bg-white rounded-md shadow-md items-left">
          <SVGDisplay selectedSVG={selectedSVG} />
        </div>
        <div className="flex flex-col items-center justify-between w-[15%]">
          <div className="w-20">
            <SliderComponent
              label="A"
              id="verticalSliderA "
              value={sliderAValue}
              onChange={setSliderAValue}
              max={sliderMaxA}
              min={sliderMinA}
            />
            <SliderComponent
              label="C"
              id="verticalSliderC"
              value={sliderCValue}
              onChange={setSliderCValue}
              max={sliderMaxC}
              min={sliderMinC}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualComponent;
