import { StatusBar } from "expo-status-bar";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import TopBar from "../TopBar/TopBar";
import Button from "../Button/Button";

interface iMainLayout {
    children: React.ReactNode;
    title?: string;
    buttonBottomTitle?: string;
    buttonAction?: () => void;
}

const MainLayout = ({ children, title, buttonBottomTitle, buttonAction }:iMainLayout) => {
  // загружаем шрифт
  const [fontsLoader] = useFonts({'Geometria' : require('../../assets/fonts/geometria_extrabold.otf')});

  const onLayoutRootView = useCallback(async () => { 
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
      <SafeAreaView onLayout={onLayoutRootView} className="font-geometrica flex-1">

        <TopBar/>
        <ScrollView className="h-full relative px-6 flex-1 bg-white mt-[15px] rounded-t-2xl pt-[25px]">
            {title && <Text className=" text-[#101010] font-bold text-[22px] leading-[26px] pb-5">{title}</Text>}
            {children} 
        </ScrollView>
        <StatusBar style="auto"/>
        <Button buttonBottomTitle={buttonBottomTitle} buttonAction={buttonAction}/>

      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainLayout;
