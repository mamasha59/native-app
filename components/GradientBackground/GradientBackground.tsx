import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";

interface iGradientBackground {
    children: React.ReactNode;
}

SplashScreen.preventAutoHideAsync();

const GradientBackground = ({children}:iGradientBackground) => {
      // загружаем шрифт
  const [fontsLoader] = useFonts({
    'geometria-bold' : require('../../assets/fonts/geometria-bold.ttf'),
    'geometria-regullar' : require('../../assets/fonts/geometria-regular.ttf')
    });

  const onLayoutRootView = useCallback(async () => { // работа загрузочного экрана
    if (fontsLoader) {
      await SplashScreen.hideAsync();
      }
    }, [fontsLoader]);

    if (!fontsLoader) return null;

  return (
    <LinearGradient
        onLayout={onLayoutRootView}
        colors={['#4BAAC5', '#7076B0']}
        start={[0.001, 0.495]}
        end={[1, 0.505]}
        style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
