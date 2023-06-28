import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import TopBar from "./TopBar/TopBar";
import Button from "../Button/Button";

interface iMainLayout {
    children: React.ReactNode;
    title?: string;
    buttonBottomTitle?: string;
    buttonAction?: () => void;
}

SplashScreen.preventAutoHideAsync();

const MainLayout = ({ children, title, buttonBottomTitle, buttonAction }:iMainLayout) => {
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
      colors={['#4BAAC5', '#7076B0']}
      start={[0.001, 0.495]}
      end={[1, 0.505]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1 h-full">
        <TopBar/>
        <View onLayout={onLayoutRootView} className="flex-1 px-6 bg-white mt-[15px] rounded-t-2xl pt-[25px]">
          {title && <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px] pb-5">{title}</Text>}
          {children}
          <StatusBar style="auto"/>
        {/* button нужен не на всех экранах */}
        <Button buttonBottomTitle={buttonBottomTitle} buttonAction={buttonAction}/>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainLayout;
