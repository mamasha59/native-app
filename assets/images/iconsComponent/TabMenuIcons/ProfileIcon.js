import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const ProfileIcon = ({width, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={width}
    fill={color}
  >
    <G clipPath="url(#a)" opacity={1}>
      <Path
        fill={color}
        d="M12 .001c-6.627 0-12 5.372-12 12C0 18.627 5.373 24 12 24c6.628 0 12-5.372 12-12C24 5.373 18.628.001 12 .001Zm0 3.588a3.97 3.97 0 1 1 0 7.939 3.97 3.97 0 0 1 0-7.939Zm-.003 17.274a8.807 8.807 0 0 1-5.734-2.115 1.691 1.691 0 0 1-.594-1.286 4.003 4.003 0 0 1 4.022-4.002h4.619a3.997 3.997 0 0 1 4.016 4.002c0 .495-.216.964-.593 1.285a8.804 8.804 0 0 1-5.736 2.116Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ProfileIcon;
