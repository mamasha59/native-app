import { View, Text, Pressable, FlatList, Animated } from "react-native";
import { useRef, useState } from "react";

import { NavigationPropsWelcome } from "../UserData/UserData";
import OnBoardingItem from "./OnboardingItem/OnboardingItem";
import sliders from "./sliders";
import GradientBackground from "../../Layouts/GradientBackground/GradientBackground";
import SliderDot from "./SliderDot/SliderDot";
import LogoTop from "../../Layouts/WelcomeLayout/LogoTop/LogoTop";

interface iSlider extends NavigationPropsWelcome<'SliderScreen'> {}

const Slider = ({navigation}:iSlider) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const [currentIndex, setCurrentIndex] = useState(0);

    const viewableItemsChanged = useRef(({ viewableItems }:any) => {
        setCurrentIndex(viewableItems[0].index)
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50}).current;

    const slidesRef = useRef(null);

    const handleStart = () => { // перенаправляем пользователя на следующий экран
        navigation.navigate("SecondDataScreen");
    }

  return (
    <GradientBackground>
        <LogoTop/>
        <View className="flex-1 bg-[#FFFFFF] items-center justify-center rounded-t-2xl pt-20">
            <FlatList
                data={sliders}
                renderItem={({item}) => <OnBoardingItem item={item}/>}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX }}}], {
                    useNativeDriver: false,
                })}
                onViewableItemsChanged={viewableItemsChanged}
                scrollEventThrottle={32}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                keyExtractor={(item) => item.id}
            />
            <SliderDot data={sliders} scrollX={scrollX}/>
            <View className="w-full items-center mb-5">
                <Pressable onPress={() => handleStart()} className="max-w-[300px] w-full py-[19px] bg-main-blue rounded-[89px] items-center">
                    <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">Начать пользоваться</Text>
                </Pressable>
            </View>
        </View>
    </GradientBackground>
  );
};

export default Slider;