import { Text, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer, useCountdown } from "react-native-countdown-circle-timer";
import { memo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { SvgComponentText } from "../SvgComponentText/SvgComponentText";
import ShowToast from "../../../../components/ShowToast/ShowToast";

const OutsideCircle = () => {
  let initialTime = 14; // тестовое время, по логике время должно приходить из стора редакс
  const [countdown, setCountdown] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  // 75400 сутки 24 часа - 21600 6 часов
  const [toast, setToastShow] = useState<boolean>(false);
  const [t, setT] = useState<boolean>(false);

  const [initial, setInitial] = useState<number>(0); // 105 полосок

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean }>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  })

  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: countdown, duration: initialTime, colors: "#f70000", size: 254,  })
  // console.log(pathLength);
  
  const thirdPartTime = Math.ceil(initialTime / 3);       // время третьей части
  const secondPartTime = Math.ceil(initialTime / 3 * 2); // время второй части
  const firstPartTime = Math.ceil(initialTime / 3 * 3); // время первой части

  const handleStartOfThirdPart = ():void => { // функция вызывается на 3й часте времени, критический интервал
    console.log('Действие при начале третьей части'); //TODO - вызывать уведомление что уже на критическом интервале
    setT(true);
  };

  const getTimeString = (time:number):string => { // форматирование времени
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString()}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
  <View className="flex-1 justify-center items-center relative">
    <CountdownCircleTimer
      key = {key}
      strokeLinecap = "square"
      size = {254}
      strokeWidth = {3} 
      isPlaying = {countdown} 
      onComplete={() => setT(false)}
      duration = {initialTime}
      // initialRemainingTime={14400}
      isSmoothColorTransition={false}
      onUpdate = {(t) => { // при обновления таймера
        if (t === firstPartTime && t !== secondPartTime) { 
          setPartTime({firstPartTime: true, secondPartTime: false, thirdPartTime: false});
        } else if (t === secondPartTime && t !== firstPartTime && t !== thirdPartTime){
          setPartTime({secondPartTime: true, firstPartTime: false, thirdPartTime: false});
        } else if (t === thirdPartTime && t !== secondPartTime && t !== firstPartTime){ // равно третьей части
          handleStartOfThirdPart();
          setPartTime({thirdPartTime: true, firstPartTime: false, secondPartTime: false});
        }
      }}
      colors = {["#4BAAC5", "#FFB254", "#f70000", "#f70000"]}
      colorsTime = {[initialTime, secondPartTime, thirdPartTime, 0]}
      > 
      {({ remainingTime, elapsedTime }) => {
        let timeString = "0:00:00";
        if (remainingTime && !t) {
          timeString = getTimeString(remainingTime);
        } else {
          timeString = getTimeString(elapsedTime);
        }
        const hanldePressButton = () => { // при нажатии на кнопку таймера
            setCountdown(!countdown);
            setKey(prev => prev + 1);
            setToastShow(true);
        }
        return (
        <>
        <View className="-rotate-90 flex-1 items-center justify-center w-full h-full">
          <SvgComponentText partTime={partTime} start={countdown!} initial={initial}/>
        </View>
        <View className="absolute items-center">
          <View className="items-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-grey">До катетеризации:</Text>
            <Text style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px] my-[15px]">{timeString}</Text> 
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
