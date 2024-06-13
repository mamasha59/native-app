import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../store/hooks";

const Waves = () => {
  const setting = useAppSelector(state => state.appStateSlice); 

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <Path
      fill={setting.urineMeasure && setting.ifCountUrinePopupLiquidState ? '#fdcb6e' : '#3bacf7'}
      d="M0 96h48c48 0 144 0 240 16s192 48 288 42.7c96-5.7 192-47.7 288-53.4 96-5.3 192 26.7 288 37.4 96 10.3 192 .3 240-5.4l48-5.3v192H0Z"
    />
  </Svg>
  )
}
  
export default Waves;
