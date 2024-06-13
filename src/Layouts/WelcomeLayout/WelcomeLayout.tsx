import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import GradientBackground from "../GradientBackground/GradientBackground";
import LogoTop from "./LogoTop/LogoTop";

interface iWelcomeLayout {
    children: React.ReactNode;
    title?: string;
    handleProceed: () => void;
    buttonTitle: string;
    currentScreen?: number;
    skip?: boolean;
    skipNextScreen?: () => void;
    showButton?: boolean;
    titleCenter?: boolean;
    showRobotIconOnTop?: boolean;
}

const WelcomeLayout = ({children,title,handleProceed,buttonTitle, currentScreen, skip, skipNextScreen, showButton, titleCenter, showRobotIconOnTop = true}:iWelcomeLayout) => {

    const dots = Array(4).fill(null); // создаем массив из 4 элементов

  return (
    <GradientBackground> 
        <LogoTop/>
        <View className="bg-[#FFFFFF] flex-1 rounded-t-2xl px-[20px] h-full justify-between items-center">
           {showRobotIconOnTop &&
            <View className="-mt-6">
                <Image style={{width:122, height:180}} source={require('../../assets/images/homePageIcons/aiNelatonRobor_resized.jpeg')}/>
            </View>}
            <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false} style={{zIndex:2}}>
                <View className="w-full relative">
                    {title && 
                        <Text style={{fontFamily:'geometria-bold'}} className={`text-[#000] ${titleCenter ? 'text-center': 'text-start'}  text-lg leading-5`}>
                            {title}
                        </Text>}
                    {children}
                </View>
            </ScrollView>
            <View className="w-full items-center mb-5" style={{backfaceVisibility:'hidden'}}>
                <View className="w-full h-4 p-4 items-center justify-center flex-row">
                    {currentScreen !== 0  && 
                    dots.map((_, index) => (
                        <View key={index} className={`w-2 h-2 rounded-full mr-2 ${currentScreen === index + 1 ? 'bg-main-blue' : 'bg-grey'}`}></View>
                    ))}
                </View>
                <TouchableOpacity onPress={handleProceed} className={`max-w-[300px] w-full py-[19px] bg-main-blue rounded-[89px] items-center ${showButton && 'hidden'}`}>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">{buttonTitle}</Text>
                </TouchableOpacity>
                {skip && 
                <View className="w-full items-center justify-center mt-10">
                        <TouchableOpacity onPress={skipNextScreen}>
                            <Text style={{fontFamily:'geometria-regular'}} className="text-xs leading-[14px] text-main-blue opacity-50">Изменить позже</Text>
                        </TouchableOpacity>
                </View>}
            </View>
        </View>
    </GradientBackground>
  );
};

export default WelcomeLayout;