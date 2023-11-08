import { Text, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { SvgComponentText } from "../SvgComponentText/SvgComponentText";
import InnerCircle from "../InnerCircle/InnerCircle";

const OutsideCircle = () => {
  const timeRef = useRef<Text>(null);
  const [countdown, setCountdown] = useState<boolean>();
  const [timeString, setTimeString] = useState<number>(14);
  const [key, setKey] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false); // Состояние для отслеживания работы таймера

  return (
  <View className=" w-full h-full justify-center rounded-full relative">
    <View className="-rotate-90">
      <SvgComponentText/>
    </View>
    
    <View className="absolute right-[54px] items-center justify-center mx-auto flex-1">
      
      <View className="flex-1 justify-center items-center"> 
        <CountdownCircleTimer
          key={key}
          strokeLinecap="square"
          size={254}
          strokeWidth={2}
          isPlaying = {countdown}
          duration = {timeString}
          onUpdate={(t) => console.log(t)
          }
          colors={["#4BAAC5", "#FFB254", "#EA3737", "#f70000"]}
          colorsTime={[timeString, 3, 3, 0]}>
          {({ remainingTime }) => {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            const timeString = `${hours.toString()}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            const hanldePressButton = () => {
                setCountdown(!countdown);
                setKey(prev => prev + 1)
            }
            return (
                <>
                <Text style={{fontFamily:'geometria-regular'}} ref={timeRef} className="text-xs text-grey">До катетеризации:</Text>
                <Text style={{fontFamily:'geometria-bold'}} ref={timeRef} className="text-[40px] leading-[48px] my-[15px]">{timeString}</Text>
                <TouchableOpacity className="flex-grow-0 min-w-[140px]" onPress={hanldePressButton} activeOpacity={0.7}>
                    <LinearGradient
                        colors={['#83B759', '#609B25']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        locations={[0.0553, 0.9925]}
                        className="rounded-[43px]">
                        <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF] text-center px-6 py-3">{countdown ? 'Выполнено' : 'Начать'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                </>
                )
          }}
        </CountdownCircleTimer>
      </View>
    </View>
  </View>
  );
};

export default OutsideCircle;
