import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';
import { useStopwatch, useTimer} from 'react-timer-hook';
import { differenceInSeconds, format, parse } from 'date-fns';

import { SvgComponentText } from "./SvgComponentText/SvgComponentText";
import ShowToast from "../../../components/ShowToast/ShowToast";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { addUrineDiaryRecord, decreaseCatheterAmount } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, 
         changeStateOfTimerTitleForFirstTimeInApp,
         ifCountUrineChangeState,
         popupLiquidState} from "../../../store/slices/appStateSlicer";
import IntervalUI from "./IntervalUI/IntervalUI";
import { setInitialStripWhenCloseApp, setIntervalDifference, whetherStartFromCountdown } from "../../../store/slices/timerStatesSlice";

const Timer = () => {
  const dispatch = useAppDispatch();

  const { urineMeasure } = useAppSelector((state) => state.user); // интервал и измерение мочи(Да/Нет)
  const showTitleOneTimeInApp = useAppSelector((state) => state.appStateSlice.stateOfTimerTitleForFirstTimeInApp); // показываем заголовок Только один раз в приложении для новых юзеров
  const journal = useAppSelector((state) => state.journal); // кол-во катетеров

  const {startFromCountdown, intervalDifference, initialStripWhenCloseApp, interval} = useAppSelector((state) => state.timerStates); // кол-во катетеров

  const [toast, setToastShow] = useState<boolean>(false);        // показываем тост наверху экрана при нажатии на кнопку <Выполненно>
  const [initialStrip, setInitialStrip] = useState<number>(0); // 105 полосок
  const [startFromСountdown , setStartFromСountdown] = useState(true); // состояние что бы таймер начинался с обратного отсчета Выбранного интервала
  
  const [timerInterval, setTimerInterval] = useState<number>(interval); // интервал Оптимальный 
  const [timerIntervalStopwatch, setTimerIntervalStopwatch] = useState<number>(interval); // интервал Нормальный и Крит.

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean}>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  });
  // ===================== \\ - хук времени на возрастание
  const stopwatchOffset = new Date(); // на возрастание, Норм. и Крит. интервал
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timerIntervalStopwatch);
  const {
    seconds: stopwatchSeconds,
    minutes: stopwatchMinutes,
    hours: stopwatchHours,
    start: startStopwatch,
    reset: resetStopwatch,
    totalSeconds,
    isRunning: stopwatchRunning} = useStopwatch({ autoStart: false, offsetTimestamp: stopwatchOffset});

  // ===================== \\ - хук времени на убывание
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timerInterval); // обратный отсчет, Оптимальный интервал
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
      schedulePushNotification('О нет! Начался нормальный интервал!', 'Не забудь прокатетеризироваться!');
      setInitialStrip(0); // обнуляем секундные полоски
      dispatch(whetherStartFromCountdown(false));
      if(partTime.firstPartTime){
        setPartTime({firstPartTime: true ,secondPartTime: true, thirdPartTime: false}); // делаем Нормальный интервал активным, там время идет на возрастание
      }
      setStartFromСountdown(false);
      startStopwatch();
    }
  });

  useEffect(() => { // при смене интервала
    if(timerRunning || stopwatchRunning){
      setTimerInterval(interval);
      setTimerIntervalStopwatch(interval);
    } 
  },[interval, timerRunning]);

  // ===================== \\
  useEffect(() => { // при закрытии приложения таймер будет продолжать работу с правильным временем, этот эффект для Оптимального интревала
    const updateTimer = () => {
      if (intervalDifference && startFromCountdown) {
        setPartTime({firstPartTime: true, secondPartTime: false, thirdPartTime: false}); // делаем Оптимальный интервал активным
        const expiryTimestampDifferenceTimer = new Date();
        expiryTimestampDifferenceTimer.setSeconds(expiryTimestampDifferenceTimer.getSeconds() + timerInterval - intervalDifference);
        timerRestart(expiryTimestampDifferenceTimer);
      } else {
        setTimerInterval(interval);
      }
    };
    updateTimer();
  }, [intervalDifference]);
