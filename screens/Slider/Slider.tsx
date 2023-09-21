import { View, Text, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from "react-native-onboarding-swiper";

import SliderDot from "./SliderDot/SliderDot";
import { NavigationPropsWelcome } from "../UserData/UserData";

interface iSlider extends NavigationPropsWelcome<'SliderScreen'> {}

const Slider = ({navigation}:iSlider) => {

    const handleStart = () => {
        navigation.navigate("MainScreen");
    }

  return (
    <LinearGradient
        colors={['#4BAAC5', '#7076B0']}
        start={[0.001, 0.495]}
        end={[1, 0.505]}
        style={{ flex: 1 }}
    >
    <SafeAreaView className="flex-1">
        <View className="items-center">
            <Text className="text-[40px] leading-[48px] font-bold text-[#FFFFFF] my-[50px]">
                Uro<Text className="italic text-[40px] leading-[48px] font-bold">Control</Text>
            </Text>
        </View>
        <View className="bg-[#FFFFFF] flex-1 h-full rounded-t-2xl justify-center pt-[90px]">

            <Onboarding
                DotComponent={SliderDot}
                showNext={false}
                showSkip={false}
                imageContainerStyles={{paddingBottom:65}}
                containerStyles={{justifyContent:"flex-start",backgroundColor:'#FFFFFF'}}
                titleStyles={{fontSize:16, lineHeight:20, fontWeight:'400', color:'#101010',fontFamily:'geometria-regular'}}
                bottomBarHeight={100}
                bottomBarColor="#FFFFFF"
                bottomBarHighlight={false}
                pages={[
                    {
                        backgroundColor: '#ffffff',
                        image: <Image className="max-w-[280px] flex-row justify-start w-full" source={require('../../assets/images/slider/img-slide-1.png')} />,
                        title: 'Уведомления и удобный отчет',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image className="max-w-[280px] w-full" source={require('../../assets/images/slider/img-slide-2.png')} />,
                        title: 'Контроль расхода катетеров',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image className="max-w-[280px] w-full" source={require('../../assets/images/slider/img-slide-3.png')} />,
                        title: 'Расчет интервалов катеризации',
                        subtitle: '',
                    },
                  
                ]}
            />
            
            <View className="w-full items-center mb-5">
                <Pressable onPress={() => handleStart()} className="max-w-[300px] w-full py-[19px] bg-main-blue rounded-[89px] items-center">
                    <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">Начать пользоваться</Text>
                </Pressable>
            </View>

        </View>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default Slider;