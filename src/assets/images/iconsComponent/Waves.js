import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../store/hooks";

const Waves = () => {
  const setting = useAppSelector(state => state.appStateSlice); 

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <Path
      fill={setting.urineMeasure && setting.ifCountUrinePopupLiquidState ? '#fdcb6e' : '#3bacf7'}
      d="m 0 96 l 40 -6 c 123 -15 276 28 440 27.3 c 160 10.7 320 -21.3 480 -32 c 160 -10.3 320 -0.3 400 5.4 l 80 5.3 l 0 224 l -80 0 c -80 0 -240 0 -400 0 c -160 0 -320 0 -480 0 c -160 0 -320 0 -400 0 l -80 0 z"
    />
  </Svg>
  )
}
  
export default Waves;
