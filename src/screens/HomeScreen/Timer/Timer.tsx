import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { v4 as uuidv4 } from 'uuid';

import { SvgComponentText } from "./SvgComponentText/SvgComponentText";
import ShowToast from "../../../components/ShowToast/ShowToast";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { ifCountUrineChangeState, popupLiquidState } from "../../../store/slices/appStateSlicer";

const Timer = () => {
  const userSettings = useAppSelector((state) => state.user); // интервал и Измерениe почи(Да/Нет)
  
  const addJournalRecord = useAppDispatch();
  const catheter = 'Нелатон'; // TODO убрать
  
  const [timerState, setTimerState] = useState<{countdown:boolean, key:number}>({
    countdown: false,     // состояние таймера, запущен или нет
    key: 0,               // чтобы сбросить и начать таймер снова
  })
  const [toast, setToastShow] = useState<boolean>(false);              // показываем тост наверху экрана при нажатии на кнопку <Выполненно>
  const [reversedTimer, setReversedTimer] = useState<boolean>(false); // делаем время на возрастание на критическом интервале

  const [initialStrip, setInitialStrip] = useState<number>(0); // 105 полосок
  const [initialIntervalTime, setInitialIntervalTime] = useState<number>(0); // интервал катетеризации

  const [initialExtraTime, setInitialExtraTime] = useState<number>(0); // интервал катетеризации плюс третья часть от времени для крит. интервала
  const calculatedTimeToDrawSeconds = initialIntervalTime / 105 * 1000; // время рендера секундных полос в секундах

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean}>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  })

  useEffect(() => { // конвертируем интервал в миллисекунды, добавляем доп. время для крит. интервала
    if(userSettings.interval) {
      setInterval(() => {
        const minutesHours = userSettings.interval!.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
        const hours = +minutesHours[0];   // часы
        const minutes = +minutesHours[1]; // минуты
        const initialTime = hours * 3600 + minutes * 60;;               // складываем часы и минуты в полное время в миллисекундах
        const extraTime = Math.round(initialTime + (initialTime / 3)); // дополнительное время для Критического интервала
        setInitialIntervalTime(initialTime);
        setInitialExtraTime(extraTime); 
      },1000)
    }
  },[userSettings.interval]);

  useEffect(() => {     // рисуем секундные полоски
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (initialIntervalTime) {
      intervalId = setInterval(() => {
        setInitialStrip((prev) => Math.min(prev + 1, 105))
      }, calculatedTimeToDrawSeconds);
    }
    return () => clearInterval(intervalId);
  },[timerState.countdown])
  
  const firstPartTime = Math.ceil(initialIntervalTime / 3 * 3);   // время первой части Оптимальный
  const secondPartTime = Math.ceil(initialIntervalTime / 3 * 2);  // время второй части Нормальный
  const thirdPartTime = Math.ceil(initialIntervalTime / 3);       // время третьей части Критический

  const handleStartOfThirdPart = ():void => { // функция вызывается на 3й часте времени, критический интервал
    setReversedTimer(true);
  };

  const getTimeString = (time:number):string => {     // форматирование времени
    const hours = Math.floor(time / 3600);    
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.ceil(time % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

const handlePressButton = () => {
  setTimerState((prev) => ({
    countdown: !prev.countdown,
    key: prev.key + 1,
  }));
  setToastShow(true);
  if(timerState.countdown || userSettings.urineMeasure === 'Да') {
    const record = addUrineDiaryRecord({
      id: uuidv4(), // генерируем айди для каждой записи
      whenWasCanulisation: new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0'),
      catheterType: catheter,
      timeStamp: new Date().toISOString().slice(0,10),
    });
    addJournalRecord(record);
    if(userSettings.urineMeasure === 'Да') {
      addJournalRecord(popupLiquidState(true));
      addJournalRecord(ifCountUrineChangeState(true));
    }
    setInitialStrip(0);
    setTimerState((prev) => ({
      countdown: true,
      key: prev.key + 1,
    }));
  }
}

  return (
    <View className="flex-1 justify-center items-center relative">
    <CountdownCircleTimer
        key = {timerState.key}
        duration = {initialIntervalTime}
        strokeLinecap = "square"
        size = {254}
        strokeWidth = {3}
        isPlaying = {timerState.countdown} 
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
          return (
          <>
          <View className="-rotate-90 flex-1 items-center justify-center w-full h-full">
            <SvgComponentText partTime={partTime} start={timerState.countdown!} initial={initialStrip}/>
          </View>
          <View className="absolute items-center">
            <View className="items-center">
              <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-grey">{!partTime.thirdPartTime ? 'До катетеризации:' : 'С последней катетеризации:'}</Text>
              <Text style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px] my-[15px]">{!initialIntervalTime && userSettings.interval ? <ActivityIndicator size={"large"}/> : timeString}</Text> 
            </View>
            <TouchableOpacity className="flex-grow-0 min-w-[141px]" onPress={handlePressButton} activeOpacity={0.6}>
              <LinearGradient
                  colors={['#83B759', '#609B25']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  locations={[0.0553, 0.9925]}
                  className="rounded-[43px]">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF] text-center px-6 py-3">{timerState.countdown ? 'Выполнено' : 'Начать'}</Text>
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

export default Timer;
