import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { v4 as uuidv4 } from 'uuid';

import { SvgComponentText } from "./SvgComponentText/SvgComponentText";
import ShowToast from "../../../components/ShowToast/ShowToast";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, ifCountUrineChangeState, popupLiquidState } from "../../../store/slices/appStateSlicer";
import { useStopwatch, useTimer} from 'react-timer-hook';

const Timer = () => {
  const userSettings = useAppSelector((state) => state.user); // интервал и Измерениe мочи(Да/Нет)
  const interval = useAppSelector((state) => +state.user.interval); // интервал и Измерениe мочи(Да/Нет)
  const dispatch = useAppDispatch();
 
  const [toast, setToastShow] = useState<boolean>(false);        // показываем тост наверху экрана при нажатии на кнопку <Выполненно>
  const [initialStrip, setInitialStrip] = useState<number>(0); // 105 полосок
  
  const [startFromСountdown , setStartFromСountdown] = useState(true); // состояние что бы таймер начинался с обратного отсчета Выбранного интервала
  const normalInterval = 100;

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean}>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  });
  // useEffect(() => { // конвертируем выбранный пользователем интервал в миллисекунды
  //   if(userSettings.interval) {
  //       const minutesHours = userSettings.interval.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
  //       const hours = +minutesHours[0];   // часы
  //       const minutes = +minutesHours[1] || 0; // минуты
  //       const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
  //       // const initialTime = 120; // складываем часы и минуты в полное время в миллисекундах
  //       setInitialIntervalTime(initialTime);
  //   }
  // },[userSettings.interval]);
  
  const stopwatchOffset = new Date(); 
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 120);

  const {
    seconds: stopwatchSeconds,
    minutes: stopwatchMinutes,
    hours: stopwatchHours,
    start: startStopwatch,
    reset: resetStopwatch,
    totalSeconds,
    isRunning: stopwatchRunning,
  } = useStopwatch({ autoStart: false, offsetTimestamp: stopwatchOffset});

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + interval); // 2 минуты
  
  const {
    seconds: timerSeconds,
    minutes: timerMinutes,
    hours: timerHours,
    start: startTimer,
    isRunning: timerRunning,
    restart: timerRestart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      setInitialStrip(0); // обнуляем секундные полоски
      if(partTime.firstPartTime){
        setPartTime({firstPartTime: false, secondPartTime: true, thirdPartTime: false}); // делаем Нормальный интервал активным, там время идет на возрастание
      }
      setStartFromСountdown(false);
      startStopwatch();
    }
  });

  useEffect(() => { // делаем крит. интервал актвным, при условии что время на таймере Нормального интервала = Оптимальый интервал + Нормальный интервал(выбранный пользователем)
    if(partTime.secondPartTime){
      if(totalSeconds === (interval + normalInterval)) {
      setPartTime({firstPartTime: false, secondPartTime: false, thirdPartTime: true});
      }
    }
  },[totalSeconds === (interval + normalInterval)]);

  useEffect(() => { // рисуем пунктирные линии на внешнем кругу
    let calculatedTimeToDrawSeconds = interval / 105 * 1000;
    if (partTime.secondPartTime) {
      calculatedTimeToDrawSeconds = normalInterval / 105 * 1000;
    }
    let intervalId: string | number | NodeJS.Timeout;
    if (interval && partTime) {
      intervalId = setInterval(() => {
        setInitialStrip((prev) => Math.min(prev + 1, 105));
      }, calculatedTimeToDrawSeconds);
    } 
    return () => clearInterval(intervalId);
  }, [timerRunning, partTime]);

  const handlePressButton = () => {
    // Обновляем состояние partTime и запускаем таймеры при необходимости
    if (!partTime.firstPartTime && !partTime.secondPartTime) {
      setPartTime({ firstPartTime: true, secondPartTime: false, thirdPartTime: false });
      startTimer();
    } else if (partTime.firstPartTime) {
      timerRestart(expiryTimestamp);
    }
    // Сброс и перезапуск таймера, если таймер или секундомер уже запущены
    if (timerRunning || stopwatchRunning) {
        resetStopwatch(stopwatchOffset, false);
        setStartFromСountdown(true);
        setPartTime({ firstPartTime: true, secondPartTime: false, thirdPartTime: false });
        timerRestart(expiryTimestamp);
      // Создание записи в дневнике мочеиспускания
      const record = addUrineDiaryRecord({
        id: uuidv4(),
        whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
        catheterType: 'Нелатон',
        timeStamp: new Date().toISOString().slice(0, 10),
      });
  
      // Добавление баджа и записи в дневник
      dispatch(addBadgesJournalScreen(1));
      dispatch(record);
  
      // Отображение уведомления и сброс секундных полосок
      setToastShow(true);
      setInitialStrip(0);
    }
  };
  
  const handlePressIfUrineMeasure = () => { // функция при нажатии на кнопку Выполнено, если выбранно Измерение мочи
    if(!partTime.firstPartTime && !partTime.secondPartTime){
      setPartTime({firstPartTime: true, secondPartTime: false, thirdPartTime: false}); // делаем Оптимальный интервал актинвым, время идет на убывание
      startTimer(); // запускаем таймер на отсчет до 0 от выбранного Оптимального интервала
    }
    if(userSettings.urineMeasure === 'Да') {
      dispatch(popupLiquidState(true)); // показываем попап
      dispatch(ifCountUrineChangeState(true)); // делаем true что бы изменить внешний вид попапа жидкости и показать его
      setToastShow(true);
      dispatch(addBadgesJournalScreen(1));
      setInitialStrip(0); // обнуляем секундные полоски
    }
  }

  return (
    <View className="flex-1 justify-center items-center relative">
      <View className="absolute left-0 top-2 gap-1">
        <View className="flex-row">
          <Text style={{fontFamily:'geometria-regular'}} className="bg-[#048eff] text-[#fff] p-1 rounded-md text-xs border">оптимальный</Text>
          <Text style={{fontFamily:'geometria-regular'}} className="p-1"> - 4 часа</Text>
        </View>
        <View className="flex-row">
          <Text style={{fontFamily:'geometria-regular'}} className="bg-[#FFB254] text-[#fff] p-1 rounded-md text-xs">нормальный</Text>
          <Text style={{fontFamily:'geometria-regular'}} className="p-1"> - 10 мин</Text>
        </View>
        <View className="flex-row">
          <Text style={{fontFamily:'geometria-regular'}} className="bg-[#EA3737] text-[#fff] p-1 rounded-md text-xs">крит.</Text>
          <Text style={{fontFamily:'geometria-regular'}} className="p-1"> - 10 мин</Text>
        </View>
      </View>
      <>
      <View className="flex-1 items-center justify-center w-full h-full">
         <SvgComponentText initialInterval={interval}
          normalInterval={normalInterval}
          partTime={partTime}
          start={timerRunning}
          initialNumberOfStrip={initialStrip}/>
      </View>
      <View className="absolute items-center">
        <View className="items-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-center text-grey max-w-[160px]">
                {!partTime.secondPartTime ? 'Время катетеризироваться:' : 'С последней катетеризации:'}
            </Text>
            <Text style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px] my-[15px]">
              {
              `${startFromСountdown ? timerHours : stopwatchHours}:${startFromСountdown ? timerMinutes.toString().padStart(2,'0') : stopwatchMinutes.toString().padStart(2,'0')}:${startFromСountdown ? timerSeconds.toString().padStart(2,'0') : stopwatchSeconds.toString().padStart(2,'0')}`
              }
            </Text> 
        </View>
        <TouchableOpacity className="flex-grow-0 min-w-[141px]" onPress={userSettings.urineMeasure === 'Да' ? handlePressIfUrineMeasure : handlePressButton} activeOpacity={0.6}>
          <LinearGradient
              colors={['#83B759', '#609B25']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              locations={[0.0553, 0.9925]}
              className="rounded-[43px]">
              <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF] text-center px-6 py-3">
                  {timerRunning ? 'Выполнено' : 'Начать'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
      </View>
      </>
      <ShowToast setShowToast={setToastShow} show={toast} text="Вы прокатетеризировались!"/>
    </View>
  );
};

export default Timer;
