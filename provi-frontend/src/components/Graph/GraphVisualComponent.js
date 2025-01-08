"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import SliderComponent from "./SliderComponent";
import SVGDisplay from "./SVGDisplay";
import useSWR from "swr";
import { UITrackingContext } from "../../utils/usertracking";

const MAPPING_URL = "https://pm-vis.uni-mannheim.de/api/vis/mapping";

const jsonFetcher = async (url) => {
  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Failed to fetch mapping.");
  }
  return response.json();
};

const GraphVisualComponent = () => {
  const { trackingData, addTrackingChange } = useContext(UITrackingContext);
  const { data: dfgMapping, error } = useSWR(MAPPING_URL, jsonFetcher);
  const [sliderAValue, setSliderAValue] = useState(0);
  const [sliderCValue, setSliderCValue] = useState(0);
  const [sliderMaxA, setSliderMaxA] = useState(0);
  const [sliderMaxC, setSliderMaxC] = useState(0);
  const [sliderMinA, setSliderMinA] = useState(0);
  const [sliderMinC, setSliderMinC] = useState(0);
  const [selectedSVG, setSelectedSVG] = useState(null);
  //use max and min to be able to set values of slider A and C
  //rename SVGs based on activity number and edge number
  //add slider styles
  //update marks based on steps available
  const prevAValueRef = useRef(sliderAValue);
  const initialSetRef = useRef(false); // To ensure initial setting of sliders only once

  //check of output */
  /*
  useEffect(() => {
    console.log("Current Tracking Data:", trackingData);
  }, [trackingData]);
   */

  const handleSliderAChange = (value) => {
    setSliderAValue(value);
    addTrackingChange("changeSliderAValue", "sliderA", "sliders", value);
  };

  // Handler for Slider C
  const handleSliderCChange = (value) => {
    setSliderCValue(value);
    addTrackingChange("changeSliderCValue", "sliderC", "sliders", value);
  };

  useEffect(() => {
    if (dfgMapping) {
      const keys = Object.keys(dfgMapping);
      const maxA = keys.length - 1;
      setSliderMaxA(maxA);

      // Determine path count for the current A
      const currentActivityKey = sliderAValue.toString();
      const pathCount = dfgMapping[currentActivityKey]?.length || 0;
      const maxC = pathCount - 1;
      setSliderMaxC(maxC);

      // Initial setup: only once when mapping is first available
      if (!initialSetRef.current) {
        // Set both sliders to their maximum values on first load
        setSliderAValue(maxA);
        addTrackingChange("initializeSliderA", "sliderA", "sliders", maxA);
        // After we set A to maxA, we need to recalculate maxC for that A
        const maxActivityKey = maxA.toString();
        const maxPathCount = dfgMapping[maxActivityKey]?.length || 0;
        const initialMaxC = maxPathCount - 1;
        setSliderCValue(initialMaxC);
        addTrackingChange(
          "initializeSliderC",
          "sliderC",
          "sliders",
          initialMaxC
        );
        initialSetRef.current = true;
        return;
      }

      // If A changed, reset C to the max for the new A, as A dominates
      if (sliderAValue !== prevAValueRef.current) {
        setSliderCValue(maxC);
        //addTrackingChange("resetSliderCtoMax", "sliderC", "sliders", maxC);
      } else {
        // If A didn't change, ensure C doesn't exceed maxC
        if (sliderCValue > maxC) {
          setSliderCValue(maxC);
          /* addTrackingChange(
            "resetSliderCtoMaxAsMaxExceeded",
            "sliderC",
            "sliders",
            maxC
          );*/
        }
      }

      // Update the selected SVG after possibly adjusting sliders
      if (pathCount > 0) {
        setSelectedSVG(`${sliderAValue}_${sliderCValue}`);
      } else {
        setSelectedSVG(null);
      }

      // Update prevAValueRef
      prevAValueRef.current = sliderAValue;
    }
  }, [dfgMapping, sliderAValue, sliderCValue]);

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Directly-Follows Graph</h2>
      <div className="flex flex-row w-full h-full mt-10 mb-4 rounded-md">
        <div className="w-[85%] bg-white rounded-md shadow-md items-left">
          <SVGDisplay selectedSVG={selectedSVG} />
        </div>
        <div className="flex flex-col items-center justify-between w-[15%]">
          <div className="w-20">
            <SliderComponent
              label="A"
              id="verticalSliderA "
              value={sliderAValue}
              onChange={handleSliderAChange}
              max={sliderMaxA}
              min={sliderMinA}
            />
            <SliderComponent
              label="C"
              id="verticalSliderC"
              value={sliderCValue}
              onChange={handleSliderCChange}
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
