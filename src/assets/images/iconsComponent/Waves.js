import Svg, { Path } from "react-native-svg";

const Waves = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
    <Path
      fill="#3498db"
      d="M0 96h48c48 0 144 0 240 16s192 48 288 42.7c96-5.7 192-47.7 288-53.4 96-5.3 192 26.7 288 37.4 96 10.3 192 .3 240-5.4l48-5.3v192H0Z"
    />
  </Svg>
)
export default Waves;
