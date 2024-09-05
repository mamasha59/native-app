import { View, Text, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { format, parse, subHours } from "date-fns";
import { useTranslation } from "react-i18next";

import Pencil from "../../assets/images/iconsComponent/Pencil";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDayGoalOfDrinkWater } from "../../store/slices/appStateSlicer";
import { focusInput } from "../../utils/const";

const windowSize = Dimensions.get('window');

const NoticesOfWaterConsumption = () => {
    const now = new Date();
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const {dayGoalOfDrinkWater, units} = useAppSelector(state => state.appStateSlice);
    const settingsNightMode = useAppSelector(state => state.nightOnBoarding.timeSleepStart);

    const startTimeNight = parse(settingsNightMode, 'HH:mm', now); // начало ночного интервала
    const newTime = subHours(startTimeNight, 2);
    const formattedNewTime = format(newTime, 'HH:mm');

    const [dayGoalOfWater, setDayGoalOfWater] = useState<string>(''+dayGoalOfDrinkWater);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if(units.title === 'fl oz'){
            setDayGoalOfWater(''+51);
        }else {
            setDayGoalOfWater(''+1500);
        }
    },[units])

    const inputOnChangeDayGoalOfWater = (value: string) => {
        const convertedValue = +value;
        const equalZero = convertedValue <= 0;
        const newDayGoalOfWater =
            (units.title === 'fl oz' && (equalZero || convertedValue > 180)) ||
            (units.title !== 'fl oz' && (equalZero || convertedValue > 5000))
                ? ''
                : value;
        setDayGoalOfWater(newDayGoalOfWater);
    };

    const adDayGoalOfWater = () => dispatch(setDayGoalOfDrinkWater(+dayGoalOfWater));

  return (
    <View className="mt-4">
        <Text style={{fontFamily:'geometria-bold'}}>
            {t("noticeOfWaterConsumptionComponents.title")}
        </Text>
        
        <TouchableOpacity className="mt-2 py-3 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>
                {t("noticeOfWaterConsumptionComponents.evening_time_take_water")}
            </Text>
            <View className="flex-row">
                <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>{formattedNewTime}</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => focusInput(inputRef)} className="mt-2 py-3 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>
                {t("noticeOfWaterConsumptionComponents.set_daily_goal")}
            </Text>
            <View className="flex-row items-center">
                <View className="flex-row items-center">
                    <TextInput
                        ref={inputRef}
                        value={dayGoalOfWater}
                        onEndEditing={adDayGoalOfWater}
                        onChangeText={(e) => inputOnChangeDayGoalOfWater(e)}
                        style={{fontFamily:'geometria-bold'}}
                        keyboardType="numeric"
                        maxLength={4}
                        selectTextOnFocus
                        className="text-[15px] max-w-[45px] border-b flex-1 text-center p-0 m-0"/>
                    <Text className="text-[15px]" style={{fontFamily:'geometria-bold'}}>
                        {units.title}
                    </Text>
                </View>
                <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                    <Pencil/>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity className="mt-2 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px] w-full" style={{fontFamily:'geometria-regular', maxWidth: windowSize.width / 2}}>
                {t("noticeOfWaterConsumptionComponents.remind_to_reached_water_goal_time")}
            </Text>
            <View className="flex-row items-center">
                <View className="flex-row">
                    <Text className="text-[15px]" style={{fontFamily:'geometria-regular'}}>{t("every")} </Text>
                    <Text className="text-[15px]" style={{fontFamily:'geometria-bold'}}>2 {t("hour")}</Text>
                </View>
                <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                    <Pencil/>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default NoticesOfWaterConsumption;
