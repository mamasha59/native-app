import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import WheelPicker from "react-native-wheely";

import { iTimePicker } from "../../types";

interface iSetTimeInterval {
    interval: iTimePicker,
    setInterval: React.Dispatch<React.SetStateAction<iTimePicker>>,
    visibleRest?:number,
    is24Hours?: boolean,
  }

const SetTimeInterval = ({interval, setInterval, visibleRest, is24Hours}:iSetTimeInterval) => { // компонент с вращающим колесом с числами, выбор интервала
    const {t} = useTranslation();
    const generateSecondsArray = ():string[] => {
        let numbersArray:string[] = [];
        for (let i = 0; i <= 59; i++) {
          numbersArray.push(i.toString().padStart(2, '0'));
        }
        return numbersArray;
    }
    const numbers = generateSecondsArray(); // массив строковых чисел секунд ['1','2'...]

    const hours = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] // массив часов

    const generate24Hours = () => {
        let numbersArray:string[] = [];
        for (let i = 0; i <= 23; i++) {
            numbersArray.push(i.toString());
          }
          return numbersArray;
    }

    const hours24 = generate24Hours();
    
  return (
    <>
    {/* ЧАСЫ */}
    <View className="flex-row items-center">
        <WheelPicker i18nIsDynamicList
            visibleRest={visibleRest ? 1 : 2}
            itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
            selectedIndex={interval.selectedIndexHour!}
            options={is24Hours ? hours24 : hours}
            itemHeight={40}
            onChange={(index) =>
                setInterval({
                    selectedIndexHour: index,
                    selectedIndexMinutes: interval.selectedIndexMinutes})
                }
            containerStyle={{width:60}}
            selectedIndicatorStyle={{backgroundColor:'#4babc573'}}
        />
        <View>
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">{t("hour")}</Text>
        </View>
    </View>
    {/* МИНУТЫ */}
    <View className="flex-row items-center">
        <WheelPicker
            visibleRest={visibleRest ? 1 : 2}
            itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
            selectedIndex={interval.selectedIndexMinutes!}
            options={numbers}
            onChange={(index) =>
                setInterval({
                    selectedIndexMinutes: index,
                    selectedIndexHour:interval.selectedIndexHour})
                }
            containerStyle={{width:65}}
            selectedIndicatorStyle={{backgroundColor:'#4babc573'}} decelerationRate={"normal"}
        />
        <View>
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">{t("min")}</Text>
        </View>
    </View>
    </>
  );
};

export default SetTimeInterval;
