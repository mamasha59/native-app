import { TextInput, Vibration, Keyboard, Text, View, useWindowDimensions, KeyboardAvoidingView } from "react-native";
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

import { useAppSelector } from "../../../../store/hooks";
import UrineColor from "../UrineColor/UrineColor";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedInnerBackgroundPath = Animated.createAnimatedComponent(Path);

interface iGlass {
  onValueChange:  React.Dispatch<React.SetStateAction<string>>,
  customValue: number,
}

const Glass = ({onValueChange, customValue}:iGlass) => {
  const {height, width} = useWindowDimensions();

  const { units, urineMeasure, ifCountUrinePopupLiquidState, open } = useAppSelector(state => state.appStateSlice); 
  const { urineColor } = useAppSelector(state => state.journal); 

  const isFlOz = units.title === "fl oz";
  const [maxWaterVolumeOfGlass, setMaxWaterVolumeOfGlass] = useState<number>(400); // the hight point of scroll -- it will change for 500 if count urine turned "true" after press button on timer
  
  const scrollRangeButton = useSharedValue({y: 150}); // scroll of rangeButton, and initial point
  const prevScrollRangeButton = useSharedValue({y: 0});

  const startOfInnerGlass = useSharedValue({ y: 150 }); // start of inner glass to scroll its up and down
  const prevStartOfInnerGlass = useSharedValue({y: 0});
  
  const startValue = useSharedValue({y: 150});

  const inputValue = useSharedValue(150); // input value

  const glassScale = useSharedValue(1); // scale of Glass itself if input on focus
  const pointerScale = useSharedValue(1);// scale of rangeButton
  const translateYValue = useSharedValue(0);

  const ifCountUrine = urineMeasure && ifCountUrinePopupLiquidState; // если выбрано измерение мочи
  const backgroundColorDrankWater = '#3bacf7';
  const backgroundUrineMeasure = urineColor?.color;

  const maxScrollHeight = height / (ifCountUrine ? 2.4 : 1.8); // bottom point of max scroll down
  const sizeOfContainer = height / (ifCountUrine ? 2.2 : 1.6);

  const bgColor = () => ifCountUrine ? backgroundUrineMeasure : backgroundColorDrankWater;

  const flOzMaxValueOfInputUrine = 30; // max value of urine in input if FL OZ
  const modalUrineMaxPointOfScroll = 500; // max point of scroll if ML
  const modalUrineMaxPointOfInput = isFlOz ? flOzMaxValueOfInputUrine : 1000;
  const maxInputValueOFDrinkWater = 3000;
  
  const propsInputValue = useAnimatedProps(() => ({ // animated input value
    text: `${Math.round(inputValue.value)}` ,
    defaultValue: `${Math.round(inputValue.value)}`,
  }));

  const animatedPath = useAnimatedProps(() => ({ // animated path of water inside the glass
    d: `M 0 554 
    L 1 ${startOfInnerGlass.value.y} 
    C 146 ${startOfInnerGlass.value.y + 40}, 162 ${startOfInnerGlass.value.y - 40}, 270 ${startOfInnerGlass.value.y} 
    S 334 ${startOfInnerGlass.value.y + 40}, 440 ${startOfInnerGlass.value.y}
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
      transform: [
        { scale: withTiming(glassScale.value, { duration: 200, })},
        { translateY: withTiming(translateYValue.value, { duration: 200 })}
      ],
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
    translateYValue.value = -150;
    glassScale.value = withTiming(0.6, { duration: 10 });
  };

  const handleBlur = () => { // blur input
    Keyboard.dismiss();
    translateYValue.value = 0;
    glassScale.value = 1;
  };

  useEffect(() => { // to set max point on gest if count urine state change
    if(ifCountUrine) {
      setMaxWaterVolumeOfGlass(modalUrineMaxPointOfScroll);
    }
  },[ifCountUrine, isFlOz, open]);

  useEffect(() => { //TODO 
    // convertInputToScrollValueAndSetScroll(customValue);
    inputValue.value = customValue;
  }, [customValue]);

  useEffect(() => { // blur input if keyboard is closed
    const hideSubscription = Keyboard.addListener('keyboardDidHide', handleBlur);
    return () => hideSubscription.remove();
  }, []);

  const triggerVibration = (pattern:number) => Vibration.vibrate(pattern, false);
  const cancelVibration = () => Vibration.cancel();

  const changeUnits = isFlOz ? 10 : 1; // value.value division 

  const cancelThresholdML = ifCountUrine ? [50, modalUrineMaxPointOfScroll] : [20, maxWaterVolumeOfGlass]; // to stop vibration when reach points
  const cancelThresholdFlOz = ifCountUrine ? [1, 15] : [1, 12]; // to stop vibration when reach points if unit is - FL OZ
  
  const gesture = Gesture.Pan()
    .onStart(() => {
      pointerScale.value = withSpring(1.3);
      runOnJS(handleBlur)();
      prevScrollRangeButton.value = scrollRangeButton.value;
      prevStartOfInnerGlass.value = startOfInnerGlass.value;
    })
    .onUpdate((e) => {
      runOnJS(handleBlur)();

      function clamp(val:number, min:number, max:number) {
        return Math.min(Math.max(val, min), max);
      }

      const combinedValue = clamp(prevScrollRangeButton.value.y + e.translationY, 0, maxScrollHeight);
      
      scrollRangeButton.value = { y: combinedValue };
      startOfInnerGlass.value = { y: combinedValue }; // change height of inner colored background
 
      const resultEqualTen = Math.floor( (maxWaterVolumeOfGlass - combinedValue + 1 ) / 10 ) * 10;
      
      inputValue.value = Math.max(resultEqualTen, 20) / changeUnits;
      
      if ((isFlOz ? cancelThresholdFlOz : cancelThresholdML).includes(inputValue.value) && inputValue.value !== startValue.value.y) {
        runOnJS(cancelVibration)();
      } else {
        runOnJS(triggerVibration)(7);
      }
    })
    .onEnd((e) => {
      pointerScale.value = 1;
      startValue.value = { y: scrollRangeButton.value.y }; // to start when was scroll
      runOnJS(onValueChange)(`${Math.round(inputValue.value)}`);
      runOnJS(cancelVibration)();
    })
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
      triggerVibration(1);
      let valueInput = text.replace(/\D/g, ''); // "123456"      
      if(valueInput[0] === '0'){
        inputValue.value = 1;
      } else {
        const parsedInputValue = +valueInput;
        if(ifCountUrine){
          if (parsedInputValue > modalUrineMaxPointOfInput){
            scrollRangeButton.value = { y: Math.max(Math.min(parsedInputValue + startValue.value.y, maxScrollHeight), 0)}; // set max scroll if input value is bigger
            
            inputValue.value = modalUrineMaxPointOfInput;
            convertInputToScrollValueAndSetScroll(modalUrineMaxPointOfInput);
          } else {
            onValueChange(parsedInputValue +''); // set value to useState hook, next to save value in store
            inputValue.value = parsedInputValue; // ui
            convertInputToScrollValueAndSetScroll(+parsedInputValue); // set correct scroll
          }
        }
        else {
          if (parsedInputValue >= maxInputValueOFDrinkWater){
            inputValue.value = maxInputValueOFDrinkWater;
            convertInputToScrollValueAndSetScroll(maxWaterVolumeOfGlass);// 400       
          } else if(parsedInputValue > maxWaterVolumeOfGlass && parsedInputValue < maxInputValueOFDrinkWater){
            onValueChange(valueInput); // set value to useState hook, next to save value in store
            inputValue.value = parsedInputValue; // ui
            convertInputToScrollValueAndSetScroll(maxWaterVolumeOfGlass);// 400
          } else {
            onValueChange(valueInput); // set value to useState hook, next to save value in store
            inputValue.value = parsedInputValue; // ui
            convertInputToScrollValueAndSetScroll(+valueInput); // set correct scroll
          }
        }
      }
    };

    const glassPath = 'M 35 90 L 26 12 C 26 11 26 10 28 10 C 43 10 59 10 72 10 C 74 10 74 11 74 12 L 65 90 Z';
    const glassPathSharp = 'M 30 90 L 26 10 C 26 10 26 10 28 10 C 43 10 59 10 72 10 C 74 10 74 10 74 10 L 71 90 Z';
    const changePath = () => (ifCountUrine ? glassPathSharp : glassPath);

    const maxLengthOfInput = () => !isFlOz ? 4 : 2;
    
  return (
    <View className="flex-1 w-full items-center justify-center">
      <GestureHandlerRootView style={{flex:1}}>
        <Animated.View className="w-full items-center justify-center" style={[{height: sizeOfContainer, width: width}, animatedStyleScale]}>
          {ifCountUrine && 
            <Svg height="30" width='56%' translateY={15}>
              <Rect
                width="100%"
                height="100%"
                fill="rgb(113, 96, 96)"
              />
            </Svg>
          }
          {/* move-right-left up-bottom scale scale */}
          <Svg preserveAspectRatio="xMidYMid meet" height='100%' width='100%' viewBox={!ifCountUrine ? "16.6 14 67 64" : "8 5.3 80 89"}>
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
                translateX={'20'}
                translateY={'6.3'}
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
        </Animated.View>

        {ifCountUrine && <UrineColor/>}
        
        <GestureDetector gesture={gesture}>
          <Animated.View className='flex-1 absolute items-center justify-center left-0 right-0' style={[animatedStyleScrollUpDown]}>
            <Animated.View className="items-center border border-[#00000036] bg-[#3498db] p-2 rounded-full" style={[{ zIndex: 4 }, animatedStyleScaleRangePointer]}>
              <Entypo name="select-arrows" size={28} color="#fff" />
            </Animated.View>
          </Animated.View>
        </GestureDetector>            
      </GestureHandlerRootView>

      <KeyboardAvoidingView>
        <View className="justify-center mx-auto px-2 flex-row items-center rounded-md bg-white">
          <AnimatedTextInput
            style={{fontFamily:'geometria-bold'}}
            className="text-3xl underline text-center text-black"
            maxLength={maxLengthOfInput()}
            inputMode={"numeric"}
            onChangeText={(text) => onChangeInputText(text)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            selectTextOnFocus
            selectionColor={'#4BAAC5'}
            textAlign={'center'}
            animatedProps={propsInputValue}
          />
          <Text className="text-xl mx-1 text-black" style={{fontFamily:'geometria-bold'}}>
            {units.title}
          </Text>
          <FontAwesome5 name="pencil-alt" size={15} color="#0000007f" />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Glass;