import { View, Text, TouchableOpacity, StyleSheet, AppState, Vibration } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { differenceInSeconds, format, isAfter, parse } from "date-fns";
import { useStopwatch, useTimer } from "react-timer-hook";
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

import IntervalUI from "./IntervalUI/IntervalUI";
import { SvgComponentText } from "./SvgComponentText/SvgComponentText";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setIntervalDifference, setShowModalSuccess, whetherStartFromCountdown } from "../../../store/slices/timerStatesSlice";
import { 
    addBadgesJournalScreen,
    changeStateOfTimerTitleForFirstTimeInApp,
    ifCountUrineChangeState,
    popupLiquidState,
    switchCannulationAtNightMode,
    switchNightModeModal } from "../../../store/slices/appStateSlicer";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { dateFormat } from "../../../utils/const";
import { decreaseQuantityOFConsumableItem } from "../../../store/slices/consumablesSlice";
import SwitchInnerCircleUIToNightMode from "./SwitchInnerCircleUIToNightMode/SwitchInnerCircleUIToNightMode";
import { useSchedulePushNotificationTimerInterval } from "../../../hooks/notifications/useSchedulePushNotificationTimerInterval";

const TimerT = () => {
  const dispatch = useAppDispatch();
  const {t,i18n} = useTranslation();
  const now = new Date();
  
  const settings = useAppSelector((state) => state.appStateSlice); // настройки приложения
  const journal = useAppSelector((state) => state.journal); // кол-во катетеров
  const settingsNighMode = useAppSelector((state) => state.nightOnBoarding); // кол-во катетеров
  const {intervalDifference, interval, yellowInterval} = useAppSelector((state) => state.timerStates); // timer settings
  const {consumablesItem} = useAppSelector((state) => state.consumablesSlice); // timer settings

  const [initialStrip, setInitialStrip] = useState<number>(0); // 105 полосок
  const [startFromCountdown , setStartFromCountdown] = useState<boolean>(true); // состояние что бы таймер начинался с обратного отсчета Выбранного интервала
  
  const [timerInterval, setTimerInterval] = useState<number>(interval); // интервал Нормальный 
  const [timerIntervalStopwatch, setTimerIntervalStopwatch] = useState<number>(interval); // интервал Крит.
  const [timerTitle, setTimerTitle] = useState<string>('');

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean}>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  });
  const [loader, setLoader] = useState<boolean>(false);
  const [daysFromLastCannulation, setDaysFromLastCannulation] = useState<number>(0);
  const flipValue = useSharedValue<number>(0);

  const [isItTimeToShowModalTurnOnNightMode, setIsItTimeToShowModalTurnOnNightMode] = useState<boolean>();

  const { schedulePushNotificationTimerInterval } = useSchedulePushNotificationTimerInterval();
  
  const timeWhenAskToActivateNightMode = parse(settingsNighMode.timeWhenAskToActivate, 'HH:mm', now); // made time object from timeWhenAskToActivate
  const formattedCurrentTime = parse(format(now, 'HH:mm'), 'HH:mm', new Date()); // current time object 
  
  useEffect(() => {
      const newIsItTime = isAfter(formattedCurrentTime, timeWhenAskToActivateNightMode);
      setIsItTimeToShowModalTurnOnNightMode(newIsItTime);
    }, [settingsNighMode.timeWhenAskToActivate, timeWhenAskToActivateNightMode]);

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
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timerInterval); // обратный отсчет, Нормальный интервал
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
      dispatch(whetherStartFromCountdown(false));
      setPartTime({firstPartTime: false , secondPartTime: false, thirdPartTime: true}); // делаем Нормальный интервал активным, там время идет на возрастание
      setStartFromCountdown(false);
      startStopwatch();
      }
  });

  useEffect(() => { // при смене интервала
    if(timerRunning || stopwatchRunning){
      setTimerInterval(interval);
      setTimerIntervalStopwatch(interval);
    } 
  },[interval, timerRunning]);

  useEffect(() => { // при закрытии приложения таймер будет продолжать работу
    const updateStopWatch = async () => {
      setLoader(true);
      if(!settings.cannulationAtNight.value){
        if (intervalDifference && intervalDifference > timerInterval) {// с Крит. интервала, если разница в секундах с записью в журнале больше Оптимального интервала
          setStartFromCountdown(false);
          setPartTime({firstPartTime: false, secondPartTime: false, thirdPartTime: true});
          setInitialStrip(105);
          const expiryTimestampDifferenceStopWatch = new Date();
          expiryTimestampDifferenceStopWatch.setSeconds((expiryTimestampDifferenceStopWatch.getSeconds() + timerIntervalStopwatch + intervalDifference) - timerInterval);
          resetStopwatch(expiryTimestampDifferenceStopWatch);
        } else if(intervalDifference < timerInterval && intervalDifference > 0){// c Нормального интервала
          setPartTime({firstPartTime: true, secondPartTime: false, thirdPartTime: false});
          const expiryTimestampDifferenceTimer = new Date();
          expiryTimestampDifferenceTimer.setSeconds(expiryTimestampDifferenceTimer.getSeconds() + (timerInterval - intervalDifference));
          timerRestart(expiryTimestampDifferenceTimer);
        } else {
          setTimerInterval(interval);
        }
        setLoader(false);
      };
    }
    updateStopWatch();
  }, [intervalDifference]);
  
  useEffect(() => { // рассчитываем разницу по времени между последней катетеризацией и текущем временем, результат в секундах
    if(!settings.cannulationAtNight.value){
      if(journal.urineDiary.length > 0) {
        const lastRecord = journal.urineDiary.find((e) => e.catheterType);
        if(lastRecord){
          const targetDate = parse(lastRecord?.timeStamp!, dateFormat, new Date());
          const currentDate = new Date();
          const difference = differenceInSeconds(currentDate, targetDate);   
          // Расчет дней, часов, минут и секунд
          const days = Math.floor(difference / (24 * 3600));
          setDaysFromLastCannulation(days);
          dispatch(setIntervalDifference(difference));
        } 
      }
    }
  },[]);

  const activateYellowInterval = () => {
    const convertedYellowInterval = yellowInterval * 60;
    if(timerTotalSeconds === convertedYellowInterval){
      setPartTime({firstPartTime: true, secondPartTime: true, thirdPartTime: false});
    }
  }

  useEffect(() => { // делаем желтый интервал активным, этот хук если приложение не было закрыто
    if(partTime.firstPartTime){
      activateYellowInterval();
    }
  },[timerTotalSeconds, yellowInterval]);

  useEffect(() => {
    if (!settings.stateOfTimerTitleForFirstTimeInApp) {
      setTimerTitle(t("timer.titles.first_title"));
    } else if (partTime.firstPartTime && !partTime.secondPartTime) {
      setTimerTitle(t("timer.titles.before_catheterization"));
    } else if (partTime.secondPartTime && partTime.firstPartTime && !partTime.thirdPartTime) {
      setTimerTitle('Самое время катетеризироваться!');
    } else if(partTime.thirdPartTime){
      setTimerTitle(t("timer.titles.since_last_catheterization"));
    }
  }, [i18n.language, partTime, timerRunning, settings.stateOfTimerTitleForFirstTimeInApp]);
  
  useEffect(() => { // stop timer if turn on Night Mode
    const stopTimer = () => {
      if(settings.cannulationAtNight.value){
        setPartTime({firstPartTime: false, secondPartTime: false, thirdPartTime: false});
        if(timerRunning){
          const expiryTimestampReset = new Date();
          expiryTimestampReset.setSeconds(expiryTimestamp.getSeconds() + timerInterval);
          timerRestart(expiryTimestampReset, false);
        } else if (stopwatchRunning){
          resetStopwatch(stopwatchOffset, false);
        }
        setInitialStrip(0);
      } 
    }
    stopTimer()
  },[settings.cannulationAtNight]);

  const requestNotificationPermission = async () => {
    const status = await Notifications.getAllScheduledNotificationsAsync();
    console.log('запланированы',status);
  };

  const triggerVibration = () => Vibration.vibrate(7, false);

  const handlePressCommon = async () => {
    triggerVibration();
    setLoader(false);
    const notificationTitle = `Время катетеризироваться! осталось ${yellowInterval} минут`;
    const lastCatheterizationTimeBodyText = journal.urineDiary[0] ? `Последняя катетеризация была в ${journal.urineDiary[0].timeStamp}` : '';
    schedulePushNotificationTimerInterval({
      title: notificationTitle,
      body: lastCatheterizationTimeBodyText,
    });
    requestNotificationPermission();

    if(!settingsNighMode.cannulationAtNight){ // turn of night mode only IF ITS ON
      dispatch(switchCannulationAtNightMode({   
        timeStamp: new Date().toString(),
        value: false
      })); 
    }
    setDaysFromLastCannulation(0); // reset days from last cannulation
    dispatch(whetherStartFromCountdown(true));// always starts from COUNTDOWN
    setIntervalDifference(0);                 // clear time difference since last catheterization
    if (!settings.stateOfTimerTitleForFirstTimeInApp) {
      dispatch(changeStateOfTimerTitleForFirstTimeInApp(true));
    }
    if (consumablesItem[0].quantity > 0) {
      dispatch(decreaseQuantityOFConsumableItem());
    }
    if (!partTime.firstPartTime && !partTime.secondPartTime) { // start of the timer countdown
      setPartTime({ firstPartTime: true, secondPartTime: false, thirdPartTime: false });
      startTimer();
    } else if (partTime.firstPartTime) {
      timerRestart(expiryTimestamp);
    }
    if (timerRunning || stopwatchRunning || !partTime.firstPartTime) {      
      resetStopwatch(stopwatchOffset, false);
      setStartFromCountdown(true);
      setPartTime({ firstPartTime: true, secondPartTime: false, thirdPartTime: false });
      timerRestart(expiryTimestamp);
      setInitialStrip(0); // обнуляем секундные полоски
    }
  };

  const handlePressButton = () => { // при нажатии кнопки, если не выбрано измерение мочи
    dispatch(setShowModalSuccess(true));      // показывает модальное окно об успешной катетеризации
    if(isItTimeToShowModalTurnOnNightMode && !settingsNighMode.cannulationAtNight && !settings.cannulationAtNight.value) {
      dispatch(switchNightModeModal(!settings.openModalNightMode)); // open modal Turn on Night Mode
    } else {
      handlePressCommon();
      if(!settings.urineMeasure){
        dispatch(addUrineDiaryRecord({
          id: uuidv4(),
          whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`, 
          catheterType: t("nelaton"),
          timeStamp: format(new Date(), dateFormat),
          amountOfDrankFluids: {value:''},
          amountOfReleasedUrine: ''
        }));
        dispatch(addBadgesJournalScreen(1));
      }
    }
  };
  
  const handlePressIfUrineMeasure = () => { // при нажатии кнопки, если Выбрано измерение мочи
    if(isItTimeToShowModalTurnOnNightMode && !settingsNighMode.cannulationAtNight && !settings.cannulationAtNight.value) {
      dispatch(switchNightModeModal(!settings.openModalNightMode)); // open modal Turn on Night Mode
    }else {
      handlePressCommon();
      if (settings.urineMeasure && settings.openModalNightMode === false) {
        dispatch(popupLiquidState(true));
        dispatch(ifCountUrineChangeState(true));
      }
    }
  };
  // ---- DOWN ANIMATION BLOCK ---- \\

  let calculatedTimeToDrawSeconds = Math.ceil(interval / 105 * 1000);

  useEffect(() => { // рисуем пунктирные линии на внешнем кругу
    let intervalId: NodeJS.Timeout;

    if (timerRunning) {
      intervalId = setInterval(() => {          
          setInitialStrip((prev) => Math.min(prev + 1, 105));
      }, calculatedTimeToDrawSeconds);
    };
    return () => {
      clearInterval(intervalId);
    };
      
  }, [timerRunning, partTime, startFromCountdown]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {  // active - foreground
        if(partTime.firstPartTime && !stopwatchRunning && !partTime.thirdPartTime){
          const strips = Math.ceil((1 - (timerTotalSeconds / interval)) * 105);
          setInitialStrip(strips);
        }
      }
    };        
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
    }, []);

    const frontAnimatedStyleInnerCircle = useAnimatedStyle(() => {
      return {
        transform: [
          { rotateY: `${interpolate(flipValue.value, [0, 180], [0, 180])}deg` },
        ],
        opacity: interpolate(flipValue.value, [0, 90, 180], [1, 0, 1]),
      };
    });

  return (
    <View className="flex-1 -mt-4 items-center justify-center w-full h-full relative">
      <SvgComponentText
        partTime={partTime}
        start={timerRunning}
        initialNumberOfStrip={initialStrip}
      />
      <View className="absolute items-center justify-center flex-1">
        <View className="items-center">
          <Animated.View style={[styles.card, frontAnimatedStyleInnerCircle]} >
            <Text adjustsFontSizeToFit style={{fontFamily:'geometria-bold'}} className="text-base leading-4 text-center text-[#000] max-w-[200px]">
              {timerTitle}
            </Text>
            <IntervalUI
              startFromCountdown={startFromCountdown}
              stopwatchHours={stopwatchHours}
              stopwatchMinutes={stopwatchMinutes}
              stopwatchSeconds={stopwatchSeconds}
              days={daysFromLastCannulation}
              timerHours={timerHours}
              timerMinutes={timerMinutes}
              timerSeconds={timerSeconds}
              loader={loader}
            />
          </Animated.View>
          <SwitchInnerCircleUIToNightMode sharedValue={flipValue}/>  
        </View>
        <TouchableOpacity className="flex-grow-0 min-w-[141px]" onPress={settings.urineMeasure ? handlePressIfUrineMeasure : handlePressButton} activeOpacity={0.6}>
          <LinearGradient
            colors={['#83B759', '#609B25']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0.0553, 0.9925]}
            className="rounded-[43px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base capitalize leading-5 text-white text-center px-6 py-3">
              {timerRunning || stopwatchRunning ? t("timer.completed") : t("timer.start")}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerT;

const styles = StyleSheet.create({
  card: {
    backfaceVisibility: 'hidden',
  },
  arrow: {
    fontFamily: 'geometria-bold',
    fontSize: 24,
  },
});