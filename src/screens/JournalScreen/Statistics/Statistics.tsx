import { format } from "date-fns";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { DropDown } from "../../../assets/images/icons";
import { useRef, useState } from "react";
import { dateFormat } from "../../../utils/const";

interface iStatistics {
    selectedCalendareDate: string,
    statisticPerDay: {
        cannulation?: number,
        leakage?: number,
        amountOfDrankFluids?: number,
        amountOfReleasedUrine?: number
    }
}

const Statistics = ({selectedCalendareDate, statisticPerDay}:iStatistics) => {//TODO при смене языка менять формат даты
    const [showStatistics, setShowStatistics] = useState<boolean>(false);
    const rotation = useRef(new Animated.Value(0)).current;

    const rotate = () => {
        Animated.timing(rotation, {
            toValue: showStatistics ? 1 : 0,
            duration: 400,
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
    <>
    <TouchableOpacity onPress={openStatistics} className="flex-row items-center">
        <View className="items-start mb-1 mr-2">
            <Text style={{fontFamily:'geometria-bold'}}>
                Statistics for {selectedCalendareDate === format(new Date(), dateFormat).slice(0,10) ? 'today' : selectedCalendareDate}:
            </Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: spin }] }} className={'mb-1'}>
          <DropDown/>
        </Animated.View>
    </TouchableOpacity>
    <View className={`flex-0 mb-1 ${showStatistics ? 'block' : 'hidden'}`}>
        <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Catheterizations:
            <Text className="text-purple-button"> {statisticPerDay.cannulation}</Text>
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Leakage:
            <Text className="text-purple-button"> {statisticPerDay.leakage}</Text>
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Drinking liquids:
            <Text className="text-purple-button"> {statisticPerDay.amountOfDrankFluids} ml.</Text>
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Fluid discharged:
            <Text className="text-purple-button"> {statisticPerDay.amountOfReleasedUrine} ml.</Text>
        </Text>
    </View>
    </>
  );
};

export default Statistics;
