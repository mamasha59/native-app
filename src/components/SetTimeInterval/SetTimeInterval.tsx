import { View, Text } from "react-native";
import React from "react";
import WheelPicker from "react-native-wheely";

interface iSetTimeInterval {
    interval: { selectedIndexHour: number; selectedIndexMinutes: number };
    setInterval: React.Dispatch<React.SetStateAction<{ selectedIndexHour: number; selectedIndexMinutes: number }>>;
  }

const SetTimeInterval = ({interval, setInterval}:iSetTimeInterval) => { // компонент с вращающим колесом с числами, выбор интервала

    const generateSecondsArray = ():string[] => {
        let numbersArray:string[] = [];
        for (let i = 0; i <= 59; i++) {
          numbersArray.push(i.toString());
        }
        return numbersArray;
    }
    const numbers = generateSecondsArray(); // массив строковых чисел секунд ['1','2'...]

    const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] // массив часов

  return (
    <>
    {/* ЧАСЫ */}
    <View className="flex-row items-center">
        <WheelPicker
            itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
            selectedIndex={interval.selectedIndexHour!}
            options={hours} itemHeight={40}
            onChange={(index) =>
                setInterval({
                    selectedIndexHour: index,
                    selectedIndexMinutes:interval.selectedIndexMinutes})
                }
            containerStyle={{width:55}}
            selectedIndicatorStyle={{backgroundColor:'#4babc573'}}
        />
        <View>
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">ч.</Text>
        </View>
    </View>
    {/* МИНУТЫ */}
    <View className="flex-row items-center">
        <WheelPicker
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
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">мин.</Text>
        </View>
    </View>
    </>
  );
};

export default SetTimeInterval;