console.log(intervalDifference);

  useEffect(() => { // при закрытии приложения таймер будет продолжать работу с Нормального интервала либо Крит. интервала, если разница в секундах с записью в журанале больше Оптимального интервала
    const updateStopWatch = async () => {

      if (intervalDifference && intervalDifference > timerInterval) {

        setStartFromСountdown(false);
        if(totalSeconds <= (interval * 0.05) + timerIntervalStopwatch){
          setPartTime({firstPartTime: true, secondPartTime: true, thirdPartTime: false}); // делаем Нормальный интервал активным
        }else{
          setPartTime({firstPartTime: true, secondPartTime: true, thirdPartTime: true}); // делаем Критический интервал активным
          setInitialStrip(105);
        }

        const expiryTimestampDifferenceStopWatch = new Date();
        expiryTimestampDifferenceStopWatch.setSeconds((expiryTimestampDifferenceStopWatch.getSeconds() + timerIntervalStopwatch + intervalDifference) - timerInterval);
        resetStopwatch(expiryTimestampDifferenceStopWatch);
      }
    };
    updateStopWatch();
  }, [intervalDifference]);
  
  useEffect(() => { // расчитываем разницу по времени между последней катетеризацией и текущем временем, результат в секундах
    if(journal.urineDiary.length > 0) {
      const targetDate = parse(journal.urineDiary[0].timeStamp, "yyyy-MM-dd HH:mm:ss", new Date());
      const currentDate = new Date();
      const difference = differenceInSeconds(currentDate, targetDate);   
      dispatch(setIntervalDifference(difference));
    }
  },[]);

  useEffect(() => { // делаем крит. интервал активным, этот хук если приложени не было закрыто
    if(partTime.secondPartTime){
      if(totalSeconds >= (interval * 0.05) + timerIntervalStopwatch){
        setPartTime({firstPartTime: true, secondPartTime: true, thirdPartTime: true});
      }
    }
  },[totalSeconds]);

  useEffect(() => { // рисуем пунктирные линии на внешнем кругу
    let calculatedTimeToDrawSeconds = Math.ceil(interval / 105 * 1000);

    if (partTime.secondPartTime && stopwatchRunning) {
      calculatedTimeToDrawSeconds = Math.ceil(((interval * 0.05) / 105) * 1000);
    }
    let intervalId: NodeJS.Timeout;

    if (timerRunning || stopwatchRunning) {
      intervalId = setInterval(() => {
        setInitialStrip((prev) => Math.min(prev + 1, 105));
      }, calculatedTimeToDrawSeconds);
    };
    return () => {
      clearInterval(intervalId);
    };
    
  }, [timerRunning, partTime, stopwatchRunning, startFromСountdown]);

  const handlePressCommon = async () => {
    dispatch(whetherStartFromCountdown(true));
    setIntervalDifference(0); // обнуляем разницу между последней катетеризацией
    schedulePushNotification('Уведомдление через время', 'Уведомление через время');
    if (!showTitleOneTimeInApp) {
      dispatch(changeStateOfTimerTitleForFirstTimeInApp(true));
    }
    if (journal.initialCathetherAmount.nelaton > 0) {
      dispatch(decreaseCatheterAmount({amount:1}));
    }
    if (!partTime.firstPartTime && !partTime.secondPartTime) {
      setPartTime({ firstPartTime: true, secondPartTime: false, thirdPartTime: false });
      startTimer();
    } else if (partTime.firstPartTime) {
      timerRestart(expiryTimestamp);
    }
    if (timerRunning || stopwatchRunning || !partTime.firstPartTime) {      
      schedulePushNotification('Ты прокатетеризировался!', 'Молодцом! Продолжай катетеризацию правильно, Слава Сереже!');
      resetStopwatch(stopwatchOffset, false);
      setStartFromСountdown(true);
      setPartTime({ firstPartTime: true, secondPartTime: false, thirdPartTime: false });
      timerRestart(expiryTimestamp);
      setToastShow(true);
      dispatch(addBadgesJournalScreen(1));
      setInitialStrip(0); // бнуляем секундные полоски
    }
  };

  const handlePressButton = () => { // при нажатии кнопки, если не выбранно измерение мочи
    handlePressCommon();
    dispatch(addUrineDiaryRecord({
      id: uuidv4(),
      whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
      catheterType: 'Нелатон',
      timeStamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    }));
  };
  
  const handlePressIfUrineMeasure = () => { // при нажатии кнопки, если Выбранно измерение мочи
    handlePressCommon();
    if (urineMeasure === 'Да') {
      dispatch(popupLiquidState(true));
      dispatch(ifCountUrineChangeState(true));
    }
  };
  
  return (
    <View className="flex-1 justify-center items-center relative">
      <View>
        <Text>тут будет шкала</Text>
      </View>
      <>
      <View className="flex-1 items-center justify-center w-full h-full">
         <SvgComponentText
          partTime={partTime}
          start={timerRunning}
          initialNumberOfStrip={initialStrip}/>
      </View>
      <View className="absolute items-center">
        <View className="items-center">
          <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-center text-grey max-w-[160px]">
              {!showTitleOneTimeInApp 
                ? 'Время катетеризироваться:' 
                : (!partTime.secondPartTime ? 'До катетеризации' : 'С последней катетеризации:')
              }
          </Text>
          <IntervalUI
            startFromСountdown={startFromСountdown}
            stopwatchHours={stopwatchHours}
            stopwatchMinutes={stopwatchMinutes}
            stopwatchSeconds={stopwatchSeconds}
            timerHours={timerHours}
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
            />
        </View>
        <TouchableOpacity className="flex-grow-0 min-w-[141px]" onPress={urineMeasure === 'Да' ? handlePressIfUrineMeasure : handlePressButton} activeOpacity={0.6}>
          <LinearGradient
              colors={['#83B759', '#609B25']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              locations={[0.0553, 0.9925]}
              className="rounded-[43px]">
              <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF] text-center px-6 py-3">
                {timerRunning || stopwatchRunning ? 'Выполнено' : 'Начать'}
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

async function schedulePushNotification(title:string,body:string) { // уведомления
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      subtitle:'Мы контролируем твою катетеризацию',
      data: { data: new Date() },
    },
    trigger: {seconds:10} ,
  });
}
