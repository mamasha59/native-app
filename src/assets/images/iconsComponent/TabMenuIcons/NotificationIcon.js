import Svg, { G, Path} from "react-native-svg";

const NotificationIcon = ({ width, color }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={width}
    fill={color}
    >
    <G fill={color}>
      <Path d="M17.305 12.056V7.34A7.326 7.326 0 0 0 9.965 0a7.306 7.306 0 0 0-7.317 7.34v4.716L.743 15.819h18.514l-1.952-3.763ZM6.875 16.91A3.103 3.103 0 0 0 9.965 20a3.103 3.103 0 0 0 3.09-3.09h-6.18Z" />
    </G>
  </Svg>
);

export default NotificationIcon;
