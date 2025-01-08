import React, { createContext, useState } from "react";

export const UITrackingContext = createContext();

export const UITrackingProvider = ({ children }) => {
  const [trackingData, setTrackingData] = useState({
    userActivity: [],
  });

  /* 
  example call:
    activity: zoomIn
    uiElement: zoom
    uiGroup: Graph
    value: 120%

    activity: changeSliderAValue
    uiElement: sliderA
    uiGroup: sliders
    value: 8
  */
  const addTrackingChange = (activity, uiElement, uiGroup, value) => {
    const timestamp = new Date().toISOString();
    const newValue = JSON.stringify(value);
    setTrackingData((prev) => ({
      ...prev,
      ["userActivity"]: [
        ...prev["userActivity"],
        { activity, uiElement, uiGroup, newValue, timestamp },
      ],
    }));
  };

  const clearTrackingData = () => {
    setTrackingData({
      userActivity: [],
    });
  };

  return (
    <UITrackingContext.Provider
      value={{ trackingData, addTrackingChange, clearTrackingData }}
    >
      {children}
    </UITrackingContext.Provider>
  );
};
