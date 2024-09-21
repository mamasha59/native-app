import { View, Text, TouchableOpacity, AppState } from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Notifications from 'expo-notifications';
import {format, isToday} from "date-fns";

import ModalSetInterval from "../../ModalSetInterval/ModalSetInterval";
import { iTimePicker } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setEveningTimeOfFluidIntakeNotice, setIdentifierOfEveningFluidIntakeNotice } from "../../../store/slices/notificationsSettingsSlice";
import { createDateFromTime, dateFormat, formatDateToTimeString } from "../../../utils/const";
import { setCalendarDay } from "../../../store/slices/appStateSlicer";

const EveningNoticeOfFluidIntake = () => {  // TODO test reset drank water when new day comes
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const {eveningNotificationTimeFluidIntake, identifierOfEveningFluidIntakeNotice} = useAppSelector(state => state.notificationsSettingsSlice);
    const { dayGoalOfDrinkWater, calendarDay} = useAppSelector(state => state.appStateSlice);
    const {timeSleepEnd} = useAppSelector(state => state.nightOnBoarding);
    const {drankWaterChart} = useAppSelector(state => state.journal);

    const drankWaterCurrentDay = (drankWaterChart[drankWaterChart.length - 1].value);
        
    const [showModalSetTimeFluidIntake, setShowModalSetTimeFluidIntake] = useState<boolean>(false);

    const [timeOfEveningFluidIntake, setTimeOfEveningFluidIntake] = useState<iTimePicker>({
        selectedIndexHour: +eveningNotificationTimeFluidIntake.split(':')[0],
        selectedIndexMinutes: +eveningNotificationTimeFluidIntake.split(':')[1],
    });
    const [showError, setShowError] = useState<boolean>(false);

    const handleOpenModalSetTimeFluidIntake = () => setShowModalSetTimeFluidIntake(!showModalSetTimeFluidIntake);

    const timeOfEveningNotification = createDateFromTime(timeOfEveningFluidIntake.selectedIndexHour, timeOfEveningFluidIntake.selectedIndexMinutes);
    const wakeUpTime = createDateFromTime(+timeSleepEnd.split(':')[0], +timeSleepEnd.split(':')[1]); // this time to show error - timeOfEveningNotification cannot be less than wake up time

    const schedulePushNotification = async (date:Date) => {
        if (identifierOfEveningFluidIntakeNotice){
          await Notifications.cancelScheduledNotificationAsync(identifierOfEveningFluidIntakeNotice);
        }    
        try {
          const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
              priority: Notifications.AndroidNotificationPriority.MAX,
              title: `${drankWaterCurrentDay} / ${dayGoalOfDrinkWater} ${t('ml')}`,
              launchImageName:'image',
              subtitle:'Напоминание!',
              interruptionLevel:'timeSensitive',
              body: 'Выпитая жидкость / Ваша цель на день',
              sound: true,
              categoryIdentifier: 'time-to-drink-water',
            },
            trigger: {
                hour: date.getHours(), // like - Час: 23
                minute: date.getMinutes(), // like - Минуты: 45
                repeats: true, // Повторять каждый день
                channelId: undefined,
            },
          });
          dispatch(setIdentifierOfEveningFluidIntakeNotice(notificationId)); // Устанавливаем ID уведомления
        } catch (error) {
          console.error('Failed to schedule notification:', error);
        }
    };

    useEffect(() => {
        schedulePushNotification(timeOfEveningNotification);
    },[drankWaterChart, dayGoalOfDrinkWater, eveningNotificationTimeFluidIntake, calendarDay]);

    const confirmNewInterval = () => {
        if(timeOfEveningNotification <= wakeUpTime){
            setShowError(true);
        }else {
            setShowError(false);
            const eveningNotificationTimeString = formatDateToTimeString(timeOfEveningNotification);
            dispatch(setEveningTimeOfFluidIntakeNotice(eveningNotificationTimeString));
            handleOpenModalSetTimeFluidIntake();
        }
    };
    useEffect(() => { // if its new day we are resetting notification with - 0ml drank water 
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {  // active - foreground
                const lastCalendarDayInJournal = new Date(calendarDay);
                const today = isToday(lastCalendarDayInJournal);

                if(!today){
                    const currentDay = format(new Date(), dateFormat).slice(0,10);
                    dispatch(setCalendarDay(currentDay));
                }
            }
        };        
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, []);

  return (
    <>
        <TouchableOpacity onPress={handleOpenModalSetTimeFluidIntake} className="mt-2 py-3 flex-row justify-between items-center border-b border-[#bdc3c75e]">
        <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>
            {t("noticeOfWaterConsumptionComponents.evening_time_take_water")}
        </Text>
        <View className="flex-row">
            <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>{eveningNotificationTimeFluidIntake}</Text>
        </View>
        </TouchableOpacity>

        <ModalSetInterval
            handleOpenModalChangeInterval={handleOpenModalSetTimeFluidIntake}
            newInterval={timeOfEveningFluidIntake}
            setNewInterval={setTimeOfEveningFluidIntake}
            showModalSetInterval={showModalSetTimeFluidIntake}
            pressSaveButton={confirmNewInterval}
            title={'Время вечернего уведомления о приеме жидкости'}
            is24Hours
            height={2.6}
            showError={showError}
            errorText="Время вечернего уведомления не может быть раньше либо равно времени пробуждения!"
        />
    </>
  );
};

export default EveningNoticeOfFluidIntake;
