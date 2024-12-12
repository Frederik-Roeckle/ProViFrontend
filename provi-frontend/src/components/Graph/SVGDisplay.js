import React, { useState, useEffect } from "react";
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

//async function to get image data from server
async function getSVG(route) {
  const response = await fetch(
    `http://pm-vis.uni-mannheim.de:1234/vis/${route}`,
    {
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch SVG");
  }
  const svgData = await response.text();

  const parser = new DOMParser();
  const svgDocument = parser.parseFromString(svgData, "image/svg+xml");
  const svgElement = svgDocument.querySelector("svg");

  if (svgElement) {
    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", "100%");
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");

    if (!svgElement.hasAttribute("viewBox")) {
      const width = svgElement.getAttribute("width") || "100";
      const height = svgElement.getAttribute("height") || "100";
      svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }
  }

  const serializer = new XMLSerializer();
  const updatedSVG = serializer.serializeToString(svgDocument);

  return updatedSVG;
}

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
  const [svgContent, setSvgContent] = useState(null);
  const [scale, setScale] = useState(1); // State to hold current scale
  useEffect(() => {
    const loadSVG = async () => {
      try {
        const data = await getSVG(selectedSVG);
        console.log(data);
        setSvgContent(data);
      } catch (err) {
        setError("Failed to load SVG.");
      }
    };
    loadSVG();
  }, []);

  if (!svgContent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
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
          <div className="flex flex-col items-center justify-center w-full h-full">
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
              }}
              contentStyle={{ width: "100%", height: "100%" }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </TransformComponent>
            <Controls scale={scale} />
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export default SVGDisplay;
