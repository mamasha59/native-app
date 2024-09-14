import { Dimensions, TextInput, Vibration, KeyboardAvoidingView, Platform, Keyboard, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { Svg, G, Path, ClipPath, Defs, Rect } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { changeScalePopup } from "../../../../store/slices/appStateSlicer";

const windowSize = Dimensions.get('window');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedInnerBackgroundPath = Animated.createAnimatedComponent(Path);

interface iGlass {
    onValueChange:  React.Dispatch<React.SetStateAction<string>>,
    customValue: number,
}

const Glass = ({onValueChange, customValue}:iGlass) => {
  const dispatch = useAppDispatch();

  const { units, urineMeasure, ifCountUrinePopupLiquidState } = useAppSelector(state => state.appStateSlice); 
  const isFlOz = units.title === "fl oz";

  const [maxWaterVolumeOfGlass, setMaxWaterVolumeOfGlass] = useState<number>(400); // the hight point of scroll -- it will change for 500 if count urine turned "true" after press button on timer

  const scrollRangeButton = useSharedValue({y: 150}); // scroll of rangeButton, and initial point
  const startValue = useSharedValue({y: 150});
  const value = useSharedValue(150); // Shared value to hold the current value
  const startOfInnerGlass = useSharedValue({ y: 150 }); // start of inner glass to scroll its up and down
  const glassScale = useSharedValue(1); // scale of Glass itself if input on focus
  const pointerScale = useSharedValue(1);// scale of rangeButton

  const backgroundColorDrankWater = '#3bacf7';
  const backgroundUrineMeasure = '#fdcb6e';
  const maxScrollHeight = windowSize.height / 1.9; // bottom point of max scroll down
  const bgColor = () => (ifCountUrine ? backgroundUrineMeasure : backgroundColorDrankWater);

  const ifCountUrine = urineMeasure && ifCountUrinePopupLiquidState; // если выбрано измерение мочи
  const flOzMaxValueOfInputUrine = 30; // max value of urine in input if FL OZ
  const modalUrineMaxPointOfScroll = 500; // max point of scroll if ML
  const modalUrineMaxPointOfInput = isFlOz ? flOzMaxValueOfInputUrine : 1000;
  
  const propsLabel = useAnimatedProps(() => ({ // animated input value
    text: `${Math.round(value.value)}` ,
    defaultValue: `${Math.round(value.value)}`,
  }));

  const animatedPath = useAnimatedProps(() => ({ // animated path of water inside the glass
    d: `M 0 554 
    L 1 ${startOfInnerGlass.value.y} 
    C 146 ${startOfInnerGlass.value.y + 50}, 162 ${startOfInnerGlass.value.y - 50}, 270 ${startOfInnerGlass.value.y} 
    S 334 ${startOfInnerGlass.value.y + 50}, 440 ${startOfInnerGlass.value.y}
    L 440 554 Z`,
  }));

  const animatedStyleScrollUpDown = useAnimatedStyle(() => { // scroll animation
    return {
      transform: [
        { translateY: scrollRangeButton.value.y },
      ],
    }
  });

  const animatedStyleScale = useAnimatedStyle(() => { // animation of scale Glass itself
    return {
      transform: [{ scale: withTiming(glassScale.value, { duration: 100 })}],
    };
  });

  const animatedStyleScaleRangePointer = useAnimatedStyle(() => { // animation of rangeButton
    return {
      transform: [{ scale: withTiming(pointerScale.value, { duration: 100 })}],
    };
  });

  const handleFocus = () => { // focus input
    scrollRangeButton.value = {y: maxWaterVolumeOfGlass / 2};
    startOfInnerGlass.value = {y: maxWaterVolumeOfGlass / 2};
    glassScale.value = .6;
    dispatch(changeScalePopup(true));
  };

  const handleBlur = () => { // blur input
    Keyboard.dismiss();
    glassScale.value = 1;
    dispatch(changeScalePopup(false));
  };

  useEffect(() => { // to set max point on gest if count urine state change
    if(ifCountUrine) {
      setMaxWaterVolumeOfGlass(modalUrineMaxPointOfScroll);
    }
  },[ifCountUrine, isFlOz]);

  useEffect(() => { //TODO 
    value.value = customValue;
  }, [customValue]);

  useEffect(() => { // blur input if keyboard is closed
    const hideSubscription = Keyboard.addListener('keyboardDidHide', handleBlur);
    return () => hideSubscription.remove();
  }, []);

  const triggerVibration = () => Vibration.vibrate(7, false);
  const cancelVibration = () => Vibration.cancel();

  const changeUnits = isFlOz ? 1 : 10; // value.value division 
  const changeMaxAmount = isFlOz ? 34 : 10; // value.value division - urine 15 - water 12

  const cancelThreshold = ifCountUrine ? [100, modalUrineMaxPointOfScroll] : [100, maxWaterVolumeOfGlass]; // to stop vibration when reach points
  const cancelThresholdFlOz = ifCountUrine ? [1, 15] : [1, 12]; // to stop vibration when reach points if unit is - FL OZ
  
  const gesture = Gesture.Pan()
    .onStart(() => {
      pointerScale.value = withSpring(1.2);
      runOnJS(handleBlur)();
    })
    .onUpdate((e) => {
      runOnJS(handleBlur)();
      const combinedValue = Math.max(Math.min(e.translationY + startValue.value.y, maxScrollHeight), 0);
      scrollRangeButton.value = { y: combinedValue };
    
      value.value = Math.round(
        Math.max(Math.min((maxScrollHeight - combinedValue) / maxScrollHeight * maxWaterVolumeOfGlass, maxWaterVolumeOfGlass) / changeMaxAmount, changeUnits)
      ) * changeUnits;
      
      startOfInnerGlass.value = {y: combinedValue}; // change height of inner colored background

      if ((isFlOz ? cancelThresholdFlOz : cancelThreshold).includes(value.value) && value.value !== startValue.value.y) {
        runOnJS(cancelVibration)();
      } else {
        runOnJS(triggerVibration)();
      }
    })
    .onEnd((e) => {
      pointerScale.value = 1;
      startValue.value = { y: scrollRangeButton.value.y }; // to start when was scroll
      runOnJS(onValueChange)(`${Math.round(value.value)}`);
      runOnJS(cancelVibration)();
    })
    .minDistance(1);

    const convertInputToScrollValueAndSetScroll = (inputValue:number) => {
      const inputMax = ifCountUrine? (isFlOz ? flOzMaxValueOfInputUrine : 1000) : (isFlOz ? 12 : 400);
      //fl oz - 15 12
      const scrollMin = ifCountUrine ? (isFlOz ? flOzMaxValueOfInputUrine : 500) : (isFlOz ? 12 : 400);
      // Линейное преобразование inputValue в диапазон scroll
      const scrollValue = scrollMin + ((inputValue - 0) * (0 - scrollMin)) / (inputMax - 0);

      scrollRangeButton.value = {y: scrollValue};
      startOfInnerGlass.value = {y: scrollValue};
      startValue.value = {y: scrollValue};
    };

    const onChangeInputText = (text: string) => {
      let valueInput = text.replace(/\D/g, ''); // "123456"      
      if(valueInput[0] === '0'){
        value.value = 1;
      } else {
        const parsedValue = +valueInput;
        if(ifCountUrine){
          if (parsedValue > modalUrineMaxPointOfInput){
            scrollRangeButton.value = { y: Math.max(Math.min(parsedValue + startValue.value.y, maxScrollHeight), 0)}; // set max scroll if input value is bigger
            
            value.value = modalUrineMaxPointOfInput;
            convertInputToScrollValueAndSetScroll(modalUrineMaxPointOfInput);
          } else {
            onValueChange(parsedValue +''); // set value to useState hook, next to save value in store
            value.value = parsedValue; // ui
            convertInputToScrollValueAndSetScroll(+parsedValue); // set correct scroll
          }
        }
        else {
          const maxVolume = isFlOz ? 12 : maxWaterVolumeOfGlass;
          if (parsedValue > maxVolume){
            value.value = maxVolume;
            convertInputToScrollValueAndSetScroll(maxVolume);
          } else {
            onValueChange(valueInput); // set value to useState hook, next to save value in store
            value.value = parsedValue; // ui
            convertInputToScrollValueAndSetScroll(parsedValue); // set correct scroll
          } 
        }
      }
    };

    const glassPath = 'M 35 90 L 26 12 C 26 11 26 10 28 10 C 43 10 59 10 72 10 C 74 10 74 11 74 12 L 65 90 Z';
    const glassPathSharp = 'M 30 90 L 26 10 C 26 10 26 10 28 10 C 43 10 59 10 72 10 C 74 10 74 10 74 10 L 71 90 Z';
    const changePath = () => (ifCountUrine ? glassPathSharp : glassPath);

    const maxLengthOfInput = () => (ifCountUrine && !isFlOz ? 4 : isFlOz ? 2 : 3);
    
  return (
    <View className="flex-1 w-full mx-auto justify-center">
      <Animated.View className="flex-1 justify-center" style={[animatedStyleScale]}>
        <GestureHandlerRootView>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <View className="w-full h-full overflow-hidden items-center">
             {ifCountUrine && 
              <Svg height="30" width='86%'>
                <Rect
                  width="100%"
                  height="100%"
                  fill="rgb(113, 96, 96)"
                />
              </Svg>}
                {/* move-right-left up-bottom scale scale */}
              <Svg height='100%' width='100%' viewBox={!ifCountUrine ? "19 14 63 63" : "18 17 65 65"}>
                <Defs>
                  <ClipPath id="clip">
                    <Path
                      d={changePath()}
                    />
                  </ClipPath>
                </Defs>

                <G clipPath="url(#clip)">
                  <Path // outer glass with border
                    d={changePath()}
                    fill={'#ecf0f1'}
                    stroke={backgroundColorDrankWater}
                    strokeWidth={2}
                    />
                  <AnimatedInnerBackgroundPath // inner colorful background to fill the glass
                    animatedProps={animatedPath}
                    scale={'0.17'}
                    fill={bgColor()}
                  />
                </G>
                
                <Path // Внешний контур стакана с границей
                  d={changePath()}
                  fill={'none'} // Заполнение не нужно, так как это граница
                  stroke={'#ecf0f1'} // Цвет границы
                  strokeWidth={2.1} // Толщина границы
                />
              </Svg>
            </View>
            
            <GestureDetector gesture={gesture}>
              <Animated.View className='flex-1 absolute items-center top-1 left-0 right-0 h-[60px]' style={[animatedStyleScrollUpDown]}>
                <Animated.View className="items-center absolute border border-opacity-25 bg-[#3498db] p-2 -top-4 rounded-full" style={[{ zIndex: 4 }, animatedStyleScaleRangePointer]}>
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
            maxLength={maxLengthOfInput()}
            inputMode={"numeric"}
            onChangeText={(text) => onChangeInputText(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            selectTextOnFocus
            selectionColor={'#4BAAC5'}
            textAlign={'center'}
            animatedProps={propsLabel}
            />
        <Text className="text-xl mx-1" style={{fontFamily:'geometria-bold', color:'#000'}}>
          {units.title}
        </Text>
        <FontAwesome5 name="pencil-alt" size={15} color="#0000007f" />
      </View>
    </View>
  );
};

export default Glass;