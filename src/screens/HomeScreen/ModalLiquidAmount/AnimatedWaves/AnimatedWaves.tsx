import { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, useDerivedValue } from 'react-native-reanimated';
import Waves from '../../../../assets/images/iconsComponent/Waves';
import WavesBright from '../../../../assets/images/iconsComponent/WavesBright';

// Получаем ширину экрана
const { width } = Dimensions.get('window');

const AnimatedWaves = () => {
  const translateX = useSharedValue(4); // first wave
  const translateXSecondWave = useSharedValue(1); // second wave

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedStyleSecondWave = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -translateX.value }],
    };
  });

  // Запуск бесконечной анимации
  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width / 4, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1, // Бесконечная анимация
      true, // Обратное направление
    );
  },[]);

  useEffect(() => {
    translateXSecondWave.value = withRepeat(
      withTiming(width / 4, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1, // Бесконечная анимация
      true, // Обратное направление
    );
  },[]);

  return (
    <View className='flex-1 mt-[30px]' style={{zIndex:-21}}>
        <Animated.View className="absolute left-0 -top-12 flex-1 w-full h-16" style={[{ zIndex: 2 }]}>
            <Waves/>
        </Animated.View>
        <Animated.View className="absolute left-0 -top-[69px] flex-1 w-full h-16" style={[{ zIndex: 1 }, animatedStyle]}>
            <WavesBright/>
        </Animated.View>
        <Animated.View className="absolute left-0 -top-[70px] flex-1 w-full h-16" style={[{ zIndex: 1}, animatedStyleSecondWave]}>
            <WavesBright/>
        </Animated.View>
    </View>
  );
};

export default AnimatedWaves;