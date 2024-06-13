import { Dimensions, StyleSheet, View, TextInput, Text, Vibration } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {useAnimatedProps, useAnimatedStyle, useSharedValue, runOnJS } from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from "react";

import Waves from "../../../../assets/images/iconsComponent/Waves";
import WavesBright from "../../../../assets/images/iconsComponent/WavesBright";
import { useAppSelector } from "../../../../store/hooks";

const windowSize = Dimensions.get('window');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface iGlass {
    onValueChange: (value: any) => void,
    customValue: number,
}

const Glass = ({onValueChange, customValue}:iGlass) => {
  const setting = useAppSelector(state => state.appStateSlice);
  const [ml, setMl] = useState<number>(400);

  const offset = useSharedValue({y: 0});
  const start = useSharedValue({y: 0});
  const translateY = useSharedValue(0);
  const value = useSharedValue(0); // Shared value to hold the current value

  const ifCountUrine = setting.urineMeasure && setting.ifCountUrinePopupLiquidState; // если выбрано измерение мочи
  const maxScrollHeight = windowSize.height / 2.20;
  
  const propsLabel = useAnimatedProps(() => ({
    text: `${Math.round(value.value)}` ,
    defaultValue: `${Math.round(value.value)}`,
  }))

  const animatedStyleScrollUpDown = useAnimatedStyle(() => { // scrool animation
    return {
      transform: [
        { translateY: offset.value.y },
      ],
    }
  });

  useEffect(() => {
    if(setting.urineMeasure && setting.ifCountUrinePopupLiquidState) {
        setMl(1000);
    }
  },[setting])

  useEffect(() => {
    const initialTranslateY = (1 - (customValue / ml)) * maxScrollHeight;

    translateY.value = Math.round(initialTranslateY);
    offset.value = { y: initialTranslateY };
    start.value = { y: initialTranslateY };
    if(ifCountUrine){
        value.value = 100;
    }
    value.value = customValue;
  }, [customValue]);

  const triggerVibration = () => {
    Vibration.vibrate(400, false);
  }

  const cancelVibration = () => {
    Vibration.cancel();;
  }

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
        runOnJS(triggerVibration)();
        translateY.value = Math.max(Math.min(e.translationY + start.value.y, maxScrollHeight), 0); // adges of scroll
        offset.value = { y: translateY.value };
        value.value = Math.round(Math.max(Math.min((maxScrollHeight - (e.translationY + start.value.y)) / (maxScrollHeight) * ml, ml), 0)); // max 1000
    })
    .onEnd((e) => {
      start.value = { y: offset.value.y };
      runOnJS(onValueChange)(`${Math.round(value.value)}`);
      runOnJS(cancelVibration)();
    })
    .minDistance(2);

    const bgColor = () => {
       return ifCountUrine ? 'bg-[#fdcb6e]' : 'bg-[#3bacf7]';
    }

    const onChangeText = (newText: string) => {
        
      };

    return (
    <>
        <View className="bg-[#dde2e3] rounded-b-[100px] rounded-t-3xl justify-end overflow-hidden flex-shrink pt-3" style={{height: windowSize.height / 2, width: windowSize.width / 1.5}}>
            <GestureHandlerRootView>
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[GlassModal.arrowDrag, animatedStyleScrollUpDown]}>
                            <View className={`w-full h-full relative items-center ${bgColor()}`}>
                                <View className="items-center absolute bg-[#3498db] p-1 -top-4 w-10 h-10 rounded-full" style={[{ zIndex: 4 }]}>
                                    <Entypo name="select-arrows" size={28} color="#fff" />
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

        <View className="mt-3 mx-auto flex-row items-center overflow-hidden">
            <AnimatedTextInput
                style={{fontFamily:'geometria-bold', color:'#000'}}
                className="text-2xl underline w-[60px] text-center"
                defaultValue={'0'}
                editable
                inputMode={"numeric"}
                value={''+value.value}
                onChangeText={onChangeText}
                animatedProps={propsLabel}/>
            <Text className="text-2xl mx-1" style={{fontFamily:'geometria-bold', color:'#000'}}>мл</Text>
            <FontAwesome5 name="pencil-alt" size={15} color="#0000007f" />
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
