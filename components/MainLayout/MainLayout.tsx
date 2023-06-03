import { StatusBar } from "expo-status-bar";
import { Text, ScrollView, Pressable, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import TopBar from "../TopBar/TopBar";
import { useRoute } from "@react-navigation/native";

interface iMainLayout {
    children: React.ReactNode;
    title?: string;
    buttonBottomTitle?: string;
    buttonAction?: () => void;
}

const MainLayout = ({ children, title, buttonBottomTitle, buttonAction }:iMainLayout) => {

  const route = useRoute(); // берем именя маршрутов
  const [show , setShow] = useState<boolean>(false);
  
  useEffect(()=>{ // показываем кнопку только на опр страницах
    if (route.name === 'Recomendations' || route.name === 'FeedbackScreen') {
      setShow(true);
    } else {
      setShow(false);
    }
  },[route.name])
  
  // загружаем шрифт
  const [fontsLoader] = useFonts({
    'Geometria' : require('../../assets/fonts/geometria_extrabold.otf'),
  });

  const onLayoutRootView = useCallback(async () => { 
    if (fontsLoader) {
      await SplashScreen.hideAsync();
      }
    }, [fontsLoader]);

    if (!fontsLoader) {
      return null;
    }

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
        <View className="absolute flex items-center left-0 right-0 bottom-5">
          {show ? 
            <Pressable onPress={() => buttonAction()} className="min-w-[300px] bg-[#4BAAC5] px-[53px] py-[18px] rounded-[89px]">
              <Text className="text-[#FFFFFF] font-bold text-center text-base leading-5">{buttonBottomTitle}</Text>
            </Pressable> : ''
          }
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainLayout;
