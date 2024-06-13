import { RefObject, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Pencil from "../../assets/images/iconsComponent/Pencil";

const NoticesOfCannulation = () => {
    const [whenShowNoticeBeforeCannulation, setWhenShowNoticeBeforeCannulation] = useState<string>('');
    const [whenShowNoticeBeforeSleep, setWhenShowNoticeBeforeSleep] = useState<string>('');
 
    const inputRefWhenShowNoticeBeforeCannulation = useRef<TextInput>(null);
    const inputRefWhenShowNoticeBeforeSleep = useRef<TextInput>(null);

    // Общая функция для обработки ввода
    const handleInput = (value: string, setState: (value: string) => void) => {
        if (+value <= 0 || +value > 60) {
            setState('');
        } else {
            setState(value);
        }
    };

    const handleInputWhenShowNoticeBeforeCannulation = (value: string) => handleInput(value, setWhenShowNoticeBeforeCannulation);
    const handleInputWhenShowNoticeBeforeSleep = (value: string) => handleInput(value, setWhenShowNoticeBeforeSleep);

    const focusInput = (inputRef:RefObject<TextInput>) => {
        if (inputRef.current) {
            inputRef.current.blur(); // Сначала снимаем фокус
            setTimeout(() => {
                inputRef.current && inputRef.current.focus(); // Затем устанавливаем фокус
            }, 100); // Немного задержки для корректной работы
        }
    };

    const focusInputWhenShowNoticeBeforeCannulation = () => focusInput(inputRefWhenShowNoticeBeforeCannulation);
    const focusInputWhenShowNoticeBeforeSleep = () => focusInput(inputRefWhenShowNoticeBeforeSleep);

    const submitTimeWhenShowNoticeBeforeCannulation = () => {
        console.log(whenShowNoticeBeforeCannulation);   
    }
    const submitTimeWhenShowNoticeBeforeSleep = () => {
        console.log(whenShowNoticeBeforeSleep);   
    }

  return (
    <View className="mt-4">
        <Text style={{fontFamily:'geometria-bold'}}>Уведомления о катетеризации:</Text>

        <TouchableOpacity onPress={focusInputWhenShowNoticeBeforeCannulation} className="mt-2 py-2 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>Перед катетеризацией</Text>
            <View className="flex-row items-center">
                <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>за</Text>
                <TextInput
                    ref={inputRefWhenShowNoticeBeforeCannulation}
                    value={whenShowNoticeBeforeCannulation}
                    onEndEditing={submitTimeWhenShowNoticeBeforeCannulation}
                    onChangeText={(e) => handleInputWhenShowNoticeBeforeCannulation(e)}
                    style={{fontFamily:'geometria-bold'}}
                    keyboardType="numeric"
                    placeholder="60"
                    defaultValue="60"
                    maxLength={2}
                    className="text-[17px] border-b max-w-[40px] flex-1 text-center"/>
                <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}> минут</Text>
                <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                    <Pencil/>
                </View>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={focusInputWhenShowNoticeBeforeSleep} className="mt-2 py-2 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px] text-[#2980b9]" style={{fontFamily:'geometria-regular'}}>Ночная катетеризация:</Text>
            <View className="flex-row items-center">
                <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>за</Text>
                <TextInput
                    ref={inputRefWhenShowNoticeBeforeSleep}
                    value={whenShowNoticeBeforeSleep}
                    onEndEditing={submitTimeWhenShowNoticeBeforeSleep}
                    onChangeText={(e) => handleInputWhenShowNoticeBeforeSleep(e)}
                    style={{fontFamily:'geometria-bold'}}
                    keyboardType="numeric"
                    placeholder="60"
                    maxLength={2}
                    className="text-[17px] border-b max-w-[40px] flex-1 text-center"/>
                <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>минут</Text>
            </View>
            <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                <Pencil/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity className="mt-2 py-2 flex-row justify-between border-b border-[#bdc3c75e]">
            <Text className="text-[17px] text-[#2980b9]" style={{fontFamily:'geometria-regular'}}>Функция умного будильника</Text>
            <View className="flex-row items-center">
                <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>вкл.</Text>
            </View>
            <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                <Pencil/>
            </View>
        </TouchableOpacity>

        <View className="mt-2 flex-row justify-between">
            <Text className="text-sm leading-4 text-[#2980b9]" style={{fontFamily:'geometria-regular'}}>После вечерней катетеризации мы расчитаем время ночной катетеризации и настроим будильник.</Text>
        </View>
        <View></View>
    </View>
  );
};

export default NoticesOfCannulation;
