import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

import Pencil from "../../../assets/images/iconsComponent/Pencil";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDayGoalOfDrinkWater } from "../../../store/slices/appStateSlicer";
import { focusInput } from "../../../utils/const";

const SetWaterGoalDay = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {dayGoalOfDrinkWater, units} = useAppSelector(state => state.appStateSlice);

    const [dayGoalOfWater, setDayGoalOfWater] = useState<string>(''+dayGoalOfDrinkWater);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if(units.title === 'fl oz'){
            setDayGoalOfWater(''+51);
        }else {
            setDayGoalOfWater(''+dayGoalOfDrinkWater);
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
  );
};

export default SetWaterGoalDay;
