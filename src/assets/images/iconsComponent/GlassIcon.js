import Svg, { Path } from "react-native-svg";

const GlassIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    stroke="#000"
    className="icon flat-line"
    data-name="Flat Line"
    viewBox="-2.4 -2.4 28.8 28.8"
    {...props}
  >
    <Path
      d="m5.5 9.5 1.17 10.61a1 1 0 0 0 1 .89h8.44a1 1 0 0 0 1-.89L18.39 8.5c-6.3.05-6.65.94-12.89 1Z" 
      style={{
        fill: "#2ca9bc",
        strokeWidth: 0.792,
      }}
    />
    <Path
      d="M5.61 9.5c6.24-.06 6.59-.95 12.89-1"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 0.792,
      }}
    />
    <Path
      d="M18 3a1 1 0 0 1 1 1.11l-1.77 16a1 1 0 0 1-1 .89H7.78a1 1 0 0 1-1-.89L5 4.11A1 1 0 0 1 6 3Z"
      data-name="primary"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 0.792,
      }}
    />
  </Svg>
)
export default GlassIcon;
