import LottieView from "lottie-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";

interface iHoursInterval {
    setTimeIntervalToShowResult: (hour:number) => void,
    textColor: string,
    textAlert: {
        interval: string;
    }
}

const HoursInterval = ({setTimeIntervalToShowResult, textColor, textAlert}:iHoursInterval) => {
    const {t} = useTranslation();
    const [selectedHour, setSelectedHour] = useState<number>(12);
    const hours = [12, 24, 48];

    const handleSelectedHour = (hour: number) => {
        setSelectedHour(hour); // Обновляем выбранный час
        setTimeIntervalToShowResult(hour); // Устанавливаем интервал
      };

  return (
    <View className="mb-4 flex-1">
        <View className="mb-2">
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[28px]">
                {t("waterBalanceComponent.title")} за последние:
            </Text>
        </View>
        <View className="flex-row items-center flex-wrap justify-between flex-1">
            <View className="flex-row items-center flex-wrap">
                {hours.map((hour) => (
                    <TouchableOpacity
                        key={hour}
                        onPress={() => handleSelectedHour(hour)}
                        activeOpacity={.9}
                        className={`rounded-full px-4 py-1 mr-2 mb-2 ${selectedHour === hour ? 'bg-main-blue' : 'bg-grey'}`}>
                        <Text style={{fontFamily:'geometria-bold'}} className="text-base text-white">{hour} ч.</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View className="flex-row flex-wrap justify-start items-center">
                <View className="flex-row items-center">
                    <View className="w-[20x] h-[20px]">
                        <LottieView
                            source={require("../../../../assets/question-mark.json")}
                            style={{width: 20, height: 20}}
                            autoPlay
                        />
                    </View>
                </View>
                <Text style={{fontFamily:'geometria-bold', color: textColor}} className="text-sm">{textAlert.interval}</Text>
            </View>
        </View>
    </View> 
  );
};

export default HoursInterval;
