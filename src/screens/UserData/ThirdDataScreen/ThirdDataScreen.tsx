import { Text, View, Image, ImageBackground } from "react-native";

import { NavigationPropsWelcome } from "../UserData";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import NelatonIcon from "../../../assets/images/iconsComponent/NelatonIcon";
import NotificationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import NightModeButton from "../../HomeScreen/Timer/NightModeButton/NightModeButton";
import { useAppSelector } from "../../../store/hooks";
import { useFormatInterval } from "../../../hooks/useFormatInterval";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {

    const settings = useAppSelector(state => state.timerStates.interval);
    const timeString = useFormatInterval({intervalInSeconds: settings});    

    const proceedNextScreen = () => {
        navigation.navigate('FourthDataScreen');
    }

  return (
    <WelcomeLayout currentScreen={3} title="Ваш план катетеризации:" buttonTitle="Продолжить" handleProceed={proceedNextScreen}>
        <View className="py-4">
            <Text className="flex-1" style={{fontFamily:'geometria-regular'}}>
                Этот план будет адаптироваться под вас. 
                После каждой катетеризации будет рассчитано время до следующей, и активируются уведомления. Всегда катетеризируйтесь до окончания интервала.
            </Text>
            <View className="mx-auto">
                <Image style={{width:40, height:40}} source={require('../../../assets/images/icons/wakeUpIcon.jpeg')}/>
            </View>
            <View className="flex-row justify-center items-start flex-1 mt-4 relative">
                <View className="items-center max-w-[127px] w-full">
                    <View className="border-main-blue border max-w-[47px] rounded-full p-2">
                        <NelatonIcon/>
                    </View>
                    <Text className="text-[#2980b9] text-[12px]" style={{fontFamily:'geometria-regular'}}>
                        Катетеризация каждые
                        <Text style={{fontFamily:'geometria-bold'}} className="underline"> {timeString}</Text>
                    </Text>
                </View>
                <View className="pl-3 flex-1 px-2 justify-center items-center relative">
                    <View className="border-l border-main-blue absolute left-1/4 h-full"></View>
                    <Text className="mb-2" style={{fontFamily:'geometria-bold'}}>06-30</Text>
                    <Text className="mb-2" style={{fontFamily:'geometria-bold'}}>10-30</Text>
                    <Text className="mb-2" style={{fontFamily:'geometria-bold'}}>14-30</Text>
                    <Text className="mb-2" style={{fontFamily:'geometria-bold'}}>18-30</Text>
                    <Text className="mb-2" style={{fontFamily:'geometria-bold'}}>22-00</Text>
                    <Image style={{width:40, height:40}} source={require('../../../assets/images/icons/sleepIcon.jpeg')}/>
                    <Text style={{fontFamily:'geometria-bold'}}>02-00</Text>
                </View>
                <View className="items-center max-w-[127px] w-full ">
                    <View className="max-w-[47px] w-full bg-[#2047e3] rounded-full p-2 items-center justify-center">
                        <NotificationIcon width={28} color={'#fff'}/>
                    </View>
                    <Text className="text-[12px] text-[#2980b9]" style={{fontFamily:'geometria-regular'}}>Вы будете получать уведомления, чтобы катетеризироваться вовремя!</Text>
                </View>
                <View className="absolute bottom-0 left-0 max-w-[120px] w-full flex-1">
                    <Text className="text-[12px]" style={{fontFamily:'geometria-regular'}}>ночная катетеризация</Text>
                    <NightModeButton/>
                </View>
            </View>
            <View className="mt-10 relative">
                <Text style={{fontFamily:'geometria-regular'}} className="text-[#2980b9]">
                    Оптимальная частота катетеризаций составляет 4-6 раз в сутки.
                    Если за одну катетеризацию выделяется более 400 мл мочи, рекомендуется увеличить частоту катетеризаций.
                    Придерживайтесь интервала катетеризации, назначенного врачом.
                </Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9] my-3">Уточните у врача:</Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9]">- интервал катетеризации</Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9]">- Возможность не катетеризироваться в ночное времяa</Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9]">- Рекомендуемое количество потребляемой жидкости</Text>
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;