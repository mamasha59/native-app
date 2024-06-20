import { AppState, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';
import { useStopwatch, useTimer} from 'react-timer-hook';
import { differenceInSeconds, format, isAfter, parse } from 'date-fns';

import { SvgComponentText } from "./SvgComponentText/SvgComponentText";
import ShowToast from "../../../components/ShowToast/ShowToast";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { addUrineDiaryRecord, decreaseCatheterAmount } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, 
         changeStateOfTimerTitleForFirstTimeInApp,
         ifCountUrineChangeState,
         popupLiquidState,
         switchCannulationAtNightNight,
         switchNightModeModal} from "../../../store/slices/appStateSlicer";
import IntervalUI from "./IntervalUI/IntervalUI";
import { setIntervalDifference, setShowModalSuccess, whetherStartFromCountdown } from "../../../store/slices/timerStatesSlice";
import IntervalInfo from "../IntervalInfo/IntervalInfo";
import NightModeButton from "./NightModeButton/NightModeButton";
import ModalSuccess from "./ModalSuccess/ModalSuccess";

const Timer = () => { //TODO refactoring
  const now = new Date();
  const dispatch = useAppDispatch();

  const settings = useAppSelector((state) => state.appStateSlice); // настройки приложения
  const journal = useAppSelector((state) => state.journal); // кол-во катетеров
  const settingsNighMode = useAppSelector((state) => state.nightOnDoarding); // кол-во катетеров
  const {intervalDifference, interval, yellowInterval} = useAppSelector((state) => state.timerStates); // кол-во катетеров
// console.log(settings.cannulationAtNight);

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
  const [laoder, setLoader] = useState<boolean>(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  
  const timeWhenAskToActivateNightmode = parse(settingsNighMode.timeWhenAskToActivate, 'HH:mm', now);
  const formattedCurrentTime = parse(format(now, 'HH:mm'), 'HH:mm', new Date());

  // ===================== \\ - хук времени на возрастание
  const stopwatchOffset = new Date(); // на возрастание, Крит. интервал
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + timerIntervalStopwatch);
  const {
    seconds: stopwatchSeconds,
    minutes: stopwatchMinutes,
    hours: stopwatchHours,
    start: startStopwatch,
    reset: resetStopwatch,
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
    totalSeconds: timerTotalSeconds,
    restart: timerRestart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      setInitialStrip(105);
      schedulePushNotification('О нет! Начался нормальный интервал!', 'Не забудь прокатетеризироваться!');
      dispatch(whetherStartFromCountdown(false));
      setPartTime({firstPartTime: true , secondPartTime: true, thirdPartTime: true}); // делаем Нормальный интервал активным, там время идет на возрастание
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
        setLoader(true);
        if (intervalDifference < timerInterval && intervalDifference > 0) {
          setPartTime({firstPartTime: true, secondPartTime: false, thirdPartTime: false}); // делаем Оптимальный интервал активным
          const expiryTimestampDifferenceTimer = new Date();
          expiryTimestampDifferenceTimer.setSeconds(expiryTimestampDifferenceTimer.getSeconds() + (timerInterval - intervalDifference));
          timerRestart(expiryTimestampDifferenceTimer);
        } else {
          setTimerInterval(interval);
        }
        setLoader(false);
    }
    updateTimer();
  }, [intervalDifference]);

  useEffect(() => { // при закрытии приложения таймер будет продолжать работу с Крит. интервала, если разница в секундах с записью в журанале больше Оптимального интервала
    const updateStopWatch = async () => {
      if(!settings.cannulationAtNight.value){
        setLoader(true);
        if (intervalDifference && intervalDifference > timerInterval) {
          setStartFromСountdown(false);
          setPartTime({firstPartTime: true, secondPartTime: true, thirdPartTime: true}); // делаем Критический интервал активным
          setInitialStrip(105);
          const expiryTimestampDifferenceStopWatch = new Date();
          expiryTimestampDifferenceStopWatch.setSeconds((expiryTimestampDifferenceStopWatch.getSeconds() + timerIntervalStopwatch + intervalDifference) - timerInterval);
          resetStopwatch(expiryTimestampDifferenceStopWatch);
        }
          setLoader(false);
        };
    }
    updateStopWatch();
  }, [intervalDifference, appStateVisible]);
  
  useEffect(() => { // расчитываем разницу по времени между последней катетеризацией и текущем временем, результат в секундах
    if(journal.urineDiary.length > 0) {
      const targetDate = parse(journal.urineDiary[0].timeStamp, "MM/dd/yyyy HH:mm:ss", new Date());
      const currentDate = new Date();
      const difference = differenceInSeconds(currentDate, targetDate);   
      dispatch(setIntervalDifference(difference));
    }
  },[]);

  useEffect(() => { // делаем желтый интервал активным, этот хук если приложени не было закрыто
    if(partTime.firstPartTime){
      if(timerTotalSeconds === timerInterval - (yellowInterval * 60)){
        setPartTime({firstPartTime: true, secondPartTime: true, thirdPartTime: false});
      }
    }
  },[timerTotalSeconds, yellowInterval]);

  useEffect(() => { // рисуем пунктирные линии на внешнем кругу
    let calculatedTimeToDrawSeconds = Math.ceil(interval / 105 * 1000);
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

  useEffect(() => {
    const handleAppStateChange = (nextAppState:any) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // Приложение вернулось на передний план
        const strip = Math.ceil((timerInterval - timerTotalSeconds) * 105 / timerInterval);
        setInitialStrip(strip);
      }
      appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    // Очистка подписки при размонтировании компонента
    return () => { subscription.remove() };
  }, [timerInterval, timerTotalSeconds]);

  useEffect(() => {
    const stopTimer = () => {
      if(settings.cannulationAtNight.value){      
        if(timerRunning){
          const expiryTimestampReset = new Date();
          expiryTimestampReset.setSeconds(expiryTimestamp.getSeconds() + timerInterval);
          timerRestart(expiryTimestampReset, false);
          setInitialStrip(0);
        } else if (stopwatchRunning){
          resetStopwatch(stopwatchOffset, false);
          setInitialStrip(0);
        }
      } 
    }
    stopTimer()
  },[settings.cannulationAtNight]);

  const handlePressCommon = () => {
    if(isAfter(formattedCurrentTime, timeWhenAskToActivateNightmode) && !settingsNighMode.cannulationAtNight){
      dispatch(switchNightModeModal(!settings.openModalNightMode)); // ask to activate night mode in Particular time
    } else {
      dispatch(setShowModalSuccess(true));        // показывает модальное окно об успешной катетеризации
      dispatch(whetherStartFromCountdown(true)); // начинает на обратный отсчет
      setIntervalDifference(0);                 // обнуляем разницу между последней катетеризацией
      schedulePushNotification('Уведомдление через время', 'Уведомление через время');
      if (!settings.stateOfTimerTitleForFirstTimeInApp) {
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
        setInitialStrip(0); // бнуляем секундные полоски
      }
   }
  };

  const handlePressButton = () => { // при нажатии кнопки, если не выбранно измерение мочи
    handlePressCommon();
    if(!settings.urineMeasure){
      dispatch(addUrineDiaryRecord({
        id: uuidv4(),
        whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
        catheterType: 'Нелатон',
        timeStamp: format(new Date(), 'MM/dd/yyyy HH:mm:ss'),
      }));
      dispatch(addBadgesJournalScreen(1));
    }
  };
  
  const handlePressIfUrineMeasure = () => { // при нажатии кнопки, если Выбранно измерение мочи
    handlePressCommon();
    if (settings.urineMeasure && settings.openModalNightMode === false) {
      dispatch(popupLiquidState(true));
      dispatch(ifCountUrineChangeState(true));
    }
  };
  
  return (
    <View className="flex-1 justify-center items-center">
      <NightModeButton/>
      <IntervalInfo/>
      <View className="flex-1 items-center justify-center w-full h-full">
         <SvgComponentText
          partTime={partTime}
          start={timerRunning}
          initialNumberOfStrip={initialStrip}/>
      
        <View className="absolute items-center justify-center flex-1">
          <View className="items-center">
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-center text-[#000] max-w-[200px]">
                {!settings.stateOfTimerTitleForFirstTimeInApp 
                  ? 'Время катетеризироваться:' 
                  : (!partTime.thirdPartTime ? 'До катетеризации:' : 'С последней катетеризации:')
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
              loader={laoder}
              />
          </View>
          <TouchableOpacity className="flex-grow-0 min-w-[141px]" onPress={settings.urineMeasure ? handlePressIfUrineMeasure : handlePressButton} activeOpacity={0.6}>
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
      </View>
      <ShowToast setShowToast={setToastShow} show={toast} text="Вы прокатетеризировались!"/>
      <ModalSuccess/>
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
