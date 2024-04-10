import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { v4 as uuidv4 } from 'uuid';
import * as Notifications from 'expo-notifications';

import { SvgComponentText } from "./SvgComponentText/SvgComponentText";
import ShowToast from "../../../components/ShowToast/ShowToast";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { addUrineDiaryRecord, decreaseCatheterAmount } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, changeStateOfTimerTitleForFirstTimeInApp, ifCountUrineChangeState, popupLiquidState } from "../../../store/slices/appStateSlicer";
import { useStopwatch, useTimer} from 'react-timer-hook';

const Timer = () => {
  const userSettings = useAppSelector((state) => state.user); // интервал и Измерениe мочи(Да/Нет)
  const showTitleOneTimeInApp = useAppSelector((state) => state.appStateSlice.stateOfTimerTitleForFirstTimeInApp); // показываем заголовок Только один раз в приложении для новых юзеров
  const cathetherAmount = useAppSelector((state) => state.journal.initialCathetherAmount.nelaton); // кол-во катетеров
  const interval = useAppSelector((state) => +state.user.interval); // интервал

  const dispatch = useAppDispatch();
 
  const [toast, setToastShow] = useState<boolean>(false);        // показываем тост наверху экрана при нажатии на кнопку <Выполненно>
  const [initialStrip, setInitialStrip] = useState<number>(0); // 105 полосок
  
  const [startFromСountdown , setStartFromСountdown] = useState(true); // состояние что бы таймер начинался с обратного отсчета Выбранного интервала
  const normalIntervalTime = 100;

  const [partTime, setPartTime] = useState<{firstPartTime: boolean, secondPartTime: boolean, thirdPartTime: boolean}>({
    firstPartTime: false,
    secondPartTime: false,
    thirdPartTime: false,
  });
  
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
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 120); // 2 минуты
  
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
      if(partTime.firstPartTime){
        setPartTime({firstPartTime: true ,secondPartTime: true, thirdPartTime: false}); // делаем Нормальный интервал активным, там время идет на возрастание
      }
      setStartFromСountdown(false);
      startStopwatch();
    }
  });

  useEffect(() => { // делаем крит. интервал активным, при условии что время на таймере Нормального интервала = Оптимальый интервал + Нормальный интервал(выбранный пользователем)
    if(partTime.secondPartTime){
      if(totalSeconds === (120 + normalIntervalTime)) {
        setPartTime({firstPartTime: true ,secondPartTime: true, thirdPartTime: true});
      }
    }
  },[totalSeconds === (120 + normalIntervalTime)]);

  useEffect(() => { // рисуем пунктирные линии на внешнем кругу
    let calculatedTimeToDrawSeconds = 120 / 105 * 1000;
    if (partTime.secondPartTime) {
      calculatedTimeToDrawSeconds = normalIntervalTime / 105 * 1000;
    }
    let intervalId: string | number | NodeJS.Timeout;
    if (timerRunning || stopwatchRunning) {
      intervalId = setInterval(() => {
        setInitialStrip((prev) => Math.min(prev + 1, 105));
      }, calculatedTimeToDrawSeconds);
    } 
    return () => clearInterval(intervalId);
  }, [timerRunning, partTime]);

  const handlePressCommon = () => {
    if (!showTitleOneTimeInApp) {
      dispatch(changeStateOfTimerTitleForFirstTimeInApp(true));
    }
    if (cathetherAmount > 0) {
      dispatch(decreaseCatheterAmount({amount:1}))
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
      timeStamp: new Date().toISOString().slice(0, 10),
    }));
  };
  
  const handlePressIfUrineMeasure = () => { // при нажатии кнопки, если Выбранно измерение мочи
    handlePressCommon();
    if (userSettings.urineMeasure === 'Да') {
      dispatch(popupLiquidState(true));
      dispatch(ifCountUrineChangeState(true));
    }
  };
  
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
      </View>
      <>
      <View className="flex-1 items-center justify-center w-full h-full">
         <SvgComponentText
          activeOptimalInterval={timerRunning}
          activeNormalInterval={stopwatchRunning}
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

async function schedulePushNotification(title:string,body:string) { // уведомления
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: 'goes here' },  
    },
    trigger: null,
  });
}