import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

import GradientBackground from "../GradientBackground/GradientBackground";
import LogoTop from "./LogoTop/LogoTop";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { activateRobotSpeech } from "../../store/slices/appStateSlicer";

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
    showGradiend?: boolean,
}

const WelcomeLayout = ({children,title,handleProceed,buttonTitle, currentScreen, skip, skipNextScreen, showButton, titleCenter, showRobotIconOnTop = true, showGradiend}:iWelcomeLayout) => {

    const {robotText, loader} = useAppSelector(state => state.appStateSlice);
    const dispatch = useAppDispatch();
    const [displayedText, setDisplayedText] = useState('');

    const dots = Array(4).fill(null); // создаем массив из 4 элементов

    useEffect(() => {
        let index = 0;
        if(robotText) {
            const intervalId = setInterval(() => {
                setDisplayedText((prev) => prev + robotText[index]);
                index++;
            
                if (index === robotText.length) {
                    clearInterval(intervalId);
                    setTimeout(() => {
                        setDisplayedText('');
                        dispatch(activateRobotSpeech(''));
                    },1000)
                }
                }, 100);
            return () => clearInterval(intervalId);
        }
    }, [robotText]);

  return (
    <GradientBackground> 
        <LogoTop/>
        <View className="bg-[#FFFFFF] flex-1 rounded-t-2xl h-full justify-between items-center">
           {showRobotIconOnTop &&
            <View className="-mt-6 w-[350px] h-[150px] justify-center">
                <LottieView
                    source={require("../../assets/robot-face.json")}
                    style={{width: '100%', height: 250}}
                    autoPlay
                />
                {displayedText.length > 0 && 
                <View className="absolute right-0 top-1/4 px-2 mr-6 max-w-[110px] bg-[#0000002e] rounded-sm">
                    <Text className="text-[#fff] text-base" style={{fontFamily:'geometria-bold'}}>{displayedText}</Text>
                </View>}
            </View>}
            <ScrollView className="flex-1 w-full" showsVerticalScrollIndicator={false} style={{zIndex:2}}>
                <LinearGradient
                    colors={showGradiend ? ['#FFFFFF', '#FFFFFF', '#D3D3D3', '#D3D3D3'] : ['#FFFFFF', '#FFFFFF','#FFFFFF','#FFFFFF']}
                    start={[0, 0]}
                    end={[0, 1]}
                    locations={[0, 0.4, 0.5, 1]}
                    style={{ flex: 1 }}
                    >
                    
                    <View className="w-full relative">
                        {title && 
                            <Text style={{fontFamily:'geometria-bold'}} className={`text-[#000] ${titleCenter ? 'text-center': 'text-start'}  text-lg leading-5 px-[20px]`}>
                                {title}
                            </Text>}
                        <View className="px-[20px]">
                            {children}
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
            <View className={`w-full items-center pb-5 ${showGradiend && 'bg-[#D3D3D3]'}`} style={{backfaceVisibility:'hidden'}}>
                <View className="w-full h-4 p-4 items-center justify-center flex-row">
                    {currentScreen !== 0  && 
                    dots.map((_, index) => (
                        <View key={index} className={`w-2 h-2 rounded-full mr-2 ${currentScreen === index + 1 ? 'bg-main-blue' : 'bg-grey'}`}></View>
                    ))}
                </View>
                <Pressable disabled={loader} onPress={handleProceed} className={`max-w-[300px] w-full py-[19px] bg-main-blue rounded-[89px] items-center ${showButton && 'hidden'}`}>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">{buttonTitle}</Text>
                </Pressable>
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