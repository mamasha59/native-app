import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { memo, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { SvgComponentText } from "../SvgComponentText/SvgComponentText";
import ShowToast from "../../../../components/ShowToast/ShowToast";
import { useAppSelector } from "../../../../store/hooks";

const OutsideCircle = () => {
  const interval = useAppSelector((state) => state.user.interval); // интервал

  const [countdown, setCountdown] = useState<boolean>(false); // старт таймера
  const [key, setKey] = useState<number>(0);

  const [toast, setToastShow] = useState<boolean>(false);              // показываем тост наверху экрана при нажатии на кнопку
  const [reversedTimer, setReversedTimer] = useState<boolean>(false); // делаем время на возрастание на критическом интервале
  const [title, setTitle] = useState<boolean>(true);                 // на критическом интервале меняем титул

  const [initial, setInitial] = useState<number>(0); // 105 полосок
  const [initialIntervalTime, setInitialIntervalTime] = useState<number>(0); // интервал катетеризации
  const [initialExtraTime, setInitialExtraTime] = useState<number>(0); // интервал катетеризации плюс третья часть от времени для крит. интервала

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean }>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  })

  useEffect(() => {
    if(interval) {
      setInterval(() => {
        const minutesHours = interval.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
        const hours = +minutesHours[0]; // часы
        const minutes = +minutesHours[1]; // минуты
        const initialTime = hours * 3600 + minutes * 60;; // складываем часы и минуты в полное время в миллисекундах
        const extraTime = Math.round(initialTime + (initialTime / 3)); // дополнительное время для Критического интервала
        setInitialIntervalTime(initialTime);
        setInitialExtraTime(extraTime); 
      },1000)
    }
  },[interval]);
  
  const firstPartTime = Math.ceil(initialIntervalTime / 3 * 3);   // время первой части Оптимальный
  const secondPartTime = Math.ceil(initialIntervalTime / 3 * 2);  // время второй части Нормальный
  const thirdPartTime = Math.ceil(initialIntervalTime / 3);       // время третьей части Критический
  // console.log(calculating);
  
  const handleStartOfThirdPart = ():void => { // функция вызывается на 3й часте времени, критический интервал
    setTitle(false);
    setReversedTimer(true);
  };

  const getTimeString = (time:number):string => {     // форматирование времени
    const h = Math.floor(thirdPartTime / 3600);
    const m = Math.floor(thirdPartTime % 3600 / 60);
    const s = Math.floor(thirdPartTime % 60);
    
    const hours = Math.floor(time / 3600);    
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.ceil(time % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  //reversedTimer ? ((time / 3600) + initialTime)
  return (
  <View className="flex-1 justify-center items-center relative">
  <CountdownCircleTimer
      key = {key}
      duration = {initialIntervalTime}
      strokeLinecap = "square"
      size = {254}
      strokeWidth = {3}
      isPlaying = {countdown} 
      onComplete={(t) => {
        setReversedTimer(false);
        console.log(t + thirdPartTime);
      }}
      isSmoothColorTransition={false}
      onUpdate = {(t) => { // при обновления таймера
        if (t === firstPartTime && t !== secondPartTime && t !== thirdPartTime) {
          setPartTime({firstPartTime: true, secondPartTime: false, thirdPartTime: false});
        } else if (t === secondPartTime && t !== firstPartTime && t !== thirdPartTime) {
          setPartTime({secondPartTime: true, firstPartTime: false, thirdPartTime: false});
        } else if (t === thirdPartTime && t !== secondPartTime && t !== firstPartTime) { // равно третьей части
          handleStartOfThirdPart();
          setPartTime({thirdPartTime: true, firstPartTime: false, secondPartTime: false});
        }
      }}
      colors = {["#4BAAC5", "#FFB254", "#f70000", "#f70000"]}
      colorsTime = {[initialIntervalTime, secondPartTime, thirdPartTime, 0]}
      > 
      {({ remainingTime, elapsedTime }) => {
        let timeString = "0:00:00";
        if (remainingTime && !reversedTimer) {
          timeString = getTimeString(remainingTime);
        } else {
          timeString = getTimeString(elapsedTime);
        }
        const hanldePressButton = () => { // при нажатии на кнопку таймера
            setCountdown(!countdown);
            setKey(prev => prev + 1);
            setToastShow(true);
            if(countdown) {
              setTitle(true);
              setCountdown(true);
              setKey(prev => prev + 1);
            }
        }
        return (
        <>
        <View className="-rotate-90 flex-1 items-center justify-center w-full h-full">
          <SvgComponentText partTime={partTime} start={countdown!} initial={initial}/>
        </View>
        <View className="absolute items-center">
          <View className="items-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-grey">{title ? 'До катетеризации:' : 'С последней катетеризации:'}</Text>
            <Text style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px] my-[15px]">{!initialIntervalTime && interval ? <ActivityIndicator size={"large"}/> : timeString}</Text> 
          </View>
          <TouchableOpacity className="flex-grow-0 min-w-[141px]" onPress={hanldePressButton} activeOpacity={0.6}>
            <LinearGradient
                colors={['#83B759', '#609B25']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                locations={[0.0553, 0.9925]}
                className="rounded-[43px]">
              <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF] text-center px-6 py-3">{countdown ? 'Выполнено' : 'Начать'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        </>
        )
      }}
      </CountdownCircleTimer>
    <ShowToast setShowToast={setToastShow} show={toast} text="Вы прокатетеризировались!"/>
  </View>
  );
};

export default memo(OutsideCircle);
