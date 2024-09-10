import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

import GradientBackground from "../GradientBackground/GradientBackground";
import LogoTop from "./LogoTop/LogoTop";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { activateRobotSpeech } from "../../store/slices/appStateSlicer";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { BlurView } from "expo-blur";

interface iWelcomeLayout {
    children: React.ReactNode;
    title?: string;
    handleProceed: () => void;
    buttonTitle: string;
    currentScreen?: number;
    titleCenter?: boolean;
    showRobotIconOnTop?: boolean;
    showGradient?: boolean,
    paywall?:boolean,
}

const WelcomeLayout = ({children,title,handleProceed,buttonTitle, currentScreen, titleCenter, showRobotIconOnTop = true, showGradient, paywall = false}:iWelcomeLayout) => {

    const {robotText} = useAppSelector(state => state.appStateSlice);
    const dispatch = useAppDispatch();

    const [displayedText, setDisplayedText] = useState<string>('');

    const blinkValue = useSharedValue(1);
    const scrollY = useSharedValue(0);

    const dots = Array(5).fill(null); // создаем массив из 4 элементов

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: blinkValue.value,
      }));

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const animatedStyleScroll = useAnimatedStyle(() => {
        const scale = interpolate(scrollY.value, [0, 250], [1, 0.8], 'clamp'); // Меняем scale от 1 до 0.5 при прокрутке
        const height = interpolate(scrollY.value, [0, 250], [150, 100], 'clamp');
        const width = interpolate(scrollY.value, [0, 250], [350, 150], 'clamp');
        return {
          transform: [{ scale }],
          height,
          width,
        };
      });

    useEffect(() => {
        blinkValue.value = withRepeat(
            withTiming(0, {duration: 500}),
            -1,
            true
        )
    },[robotText])

    useEffect(() => {
        let index = 0;
        if(robotText) {
            const intervalId = setInterval(() => {
                setDisplayedText((prev) => prev + robotText[index]);
                index++;
            
                if (index === robotText.length) {
                    clearInterval(intervalId);
                    setDisplayedText('');
                    dispatch(activateRobotSpeech(''));
                }
                }, 100);
            return () => clearInterval(intervalId);
        }
    }, [robotText]);

  return (
    <GradientBackground> 
        <LogoTop/>
        <View className="bg-[#FFFFFF] flex-1 rounded-t-2xl justify-between items-center relative">
           {showRobotIconOnTop &&
            <Animated.View style={[animatedStyleScroll]} className="-mt-6 w-[350px] h-[150px] justify-center">
                <LottieView
                    source={require("../../assets/robot-face.json")}
                    style={{width: '100%', height: 250}}
                    autoPlay
                />
                {displayedText.length > 0 && 
                <View className="absolute right-0 top-1/4 px-2 mr-6 max-w-[110px] bg-[#0000002e] rounded-sm">
                    <Text className="text-[#fff] text-base" style={{fontFamily:'geometria-bold'}}>
                        {displayedText}
                    <Animated.Text className="text-[#fff] text-base" style={[{fontFamily:'geometria-bold'}, animatedStyle]}>|</Animated.Text>
                    </Text>
                </View>}
            </Animated.View>}
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                className="flex-1 w-full"
                showsVerticalScrollIndicator={false}
                style={{zIndex:2}}
            >
                <LinearGradient
                    colors={showGradient ? ['#FFFFFF', '#FFFFFF', '#D3D3D3', '#D3D3D3'] : ['#FFFFFF', '#FFFFFF','#FFFFFF','#FFFFFF']}
                    start={[0, 0]}
                    end={[0, 1]}
                    locations={[0, 0.4, 0.5, 1]}
                    style={{ flex: 1 }}
                    >
                    
                    <View className="w-full relative flex-1">
                        {title && 
                            <Text style={{fontFamily:'geometria-bold'}} className={`text-[#000] ${titleCenter ? 'text-center': 'text-start'}  text-lg leading-5 px-[20px]`}>
                                {title}
                            </Text>}
                        <View className="px-[20px] pb-[100px]">
                            {children}
                        </View>
                    </View>
                </LinearGradient>
            </Animated.ScrollView>

            <BlurView
                intensity={2}
                tint="prominent"
                style={{zIndex:1000, backfaceVisibility:'hidden'}}
                className={`absolute bottom-0 left-0 right-0 w-full items-center pb-5 ${showGradient && 'bg-[#D3D3D3]'}`}
                >
                {currentScreen !== 0  &&      
                <View className="w-full h-4 p-4 items-center justify-center flex-row">
                     {dots.map((_, index) => (
                        <View key={index} className={`w-2 h-2 rounded-full mr-2 ${currentScreen === index + 1 ? 'bg-main-blue' : 'bg-grey'}`}></View>
                        ))
                    }
                </View>
                }
                {buttonTitle &&
                <>
                <Pressable onPress={handleProceed} className='max-w-[300px] w-full'>
                    <LinearGradient className="w-full py-[19px] rounded-[89px] items-center" colors={paywall ? ['#FF6F61', '#FF9671'] : ['#4BAAC5', '#39bee3']}>
                        <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">{buttonTitle}</Text>
                    </LinearGradient>
                </Pressable>
                {paywall &&
                 <Text style={{fontFamily:'geometria-regular'}} className="text-xs px-8 text-[#888] text-center">
                    Подписка автоматически продлевается, пока вы не отмените её в настройках.
                 </Text>}
                 </>
                }
            </BlurView>
        </View>
    </GradientBackground>
  );
};

export default WelcomeLayout;