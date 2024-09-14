import { View, Text, TouchableOpacity, StyleSheet, AppState } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { differenceInSeconds, format, isAfter, parse } from "date-fns";
import { useStopwatch, useTimer } from "react-timer-hook";
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
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

const TimerT = ({setToastOpened}:{setToastOpened:(value:boolean) => void}) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
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

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean}>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  });
  const [loader, setLoader] = useState<boolean>(false);
  const [daysFromLastCannulation, setDaysFromLastCannulation] = useState<number>(0);
  
  const flipValue = useSharedValue<number>(0);
  const translateArrowY = useSharedValue(0); // translate Arrow animation

  const [isItTimeToShowModalTurnOnNightMode, setIsItTimeToShowModalTurnOnNightMode] = useState<boolean>();
  
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
      setPartTime({firstPartTime: true , secondPartTime: true, thirdPartTime: true}); // делаем Нормальный интервал активным, там время идет на возрастание
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
    if(!settings.cannulationAtNight.value){
        const updateStopWatch = async () => {
            setLoader(true);
            if(!settings.cannulationAtNight.value){
                if (intervalDifference && intervalDifference > timerInterval) {// с Крит. интервала, если разница в секундах с записью в журнале больше Оптимального интервала
                  setStartFromCountdown(false);
                  setPartTime({firstPartTime: true, secondPartTime: true, thirdPartTime: true});
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
    }
  }, [intervalDifference]);
  
  useEffect(() => { // рассчитываем разницу по времени между последней катетеризацией и текущем временем, результат в секундах
    if(!settings.cannulationAtNight.value){
      if(journal.urineDiary.length > 0) {
        const lastRecord = journal.urineDiary.find((e) => e.catheterType)               
        const targetDate = parse(lastRecord?.timeStamp!, dateFormat, new Date());
        const currentDate = new Date();
        const difference = differenceInSeconds(currentDate, targetDate);   
        // Расчет дней, часов, минут и секунд
        const days = Math.floor(difference / (24 * 3600));
        setDaysFromLastCannulation(days);
        dispatch(setIntervalDifference(difference));
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


  useEffect(() => { // stop timer if turn on Night Mode
    const stopTimer = () => {
        if(settings.cannulationAtNight.value){
          setPartTime({firstPartTime: false, secondPartTime: false, thirdPartTime: false});
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
    if(!settingsNighMode.cannulationAtNight){ // turn of night mode only IF ITS ON
      dispatch(switchCannulationAtNightMode({   
        timeStamp: new Date().toString(),
        value: false
      })); 
    }
    setDaysFromLastCannulation(0); // reset days from last cannulation
    cancelAllScheduledNotificationsAsync();
    dispatch(setShowModalSuccess(true));      // показывает модальное окно об успешной катетеризации
    dispatch(whetherStartFromCountdown(true));// начинает на обратный отсчет
    setIntervalDifference(0);                 // обнуляем разницу между последней катетеризацией
    if (!settings.stateOfTimerTitleForFirstTimeInApp) {
      dispatch(changeStateOfTimerTitleForFirstTimeInApp(true));
    }
    if (consumablesItem[0].quantity > 0) {
      dispatch(decreaseQuantityOFConsumableItem());
    }
    if (!partTime.firstPartTime && !partTime.secondPartTime) {
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
      setToastOpened(true);
      setInitialStrip(0); // обнуляем секундные полоски
    }
  };

  const handlePressButton = () => { // при нажатии кнопки, если не выбранно измерение мочи
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
            amountOfDrankFluids: '',
            amountOfReleasedUrine: ''
          }));
          dispatch(addBadgesJournalScreen(1));
        }
    }
  };
  
  const handlePressIfUrineMeasure = () => { // при нажатии кнопки, если Выбранно измерение мочи
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
  const animatedStyleArrow = useAnimatedStyle(() => {
  return {
    transform: [{ translateY: translateArrowY.value }],
  };
  });

  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${interpolate(flipValue.value, [0, 180], [0, 180])}deg` },
      ],
      opacity: interpolate(flipValue.value, [0, 90, 180], [1, 0, 1]),
    };
  });
  
  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${interpolate(flipValue.value, [0, 180], [180, 360])}deg` },
      ],
      opacity: interpolate(flipValue.value, [0, 90, 180], [1, 0, 1]),
    };
  });

  useEffect(() => {
    if(settings.cannulationAtNight.value){
      translateArrowY.value = withRepeat(
        withTiming(5, {
          duration: 900,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // -1 для бесконечной анимации
        true // true для чередования направления анимации
      );
    }
  }, [settings.cannulationAtNight.value]);

  useEffect(() => {
    if(!settings.cannulationAtNight.value){
      flipValue.value = withTiming(0, { duration: 800 });
    } else {
      flipValue.value = withTiming(180, { duration: 800 });
    }
  },[settings.cannulationAtNight.value]);

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
        if(partTime.firstPartTime && !stopwatchRunning){
          const strips = Math.ceil((1 - (timerTotalSeconds / interval)) * 105);
          setInitialStrip(strips);
        }
      }
    };        
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
    }, []);
      
  return (
    <View className="flex-1 items-center justify-center w-full h-full">
      <SvgComponentText
          partTime={partTime}
          start={timerRunning}
          initialNumberOfStrip={initialStrip}
      />
      <View className="absolute items-center justify-center flex-1">
        <View className="items-center">
          <Animated.View style={[styles.card, frontAnimatedStyle]} >
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-center leading-5 text-[#000] max-w-[200px]">
                {!settings.stateOfTimerTitleForFirstTimeInApp
                    ? t("timer.titles.catheterization_interval")
                    : (!partTime.thirdPartTime ? t("timer.titles.before_catheterization") : t("timer.titles.since_last_catheterization"))
                }
            </Text>
            <IntervalUI
              startFromСountdown={startFromCountdown}
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
          <Animated.View style={[styles.card, backAnimatedStyle]} className='absolute w-[240px] justify-center items-center flex-1 h-full'>
            <Text style={{fontFamily:'geometria-bold'}} className="text-base text-center">
              Ждем вас утром!
            </Text>
            <Text style={{fontFamily:'geometria-bold'}} className="text-sm leading-4 text-center">
              После пробуждения не забудьте про катетеризацию и нажать кнопку ниже
            </Text>
            <Animated.Text style={[styles.arrow, animatedStyleArrow]} className="text-2xl">
              &darr;
            </Animated.Text>
          </Animated.View>
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

  async function schedulePushNotification(title:string, body:string, time:number) { // уведомления
    
    await Notifications.scheduleNotificationAsync({
      identifier: 'its-about-cannulation',
      content: {
        priority: 'HIGH',
        title: title,
        body: body,
        subtitle:'Мы контролируем твою катетеризацию',
        data: {data: new Date()},
        categoryIdentifier: "its-about-cannulation",
        color: "blue",
        sound: "default",
        vibrate: [0, 255, 255, 255],
      },
      trigger: {seconds: time} ,
    });
  }

async function cancelAllScheduledNotificationsAsync() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

const styles = StyleSheet.create({
    card: {
      backfaceVisibility: 'hidden',
    },
    arrow: {
        fontFamily: 'geometria-bold',
        fontSize: 24,
    },
});