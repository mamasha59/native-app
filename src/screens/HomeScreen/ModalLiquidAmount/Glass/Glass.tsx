import { Dimensions, TextInput, Vibration, KeyboardAvoidingView, Platform, Keyboard, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {useAnimatedProps, useAnimatedStyle, useSharedValue, runOnJS, withTiming, withSpring, useDerivedValue, Easing } from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Canvas, Path, Group, Circle} from '@shopify/react-native-skia';

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { changeScalePopup } from "../../../../store/slices/appStateSlicer";
import AnimatedWaves from "../AnimatedWaves/AnimatedWaves";

const windowSize = Dimensions.get('window');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface iGlass {
    onValueChange:  React.Dispatch<React.SetStateAction<string>>,
    customValue: number,
}

const Glass = ({onValueChange, customValue}:iGlass) => {

  const setting = useAppSelector(state => state.appStateSlice);
  const dispatch = useAppDispatch();

  const [ml, setMl] = useState<number>(400); // the hight point of scroll -- it will change for 500 if count urine turned "true" after press button on timer

  const scrollRangeButton = useSharedValue({y: 150}); // scroll of rangeButton, and initial point
  const start = useSharedValue({y: 150});
  const value = useSharedValue(150); // Shared value to hold the current value

  const startOfInnerGlass = useSharedValue({ y: 150 }); // start of inner glass to scroll its up and down
  
  const scale = useSharedValue(1); // scale of Glass itself if input on focus
  const scaleRangePointer = useSharedValue(1);// scale of rangeButton

  const ifCountUrine = setting.urineMeasure && setting.ifCountUrinePopupLiquidState; // если выбрано измерение мочи
  const maxScrollHeight = windowSize.height / 2; // bottom point of max scroll down
  
  const propsLabel = useAnimatedProps(() => ({ // animated input value
    text: `${Math.round(value.value)}` ,
    defaultValue: `${Math.round(value.value)}`,
  }))

  const animatedStyleScrollUpDown = useAnimatedStyle(() => { // scroll animation
    return {
      transform: [
        { translateY: scrollRangeButton.value.y },
      ],
    }
  });

  const animatedStyleScale = useAnimatedStyle(() => { // animation of scale Glass itself
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 100 })}],
    };
  });

  const animatedStyleScaleRangePointer = useAnimatedStyle(() => { // animation of rangeButton
    return {
      transform: [{ scale: withTiming(scaleRangePointer.value, { duration: 100 })}],
    };
  });

  const handleFocus = () => { // focus input
    scrollRangeButton.value = {y: ml / 2};
    startOfInnerGlass.value = {y: ml / 2};
    scale.value = .6;
    dispatch(changeScalePopup(true));
  };

  const handleBlur = () => { // blur input
    Keyboard.dismiss();
    scale.value = 1;
    dispatch(changeScalePopup(false));
  };

  useEffect(() => { // to set max point on gest if count urine state change
    if(ifCountUrine) {
      setMl(500);
    }
  },[setting]);

  useEffect(() => { //TODO 
    value.value = customValue;
    console.log(scrollRangeButton.value);
    
    // if (customValue === 100) {
    //   scrollRangeButton.value = {y: 333};
    //   startOfInnerGlass.value = {y: 333};
    //   start.value = {y: 333}
    // } else if (customValue === 200) {
    //   scrollRangeButton.value = {y: 233};
    //   startOfInnerGlass.value = {y: 233};
    //   start.value = {y: 233}
    // } else {
    //   scrollRangeButton.value = {y: 100};
    //   startOfInnerGlass.value = {y: 100};
    //   start.value = {y: 100}
    // }
  }, [customValue]);

  useEffect(() => { // blur input if keyboard is closed
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      handleBlur();
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);

  const triggerVibration = () => {
    Vibration.vibrate(100, false);
  }
  const cancelVibration = () => {
    Vibration.cancel();
  }

  const gesture = Gesture.Pan()
    .onStart(() => {
      scaleRangePointer.value = withSpring(1.4);
      runOnJS(handleBlur)();
    })
    .onUpdate((e) => {
        runOnJS(handleBlur)();
        const combinedValue = Math.max(Math.min(e.translationY + start.value.y, maxScrollHeight), 0);
        scrollRangeButton.value = { y: combinedValue };
      console.log(combinedValue);
      
        value.value = Math.round(Math.max(Math.min((maxScrollHeight - combinedValue) / maxScrollHeight * ml, ml) / 10, 0)) * 10;
        
        startOfInnerGlass.value = {y: combinedValue}; // change height of inner colored background

        const cancelThreshold = ifCountUrine ? [0, 500] : [0, 400]; // to stop vibration when reach points
      
        if (cancelThreshold.includes(value.value)) {
          runOnJS(cancelVibration)();
        } else {
          runOnJS(triggerVibration)();
        }
    })
    .onEnd((e) => {
      scaleRangePointer.value = 1;
      start.value = { y: scrollRangeButton.value.y }; // что бы продолжить с последнего места
      runOnJS(onValueChange)(`${Math.round(value.value)}`);
      runOnJS(cancelVibration)();
    })
    .minDistance(3);

    const bgColor = () => {
       return ifCountUrine ? '#fdcb6e' : '#3bacf7';
    }

    const onChangeInputText = (text: string) => {
      const valueInput = text.replace(/\D/g, ''); // "123456"

      startOfInnerGlass.value = {y: +text};
      if(setting.ifCountUrinePopupLiquidState){
        if (+valueInput > 1000){
          scrollRangeButton.value = { y: Math.max(Math.min(+valueInput + start.value.y, maxScrollHeight), 0)};
          value.value = 1000;
        } else{
          onValueChange(valueInput);
          value.value = +valueInput;
        }
      }
      else {
        if (+valueInput > 400){
          value.value = 400;
         } else {
            onValueChange(valueInput);
            value.value = +valueInput;
         } 
      }
    };

    const animatedClip = useDerivedValue(() => {
      return  `M 0 554 
      L 1 ${startOfInnerGlass.value.y} 
      C 100 ${startOfInnerGlass.value.y + 50}, 200 ${startOfInnerGlass.value.y - 50}, 300 ${startOfInnerGlass.value.y} 
      S 400 ${startOfInnerGlass.value.y + 50}, 441 ${startOfInnerGlass.value.y}
      L 440 554 Z`
    }, [startOfInnerGlass.value.y]);

  return (
    <View className="flex-1 w-full">
      <Animated.View className="flex-1" style={[animatedStyleScale]}>
        <GestureHandlerRootView>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <Canvas style={{ flex: 1}}>
              <Path
                path="M 35 90 L 26 12 C 26 11 26 10 28 10 C 43 10 59 10 72 10 C 74 10 74 11 74 12 L 65 90 Z"
                style="stroke"
                color={'#0bc6ec'}
                strokeWidth={1.5}
                transform={[{ scale: 5.7 }, { translateX: -18 }, { translateY: -8.8 }]}
              />
              <Group clip={animatedClip}>
                <Path strokeCap={'butt'}
                  path="M 35 90 L 26 12 C 26 11 26 10 28 10 C 43 10 59 10 72 10 C 74 10 74 11 74 12 L 65 90 Z"
                  style="fill"
                  color={bgColor()}
                  transform={[{ scale: 5.6 }, { translateX: -17.42 }, { translateY: -8.1 }]}
                />
              </Group>
            </Canvas>
        
            <GestureDetector gesture={gesture}>
              <Animated.View className='flex-1 absolute items-center top-0 left-0 right-0 h-[60px]' style={[animatedStyleScrollUpDown]}>
                {/* <AnimatedWaves/> */}
                <Animated.View className="items-center absolute bg-[#3498db] p-2 -top-4 rounded-full" style={[{ zIndex: 4 }, animatedStyleScaleRangePointer]}>
                  <Entypo name="select-arrows" size={28} color="#fff" />
                </Animated.View>
              </Animated.View>
            </GestureDetector>
            
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
     </Animated.View>
      <View className="mx-auto flex-row mt-2 items-center rounded-md bg-[#fff]">
        <AnimatedTextInput
            style={{fontFamily:'geometria-bold', color:'#000'}}
            className="text-3xl underline w-[95px] text-center"
            editable
            maxLength={setting.ifCountUrinePopupLiquidState ? 4 : 3}
            inputMode={"numeric"}
            onChangeText={(text) => onChangeInputText(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            selectTextOnFocus
            selectionColor={'#4BAAC5'}
            textAlign={'center'}
            animatedProps={propsLabel}/>
        <Text className="text-xl mx-1" style={{fontFamily:'geometria-bold', color:'#000'}}>мл</Text>
        <FontAwesome5 name="pencil-alt" size={15} color="#0000007f" />
      </View>
    </View>
  );
};

export default Glass;