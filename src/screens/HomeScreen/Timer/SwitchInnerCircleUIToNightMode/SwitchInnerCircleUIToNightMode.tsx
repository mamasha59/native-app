import { StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, { Easing, SharedValue, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import { useAppSelector } from "../../../../store/hooks";

const SwitchInnerCircleUIToNightMode = ({sharedValue}:{sharedValue:SharedValue<number>}) => {
    const settings = useAppSelector((state) => state.appStateSlice);

    const translateArrowY = useSharedValue(0); // translate Arrow animation
    
    useEffect(() => {
      if(settings.cannulationAtNight.value){
          translateArrowY.value = 0;
          translateArrowY.value = withRepeat(
              withTiming(3, {
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              }),
              -1, // -1 для бесконечной анимации
              true // true для чередования направления анимации
          );
      }
    }, [settings.cannulationAtNight.value]);

    useEffect(() => {
        if(!settings.cannulationAtNight.value){
            sharedValue.value = withTiming(0, { duration: 800 });
        } else {
            sharedValue.value = withTiming(180, { duration: 800 });
        }
    },[settings.cannulationAtNight.value]);

    const backAnimatedStyle = useAnimatedStyle(() => {
        return {
          transform: [
            { rotateY: `${interpolate(sharedValue.value, [0, 180], [180, 360])}deg` },
          ],
          opacity: interpolate(sharedValue.value, [0, 90, 180], [1, 0, 1]),
        };
    });

      const animatedStyleArrow = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: translateArrowY.value }],
        };
    });

  return (
    <Animated.View style={[styles.card, backAnimatedStyle]} className='absolute w-[240px] -mt-2 justify-center items-center flex-1 h-full'>
        <Text style={{fontFamily:'geometria-bold'}} className="text-base text-center">
          Увидимся утром!
        </Text>
        <Text style={{fontFamily:'geometria-bold'}} className="text-sm leading-4 text-center">
          После пробуждения не забудьте про катетеризацию и нажать кнопку ниже
        </Text>
        <Animated.Text style={[styles.arrow, animatedStyleArrow]} className="text-2xl">
          &darr;
        </Animated.Text>
    </Animated.View>
  );
};

export default SwitchInnerCircleUIToNightMode;

const styles = StyleSheet.create({
    card: {
      backfaceVisibility: 'hidden',
    },
    arrow: {
        fontFamily: 'geometria-bold',
        fontSize: 24,
    },
  });