import Svg, { G, Path } from "react-native-svg";

const HomeIcon = ({width, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    fill={color}
  >
    <G fill={color} opacity={1}>
      <Path d="m12 7.17-8.255 6.352v8.51h6.633v-6.236h3.524v6.236h6.353v-8.51L12 7.17Z" />
      <Path d="M20.6 8.584v-4.35h-3.476V5.91L12 1.968 0 11.199l1.657 2.154L12 5.393l10.343 7.96L24 11.199l-3.4-2.615Z" />
    </G>
  </Svg>
)
export default HomeIcon;
