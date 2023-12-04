import { View, Animated, Dimensions} from "react-native";
import { iSliderItem } from "../sliders";

const {width} = Dimensions.get("window");

interface iSliderDot {
  data: iSliderItem[];
  scrollX:Animated.Value
}

const SliderDot = ({data, scrollX}:iSliderDot) => {
    return (
      <View className="flex-row h-[10px] mb-5">
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          const dotWith = scrollX.interpolate({
            inputRange,
            outputRange: [10,15,10],
            extrapolate: 'clamp',
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3,1,0.3],
            extrapolate: 'clamp',
          })
          
          return <Animated.View style={{width:dotWith, opacity}} className={`h-[10px] bg-purple-button rounded-full mx-2`} key={i.toString()}/>
        })}
      </View>
    );
};

export default SliderDot;
