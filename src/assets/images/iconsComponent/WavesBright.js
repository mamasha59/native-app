import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../store/hooks";

const WavesBright = (props) => {
  const setting = useAppSelector(state => state.appStateSlice); 

  return (
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
      <Path
         fill={setting.urineMeasure && setting.ifCountUrinePopupLiquidState ? '#ffeaa7' : '#3bacf7'}
        d="m0 320 48-5.3c48-5.7 144-15.7 240-53.4C384 224 480 160 576 160s192 64 288 64 192-64 288-90.7c96-26.3 192-16.3 240-10.6l48 5.3v192H0Z"
      />
    </Svg>
  )
}
export default WavesBright;
