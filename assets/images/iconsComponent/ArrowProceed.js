import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const ArrowProceed = ({width,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    fill={color}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M1.91 1.18 5.731 5l-3.82 3.82L3.09 10l5-5-5-5-1.18 1.18Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 10V0h10v10z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ArrowProceed
