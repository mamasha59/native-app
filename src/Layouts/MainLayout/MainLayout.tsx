import { Text, View, } from "react-native";

import TopBar from "./TopBar/TopBar";
import GradientBackground from "../../Layouts/GradientBackground/GradientBackground";
import Button from "../../components/Button/Button";

interface iMainLayout {
    children: React.ReactNode;
    title?: string;
    buttonBottomTitle?: string;
    buttonAction?: () => void;
}

const MainLayout = ({ children, title, buttonBottomTitle, buttonAction }:iMainLayout) => {
  
  return (
    <GradientBackground>
      <TopBar/>
      <View className="flex-1 bg-[#ffff] rounded-t-2xl pt-[25px] px-6">
        {title && <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px] pb-2">{title}</Text>}
        {children}
        {/* button нужен не на всех экранах */}
        <Button buttonBottomTitle={buttonBottomTitle} buttonAction={buttonAction}/>
      </View>
    </GradientBackground>
  );
};

export default MainLayout;
