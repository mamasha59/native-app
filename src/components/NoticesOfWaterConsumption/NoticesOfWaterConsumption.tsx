import { View, Text, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useRef, useState } from "react";
import Pencil from "../../assets/images/iconsComponent/Pencil";

const windowSize = Dimensions.get('window');

const NoticesOfWaterConsumption = () => {
    const [dayGoalOfWater, setDayGoalOfWater] = useState<string>('');
    const inputRef = useRef<TextInput>(null);

    const focusInput = () => {
        if (inputRef.current) {
          inputRef.current.blur(); // Сначала снимаем фокус
          setTimeout(() => {
            inputRef.current && inputRef.current.focus(); // Затем устанавливаем фокус
          }, 100); // Немного задержки для корректной работы
        }
      };

    const handleInputDayGoalOfWater = (value:string) => {
        if(+value <= 0){
            setDayGoalOfWater('');
        }else{
            setDayGoalOfWater(value);
        }
    }

    const adDayGoalOfWater = () => {
        console.log(dayGoalOfWater)        
    }

  return (
    <View className="mt-4">
        <Text style={{fontFamily:'geometria-bold'}}>Уведомления о приеме жидкости:</Text>
        <TouchableOpacity className="mt-2 py-3 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>Вечерний прием жидкости:</Text>
            <TouchableOpacity className="flex-row">
                <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>20:00</Text>
            </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity onPress={focusInput} className="mt-2 py-3 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>Задайте цель на день:</Text>
            <View className="flex-row items-center">
                <View className="flex-row items-center">
                    <TextInput
                        ref={inputRef}
                        value={dayGoalOfWater}
                        onEndEditing={adDayGoalOfWater}
                        onChangeText={(e) => handleInputDayGoalOfWater(e)}
                        style={{fontFamily:'geometria-bold'}}
                        keyboardType="numeric"
                        maxLength={4}
                        className="text-[17px] max-w-[45px] border-b flex-1 text-center p-0 m-0"/>
                    <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>мл</Text>
                </View>
                <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                    <Pencil/>
                </View>
            </View>
        </TouchableOpacity>
        <View className="mt-2 flex-row justify-between items-center">
            <Text className="text-[17px] w-full" style={{fontFamily:'geometria-regular', maxWidth: windowSize.width / 2}}>Напоминать в течении дня до достижении цели:</Text>
            <View className="flex-row items-center">
                <TouchableOpacity className="flex-row">
                    <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>каждые </Text>
                    <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>2 ч.</Text>
                </TouchableOpacity>
                <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                    <Pencil/>
                </View>
            </View>
        </View>
    </View>
  );
};

export default NoticesOfWaterConsumption;
