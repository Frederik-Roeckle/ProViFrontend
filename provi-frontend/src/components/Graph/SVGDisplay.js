import HundredANDHundred from "../../public/images/100:100.svg";
import EightyANDHundred from "../../public/images/80:100.svg";
import SixtyANDHundred from "../../public/images/60:100.svg";
import SixtyANDFifty from "../../public/images/60:50.svg";
import ZeroANDZero from "../../public/images/0:0.svg";

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
      <SVGComponent width="100%" height="100%" />
    </div>
  );
};

export default SVGDisplay;
