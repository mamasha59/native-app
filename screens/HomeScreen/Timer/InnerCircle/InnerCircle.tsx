import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const InnerCircle = () => {
    
    const timeRef = useRef<Text>(null);
    const [countdown, setCountdown] = useState<any>();
    const [timeString, setTimeString] = useState<any>(14);
    const [key, setKey] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false); // Состояние для отслеживания работы таймера

    // useEffect(() => {
    //     let intervalId: NodeJS.Timeout;
    
    //     const createTimerAnimator = () => {
    //       setIsRunning(true);
    //         intervalId = setInterval(() => {
    //           setCountdown((prevCountdown:number) => {
  
    //             if (prevCountdown && prevCountdown > 0) {
    //               const hours = Math.floor(prevCountdown / 3600);
    //               const minutes = Math.floor((prevCountdown % 3600) / 60);
    //               const seconds = prevCountdown % 60;
    //               const timeString = `${hours.toString()}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                    
    //               setTimeString(timeString); // записываем значение в переменную
    //               return prevCountdown - 1;
    //             } else{
    //               clearInterval(intervalId);
    //               return 0;
    //             }
    //           });
    //         }, 1000);
    //     };
    
    //     if (countdown) {
    //         createTimerAnimator();
    //     }
    
    //     return () => clearInterval(intervalId);
    //   }, [countdown]);
      
    // const handleStartCountdown = () => {
    //     if(!isRunning){
    //         setCountdown(14400); // Начинаем обратный отсчет на 1 час (3600 секунд)
    //     } else {
    //         setIsRunning(false); // стейт когда таймер начать и закончен
    //         setCountdown(false); // останавливаем таймер
    //         setTimeString("4:00:00"); // сбрасываем значение
    //         console.log('время при остановке ' + timeString);// записываем значение времени когда сделана катеризация
    //     }
    // };

  return (

    <View className="min-h-[254px] min-w-[254px] flex-1 rounded-full justify-center items-center"> 
           <CountdownCircleTimer
              key={key}
              strokeLinecap="round"
              size={254}
              strokeWidth={2}
              isPlaying = {countdown}
              duration = {timeString}
              colors={["#4BAAC5", "#FFB254", "#EA3737", "#f70000"]}
              colorsTime={[timeString, 4, 4, 0]}>
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
                    <Text style={{fontFamily:'geometria-regullar'}} ref={timeRef} className="text-xs text-[#77787B]">До катетеризации:</Text>
                    <Text style={{fontFamily:'geometria-bold'}} ref={timeRef} className="text-[40px] leading-[48px] my-[15px]">{timeString}</Text>
                    <TouchableOpacity className="flex-grow-0 min-h-[44px] min-w-[141px]" onPress={hanldePressButton} activeOpacity={0.7}>
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

  );
};

export default InnerCircle;
