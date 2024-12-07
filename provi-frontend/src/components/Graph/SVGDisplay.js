import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import HundredANDHundred from "../../public/images/100_100.svg";
import {
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const Controls = ({ scale }) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="flex justify-end m-5 ">
      <Stack
        direction="row"
        spacing={1}
        className="items-center p-2 bg-white rounded-md shadow-md"
      >
        <IconButton
          aria-label="delete"
          onClick={() => {
            zoomIn();
          }}
        >
          <AddCircleIcon />
        </IconButton>
        <div className="font-medium font-semibold">
          {Math.round(scale * 100)}%
        </div>
        <IconButton
          aria-label="delete"
          onClick={() => {
            zoomOut();
          }}
        >
          <RemoveCircleIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => {
            resetTransform();
          }}
        >
          <RestartAltIcon />
        </IconButton>
      </Stack>
    </div>
  );
};

const SVGDisplay = ({ selectedSVG }) => {
  const SVGComponent = HundredANDHundred;
  const [scale, setScale] = useState(1); // State to hold current scale
  if (!SVGComponent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">SVG {selectedSVG} not found.</p>
      </div>
    );
  }

  const handleTransform = (e) => {
    setScale(e.instance.transformState.scale); // Update scale in state
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <TransformWrapper
        initialScale={1}
        onTransformed={handleTransform}
        maxScale={4}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div className="flex flex-col w-full h-full">
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
              }}
              contentStyle={{ width: "100%", height: "100%" }}
            >
              <SVGComponent width="100%" height="100%" />
            </TransformComponent>
            <Controls scale={scale} />
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export default SVGDisplay;
