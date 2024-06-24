import { Dimensions, StyleSheet, View, TextInput, Text, Vibration, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {useAnimatedProps, useAnimatedStyle, useSharedValue, runOnJS, withTiming } from "react-native-reanimated";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from "react";

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

  const [ml, setMl] = useState<number>(400); // default  max ml

  const offset = useSharedValue({y: 0});
  const start = useSharedValue({y: 0});
  const value = useSharedValue(0); // Shared value to hold the current value
  
  const scale = useSharedValue(1);
  const scaleRangePointer = useSharedValue(1);

  const ifCountUrine = setting.urineMeasure && setting.ifCountUrinePopupLiquidState; // если выбрано измерение мочи
  const maxScrollHeight = windowSize.height / 2.20;
  
  const propsLabel = useAnimatedProps(() => ({ // animated input value
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

  const animatedStyleScale = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 100 })}],
    };
  });

  const animatedStyleScaleRangePointer = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scaleRangePointer.value, { duration: 100 })}],
    };
  });

  const handleFocus = () => { // focus input
    scale.value = .8;
    dispatch(changeScalePopup(true));
  };

  const handleBlur = () => { // blur input
    Keyboard.dismiss();
    scale.value = 1;
    dispatch(changeScalePopup(false));
  };

  useEffect(() => { // to set max point on gest
    if(ifCountUrine) {
        setMl(500);
    }
  },[setting]);

  useEffect(() => { //TODO 
    value.value = customValue;
    // offset.value = { y: 200 };
    // start.value = { y: 0}
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
      scaleRangePointer.value = 1.4;
      runOnJS(handleBlur)();
    })
    .onUpdate((e) => {
        runOnJS(handleBlur)();
        const combinedValue = Math.max(Math.min(e.translationY + start.value.y, maxScrollHeight), 0);

        offset.value = { y: combinedValue };
        value.value = Math.round(Math.max(Math.min((maxScrollHeight - combinedValue) / maxScrollHeight * ml, ml), 50));
        
        const cancelThreshold = ifCountUrine ? [100, 1000] : [100, 400];

        if (cancelThreshold.includes(value.value)) {
          runOnJS(cancelVibration)();
        } else {
          runOnJS(triggerVibration)();
        }
    })
    .onEnd((e) => {
      scaleRangePointer.value = 1;
      start.value = { y: offset.value.y }; // что бы продолжить с последнего места
      runOnJS(onValueChange)(`${Math.round(value.value)}`);
      runOnJS(cancelVibration)();
    })
    .minDistance(2);

    const bgColor = () => {
       return ifCountUrine ? 'bg-[#fdcb6e]' : 'bg-[#3bacf7]';
    }

    const onChangeInputText = (text: string) => {
      const valueInput = text.replace(/\D/g, ''); // "123456"

      if(setting.ifCountUrinePopupLiquidState){
        if (+valueInput > 1000){
          offset.value = { y: Math.max(Math.min(+valueInput + start.value.y, maxScrollHeight), 0)};
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

    return (
    <View className="justify-center items-center flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Animated.View
          className="bg-[#dde2e3] rounded-b-[100px] rounded-t-3xl justify-end overflow-hidden pt-3"
          style={[{height: windowSize.height / 2, width: windowSize.width / 1.5}, animatedStyleScale]}>
            <GestureHandlerRootView>
                <GestureDetector gesture={gesture}>
                    <Animated.View style={[GlassModal.arrowDrag, animatedStyleScrollUpDown]}>
                            <View className={`w-full h-full relative items-center ${bgColor()}`} style={{zIndex:3}}>
                                <Animated.View className="items-center absolute bg-[#3498db] p-1 -top-4 w-10 h-10 rounded-full" style={[{ zIndex: 4 }, animatedStyleScaleRangePointer]}>
                                    <Entypo name="select-arrows" size={28} color="#fff" />
                                </Animated.View>
                                <AnimatedWaves/>
                            </View>
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Animated.View>
      </KeyboardAvoidingView>
      <View className="mx-auto flex-row items-center rounded-md bg-[#fff]">
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
