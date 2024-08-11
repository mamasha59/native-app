import { Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { addSeconds, format, parse } from "date-fns";
import { useTranslation } from "react-i18next";

import { NavigationPropsWelcome } from "../UserData";
import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import NelatonIcon from "../../../assets/images/iconsComponent/NelatonIcon";
import NotificationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import { useAppSelector } from "../../../store/hooks";
import { useFormatInterval } from "../../../hooks/useFormatInterval";
import NightModeButtonSvg from "../../../assets/images/iconsComponent/NightMode";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const {t} = useTranslation();
    const timerSettings = useAppSelector(state => state.timerStates);
    const nightModesettings = useAppSelector(state => state.nightOnDoarding);
    
    const timeString = useFormatInterval({intervalInSeconds: timerSettings.interval});

    const [intervals, setIntervals] = useState<string[]>([]);
    const [intervalsAtNight, setIntervalsAtNight] = useState<string[]>([]);

    useEffect(() => {
        const now = new Date();
        const startTimeDay = parse(nightModesettings.timeSleepEnd, 'HH:mm', now); // утро
        const endTimeDay = parse(nightModesettings.timeSleepStart, 'HH:mm', now); // ночь
    
        const startTimeNight = parse(nightModesettings.timeSleepStart, 'HH:mm', now); // начало ночного интервала
        const endTimeNight = parse(nightModesettings.timeSleepEnd, 'HH:mm', now); // конец ночного интервала
        endTimeNight.setDate(endTimeNight.getDate() + 1); // добавляем один день к конечному времени ночного интервала
    
        const calculateIntervals = (start:Date, end:Date) => {
          let currentTime = start;
          const tempIntervals = [];
          
          while (currentTime <= end) {
            tempIntervals.push(format(currentTime, 'HH:mm'));
            currentTime = addSeconds(currentTime, timerSettings.interval);
          }
    
          return tempIntervals;
        };
    
        const updateIntervals = () => {
          const dayIntervals = calculateIntervals(startTimeDay, endTimeDay); // Рассчитываем дневные интервалы
          setIntervals(dayIntervals);
    
          if (nightModesettings.cannulationAtNight) {
            const nightIntervals = calculateIntervals(startTimeNight, endTimeNight);
            setIntervalsAtNight(nightIntervals);
          } else {
            setIntervalsAtNight([]);
          }
        };
    
        updateIntervals();
      }, [nightModesettings, timerSettings.interval, nightModesettings.cannulationAtNight]);
      
      
    const proceedNextScreen = () => {
        navigation.navigate('FourthDataScreen');
    };

  return (
    <WelcomeLayout showGradiend currentScreen={3} title={t("thirdDataScreen.title")} buttonTitle={t("continue")} handleProceed={proceedNextScreen}>
        <View className="py-4">
            <Text className="flex-1" style={{fontFamily:'geometria-regular'}}>
                {t("thirdDataScreen.description")}
            </Text>
            <View className="mx-auto">
                <Image style={{width:40, height:40}} source={require('../../../assets/images/icons/wakeUpIcon.jpeg')}/>
            </View>

            <View className="flex-row justify-center items-start flex-1 mt-4 relative">
                <View className="items-center max-w-[127px] w-full justify-between h-[80%]">
                    <View className="items-center justify-center">
                        <View className="border-main-blue border max-w-[47px] rounded-full p-2">
                            <NelatonIcon/>
                        </View>
                        <Text className="text-[#2980b9] text-[12px] leading-4" style={{fontFamily:'geometria-regular'}}>
                            {t("thirdDataScreen.cannulationEachTime")}
                            <Text style={{fontFamily:'geometria-bold'}} className="underline"> {timeString}</Text>
                        </Text>
                    </View>
                    {nightModesettings.cannulationAtNight &&
                    <View className="items-center justify-center mr-4">
                        <Text className="text-[12px] text-center" style={{fontFamily:'geometria-regular'}}>
                            {t("thirdDataScreen.night_cannulation")}
                        </Text>
                        <View className="w-[47px] h-[47px]">
                            <NightModeButtonSvg/>
                        </View>
                    </View>}
                </View>

                <View className="pl-3 flex-1 px-2 justify-center items-center relative min-w-[120px]">
                    <View className="border-l border-main-blue absolute left-1/4 h-full"></View>
                        {intervals.map((e, index) => {
                            return <Text key={index} className="mb-2" style={{fontFamily:'geometria-bold'}}>{e}</Text>
                        })}
                    <Image style={{width:40, height:40}} source={require('../../../assets/images/icons/sleepIcon.jpeg')}/>
                    
                    {nightModesettings.cannulationAtNight && 
                    <View className="flex-row items-start flex-1">
                        <View className="justify-start items-start pt-2">
                            {intervalsAtNight.map((e, index) => {
                                return <Text key={index} className="mb-2" style={{fontFamily:'geometria-bold'}}>{e}</Text>
                            })}
                        </View>
                    </View>}
                </View>

                <View className="items-center max-w-[127px] w-full ">
                    <View className="max-w-[47px] w-full bg-[#2047e3] rounded-full p-2 items-center justify-center">
                        <NotificationIcon width={28} color={'#fff'}/>
                    </View>
                    <Text className="text-[12px] text-[#2980b9] leading-4" style={{fontFamily:'geometria-regular'}}>
                        {t("thirdDataScreen.notification_Description")}
                    </Text>
                </View>
            </View>

            <View className="mt-10 relative">
                <Text style={{fontFamily:'geometria-regular'}} className="text-[#2980b9]">
                    {t("thirdDataScreen.notice")}
                </Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9] my-3">
                    {t("thirdDataScreen.know_from_doctor.title")}
                </Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9]">
                    - {t("thirdDataScreen.know_from_doctor.the_catheterization_interval")}
                </Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9]">
                    - {t("thirdDataScreen.know_from_doctor.the_possibility_of_not_catheterizing_at_night")}
                </Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#2980b9]">
                    - {t("thirdDataScreen.know_from_doctor.how_much_water_you_need_to_drink")}
                </Text>
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;