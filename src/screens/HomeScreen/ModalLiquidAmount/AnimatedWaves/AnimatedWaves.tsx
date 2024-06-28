import { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Waves from '../../../../assets/images/iconsComponent/Waves';
import WavesBright from '../../../../assets/images/iconsComponent/WavesBright';

// Получаем ширину экрана
const { width } = Dimensions.get('window');

const AnimatedWaves = () => {
  const translateX = useSharedValue(4);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

    // Запуск бесконечной анимации
    useEffect(() => {
      translateX.value = withRepeat(
        withTiming(width / 7, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1, // Бесконечная анимация
        true, // Обратное направление
      );
    }, []);

  return (
    <View>
        <Animated.View className="absolute -top-8 flex-1 w-full h-16" style={[{ zIndex: 2 }, animatedStyle]}>
            <Waves/>
        </Animated.View>
        <Animated.View className="absolute -top-11 flex-1 w-full h-16" style={[{ zIndex: 1 }, animatedStyle]}>
            <WavesBright/>
        </Animated.View>
    </View>
  );
};

export default AnimatedWaves;