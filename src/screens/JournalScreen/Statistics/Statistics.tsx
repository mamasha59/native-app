import { format } from "date-fns";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { DropDown } from "../../../assets/images/icons";
import { dateFormat } from "../../../utils/const";
import { useAppSelector } from "../../../store/hooks";

interface iStatistics {
    selectedCalendarDate: string,
    statisticPerDay: {
        cannulation?: number,
        leakage?: number,
        amountOfDrankFluids?: number,
        amountOfReleasedUrine?: number
    }
}

const Statistics = ({selectedCalendarDate, statisticPerDay}:iStatistics) => {
    const {t} = useTranslation();
    const units = useAppSelector(state => state.appStateSlice.units.title);
    const [showStatistics, setShowStatistics] = useState<boolean>(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const rotate = () => {
        Animated.timing(rotation, {
            toValue: showStatistics ? 1 : 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const openStatistics = () => {
        setShowStatistics(!showStatistics);
        rotate();
    }
    
  return (
    <TouchableOpacity activeOpacity={.9} onPress={openStatistics}>
        <View className="flex-row items-center">
            <View className="items-start mb-1 mr-2">
                <Text style={{fontFamily:'geometria-bold'}}>
                    {t("journalScreen.dailyStatistics.daily_statistics")} {t("for")} {selectedCalendarDate === format(new Date(), dateFormat).slice(0,10) ? t("today") : selectedCalendarDate}:
                </Text>
            </View>
            <Animated.View style={{ transform: [{ rotate: spin }] }} className={'mb-1'}>
            <DropDown/>
            </Animated.View>
        </View>
        <View className={`flex-0 mb-1 ${showStatistics ? 'block' : 'hidden'}`}>
            <Text style={{fontFamily:'geometria-regular'}} className="mr-2">{t("journalScreen.dailyStatistics.catheterizations")}
                <Text className="text-purple-button"> {statisticPerDay.cannulation}</Text>
            </Text>
            <Text style={{fontFamily:'geometria-regular'}} className="mr-2">{t("journalScreen.dailyStatistics.urine_leakages")}
                <Text className="text-purple-button"> {statisticPerDay.leakage}</Text>
            </Text>
            <Text style={{fontFamily:'geometria-regular'}} className="mr-2">{t("journalScreen.dailyStatistics.fluid_intake")}
                <Text className="text-purple-button"> {statisticPerDay.amountOfDrankFluids} {units}</Text>
            </Text>
            <Text style={{fontFamily:'geometria-regular'}} className="mr-2">{t("journalScreen.dailyStatistics.urine_output")}
                <Text className="text-purple-button"> {statisticPerDay.amountOfReleasedUrine} {units}</Text>
            </Text>
        </View>
    </TouchableOpacity>
  );
};

export default Statistics;
