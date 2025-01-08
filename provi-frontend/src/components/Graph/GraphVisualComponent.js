"use client";

import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
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
  const initialSetRef = useRef(false);

  // Function to get the maximum C value for a given activity
  const getMaxCForActivity = (activityKey) => {
    if (!dfgMapping || !dfgMapping[activityKey]) return 0;
    return Math.max(0, dfgMapping[activityKey].length - 1);
  };

  // Updated handler for Slider A
  const handleSliderAChange = (value) => {
    setSliderAValue(value);
    // Immediately calculate and set the appropriate C value
    const newMaxC = getMaxCForActivity(value.toString());
    setSliderCValue(newMaxC);
    setSliderMaxC(newMaxC);

    // Track both changes
    addTrackingChange("changeSliderAValue", "sliderA", "sliders", value);
  };

  // Handler for Slider C
  const handleSliderCChange = (value) => {
    const maxCValue = getMaxCForActivity(sliderAValue.toString());
    const validValue = Math.min(value, maxCValue);
    setSliderCValue(validValue);
    addTrackingChange("changeSliderCValue", "sliderC", "sliders", validValue);
  };

  // Initial setup effect
  useEffect(() => {
    if (dfgMapping && !initialSetRef.current) {
      const maxA = Math.max(0, Object.keys(dfgMapping).length - 1);
      setSliderMaxA(maxA);

      // Set initial A value
      setSliderAValue(maxA);

      // Calculate and set initial C value for the maximum A
      const initialMaxC = getMaxCForActivity(maxA.toString());
      setSliderMaxC(initialMaxC);
      setSliderCValue(initialMaxC);

      // Track initial setup
      addTrackingChange("initializeSliderA", "sliderA", "sliders", maxA);
      addTrackingChange("initializeSliderC", "sliderC", "sliders", initialMaxC);

      initialSetRef.current = true;
    }
  }, [dfgMapping]);

  // Effect to update selectedSVG
  useEffect(() => {
    if (dfgMapping) {
      const currentActivityKey = sliderAValue.toString();
      const maxC = getMaxCForActivity(currentActivityKey);

      if (maxC >= 0) {
        const validC = Math.min(sliderCValue, maxC);
        setSelectedSVG(`${sliderAValue}_${validC}`);
      } else {
        setSelectedSVG(null);
      }
    }
  }, [sliderAValue, sliderCValue, dfgMapping]);

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
