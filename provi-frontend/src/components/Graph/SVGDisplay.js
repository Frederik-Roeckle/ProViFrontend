import React from "react";
import HundredANDHundred from "../../public/images/100_100.svg";
import EightyANDHundred from "../../public/images/80_100.svg";
import SixtyANDHundred from "../../public/images/60_100.svg";
import SixtyANDFifty from "../../public/images/60_50.svg";
import ZeroANDZero from "../../public/images/0_0.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const svgComponents = {
  HundredHundred: HundredANDHundred,
  EightyHundred: EightyANDHundred,
  SixtyHundred: SixtyANDHundred,
  SixtyFifty: SixtyANDFifty,
  ZeroZero: ZeroANDZero,
};

const SVGDisplay = ({ selectedSVG }) => {
  const SVGComponent = svgComponents[selectedSVG];
  if (!SVGComponent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">SVG "{selectedSVG}" not found.</p>
      </div>
    );
  }
  return (
    <div>
      <TransformWrapper initialScale={1}>
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
          contentStyle={{ width: "100%", height: "100%" }}
        >
          <SVGComponent width="100%" height="100%" />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default SVGDisplay;
