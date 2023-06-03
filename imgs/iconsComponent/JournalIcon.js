import Svg, { G, Path } from "react-native-svg";

const JournalIcon = ({width, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    fill={color}
  >
    <G fill={color} opacity={1}>
      <Path d="M20.4 2.4H18v4.8H6V2.4H3.6c-.72 0-1.2.48-1.2 1.2v19.2c0 .72.48 1.2 1.2 1.2h16.8c.72 0 1.2-.48 1.2-1.2V3.6c0-.72-.48-1.2-1.2-1.2Z" />
      <Path d="M14.4 0H9.6c-.72 0-1.2.48-1.2 1.2v3.6h7.2V1.2c0-.72-.48-1.2-1.2-1.2Z" />
    </G>
  </Svg>
)
export default JournalIcon;
