import { RefObject, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

import Pencil from "../../assets/images/iconsComponent/Pencil";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeYellowInterval } from "../../store/slices/timerStatesSlice";

const NoticesOfCannulation = () => { //TODO smart alarm
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const settings = useAppSelector(state => state.timerStates.yellowInterval);
    
    const [whenShowNoticeBeforeCannulation, setWhenShowNoticeBeforeCannulation] = useState<string>(''+settings);
    const [switchAlarm, setSwitchAlarm] = useState(false);
 
    const inputRefWhenShowNoticeBeforeCannulation = useRef<TextInput>(null);

    // Общая функция для обработки ввода
    const handleInput = (value: string, setState: (value: string) => void) => {
        if (+value <= 0 || +value > 60) {
            setState('');
        } else {
            setState(value);
        }
    };

    const handleInputWhenShowNoticeBeforeCannulation = (value: string) => handleInput(value, setWhenShowNoticeBeforeCannulation);

    const focusInput = (inputRef:RefObject<TextInput>) => {
        if (inputRef.current) {
            inputRef.current.blur(); // Сначала снимаем фокус
            setTimeout(() => {
                inputRef.current && inputRef.current.focus(); // Затем устанавливаем фокус
            }, 100); // Немного задержки для корректной работы
        }
    };

    const focusInputWhenShowNoticeBeforeCannulation = () => focusInput(inputRefWhenShowNoticeBeforeCannulation);

    const submitTimeWhenShowNoticeBeforeCannulation = () => { // set new Yellow Interval for timer
        dispatch(changeYellowInterval(+whenShowNoticeBeforeCannulation));
    }
    const handleSwitchAlarm = () => {
        setSwitchAlarm(!switchAlarm);
    }

  return (
    <View className="mt-4">
        <Text style={{fontFamily:'geometria-bold'}}>{t("noticeOfCatheterizationComponent.title")}</Text>

        <TouchableOpacity onPress={focusInputWhenShowNoticeBeforeCannulation} className="mt-2 py-2 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>{t("noticeOfCatheterizationComponent.beforeCatheterization")}</Text>
            <View className="flex-row items-center">
                <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>{t("before")}</Text>
                <TextInput
                    ref={inputRefWhenShowNoticeBeforeCannulation}
                    value={whenShowNoticeBeforeCannulation}
                    onEndEditing={submitTimeWhenShowNoticeBeforeCannulation}
                    onChangeText={(e) => handleInputWhenShowNoticeBeforeCannulation(e)}
                    style={{fontFamily:'geometria-bold'}}
                    keyboardType="numeric"
                    maxLength={2}
                    selectTextOnFocus
                    className="text-[17px] border-b max-w-[40px] flex-1 text-center"/>
                <Text className="text-[15px]" style={{fontFamily:'geometria-bold'}}> {t("min")}</Text>
                <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                    <Pencil/>
                </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSwitchAlarm} className="mt-2 py-2 flex-row justify-between border-b border-[#bdc3c75e]">
            <Text className="text-[17px] text-[#2980b9]" style={{fontFamily:'geometria-regular'}}>{t("noticeOfCatheterizationComponent.smartAlarm")}</Text>
            <View className="flex-row items-center">
                <Text className="text-[15px]" style={{fontFamily:'geometria-bold'}}>
                    {switchAlarm ? 'вкл.' : 'выкл.'}
                </Text>
                <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                    <Pencil/>
                </View>
            </View>
        </TouchableOpacity>

        <View className="mt-2 flex-row justify-between">
            <Text className="text-sm leading-4 text-[#2980b9]" style={{fontFamily:'geometria-regular'}}>
                {t("noticeOfCatheterizationComponent.notice")}
            </Text>
        </View>
    </View>
  );
};

export default NoticesOfCannulation;
