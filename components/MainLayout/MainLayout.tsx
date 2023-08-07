import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopBar from "./TopBar/TopBar";
import Button from "../Button/Button";
import GradientBackground from "../GradientBackground/GradientBackground";

interface iMainLayout {
    children: React.ReactNode;
    title?: string;
    buttonBottomTitle?: string;
    buttonAction?: () => void;
}

const Stack = createNativeStackNavigator();

const MainLayout = ({ children, title, buttonBottomTitle, buttonAction }:iMainLayout) => {

  return (
    <GradientBackground>
      <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1">
        <TopBar/>
        <View className="flex-1 px-6 bg-white mt-[15px] rounded-t-2xl pt-[25px]">
          {title && <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px] pb-5">{title}</Text>}
          {children}
          <StatusBar style="auto"/>
          {/* button нужен не на всех экранах */}
          <Button buttonBottomTitle={buttonBottomTitle} buttonAction={buttonAction}/>
        </View>

      </SafeAreaView>
      </SafeAreaProvider>
    </GradientBackground>
  );
};

export default MainLayout;
