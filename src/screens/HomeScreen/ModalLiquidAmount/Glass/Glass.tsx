import { Dimensions, StyleSheet, View, TextInput } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {useAnimatedProps, useAnimatedStyle, useSharedValue, runOnJS } from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { useEffect } from "react";
import Waves from "../../../../assets/images/iconsComponent/Waves";
import WavesBright from "../../../../assets/images/iconsComponent/WavesBright";

const windowSize = Dimensions.get('window');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface iGlass {
    onValueChange: (value: any) => void,
    customValue: number,
}

const Glass = ({onValueChange, customValue}:iGlass) => {

  const offset = useSharedValue({y: 0});
  const start = useSharedValue({y: 0});
  const translateY = useSharedValue(0);
  const value = useSharedValue(0); // Shared value to hold the current value

  const propsLabel = useAnimatedProps(() => {
    return {
        text: `${Math.round(value.value)} мл.`
    }
  })

  const animatedStyleScrollUpDown = useAnimatedStyle(() => { // scrool animation
    return {
      transform: [
        { translateY: offset.value.y },
      ],
    }
  });

  useEffect(() => {
    const maxScrollHeight = windowSize.height / 2.20;
    const initialTranslateY = (1 - (customValue / 1000)) * maxScrollHeight;

    translateY.value = initialTranslateY;
    offset.value = { y: initialTranslateY };
    start.value = { y: initialTranslateY };
    value.value = customValue;
  }, [customValue]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
        translateY.value = Math.max(Math.min(e.translationY + start.value.y, windowSize.height / 2.20), 0); // adges of scroll
        offset.value = { y: translateY.value };
        value.value = Math.max(Math.min((windowSize.height / 2.1 - (e.translationY + start.value.y)) / (windowSize.height / 2.20) * 1000, 1000), 0); // max 1000
    })
    .onEnd((e) => {
      start.value = { y: offset.value.y };
      runOnJS(onValueChange)(`${Math.round(value.value)}`)
    })
    .minDistance(2)

    return (
    <>
    <View className="bg-[#dde2e3] rounded-b-[100px] rounded-t-xl justify-end overflow-hidden pt-3" style={{height: windowSize.height / 2, width: windowSize.width / 1.5}}>
        <GestureHandlerRootView>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[GlassModal.arrowDrag, animatedStyleScrollUpDown]}>
                        <View className="w-full h-full bg-[#3498db] relative items-center">
                            <View className="items-center absolute -top-4 w-7 h-7 border rounded-full" style={[{ zIndex: 4 }]}>
                                <Entypo name="select-arrows" size={24} color="black" />
                            </View>
                            <View className="absolute -top-8 flex-1 w-full h-16" style={[{ zIndex: 2 }]}>
                                <Waves/>
                            </View>
                            <View className="absolute -top-11 flex-1 w-full h-16" style={[{ zIndex: 1 }]}>
                                <WavesBright/>
                            </View>
                        </View>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    </View>

    <View className="mt-3 mx-auto">
        <AnimatedTextInput
            style={{fontFamily:'geometria-bold', color:'#000'}}
            className="text-2xl"
            defaultValue={'0'}
            editable={false}
            animatedProps={propsLabel}/>
    </View>
    </>
    )
  }

export default Glass;

const GlassModal = StyleSheet.create({
    arrowDrag: {
      position: 'relative',
      alignSelf: 'center',
      width: windowSize.width / 1.5,
    },
});
