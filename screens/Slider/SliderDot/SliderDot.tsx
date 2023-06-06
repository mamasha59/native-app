import { View } from "react-native";

interface iSliderDot {
    isLight: boolean;
    selected: boolean;
}

const SliderDot = ({isLight, selected}:iSliderDot) => {
    let backgroundColor;
    if (isLight) backgroundColor = selected ? '#9966AA' : '#4babc576';
 
    return (
      <View style={{width: 10, height: 10, borderRadius:100, marginHorizontal: 3,backgroundColor}}/>
    );
};

export default SliderDot;
