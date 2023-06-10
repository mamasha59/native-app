import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const InnerCircle = () => {
    
    const timeRef = useRef<Text>(null);
    const [countdown, setCountdown] = useState<any>();
    const [timeString, setTimeString] = useState<string>("04:00:00");
    const [isRunning, setIsRunning] = useState(false); // Состояние для отслеживания работы таймера

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
    
        const createTimerAnimator = () => {
          setIsRunning(true);
            intervalId = setInterval(() => {
              setCountdown((prevCountdown:number) => {
  
                if (prevCountdown && prevCountdown > 0) {
                  const hours = Math.floor(prevCountdown / 3600);
                  const minutes = Math.floor((prevCountdown % 3600) / 60);
                  const seconds = prevCountdown % 60;
                  const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                    
                  setTimeString(timeString); // записываем значение в переменную
                  return prevCountdown - 1;
                } else{
                  clearInterval(intervalId);
                  return 0;
                }
              });
            }, 1);
        };
    
        if (countdown) {
            createTimerAnimator();
        }
    
        return () => clearInterval(intervalId);
      }, [countdown]);
      
    const handleStartCountdown = () => {
        if(!isRunning){
            setCountdown(14400); // Начинаем обратный отсчет на 1 час (3600 секунд)
        } else {
            setIsRunning(false); // стейт когда таймер начать и закончен
            setCountdown(false); // останавливаем таймер
            setTimeString("04:00:00"); // сбрасываем значение
            console.log('время при остановке ' + timeString);// записываем значение времени когда сделана катеризация
        }
    };

  return (
    <View className="min-h-[254px] min-w-[254px] border-[2px] border-solid rounded-full m-12 ">
  
        <View className="items-center flex-1 mt-14">
            <View className="items-center mb-8">
                <Text className="text-xs leading-[15px] text-[#77787B] font-normal">До катетеризации:</Text>
                <Text ref={timeRef} className="text-[40px] font-bold leading-[48px] mt-[15px]">{timeString}</Text>
            </View>
            <TouchableOpacity onPress={handleStartCountdown} activeOpacity={0.7} style={{flex:1}}>
            <LinearGradient
                colors={['#83B759', '#609B25']}
                start={{ x: 0.001, y: 0.495 }}
                end={{ x: 1, y: 0.505 }}
                className="rounded-[43px]"
            >
                <Text className="text-base leading-5 text-[#FFFFFF] font-bold px-6 py-3">{isRunning ? 'Выполнено' : 'Начать'}</Text>
            </LinearGradient>
            </TouchableOpacity>
        </View>

  </View>
  );
};

export default InnerCircle;
