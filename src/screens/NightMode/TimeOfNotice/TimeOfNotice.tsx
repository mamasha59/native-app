import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Notifications from 'expo-notifications';
import { setHours, setMinutes } from "date-fns";

import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setMorningNoticeTime } from "../../../store/slices/nightStateSlice";
import { iTimePicker } from "../../../types";
import { createDateFromTime, formatDateToTimeString } from "../../../utils/const";
import { setIdentifierOfMorningReminderToDoCatheterization } from "../../../store/slices/notificationsSettingsSlice";

const TimeOfNotice = () => {
  const {t} = useTranslation();

  const {morningNotice, timeOfMorningNotice, timeSleepEnd, cannulationAtNight} = useAppSelector(state => state.nightOnBoarding);
  const {identifierOfMorningReminderToDoCatheterization} = useAppSelector(state => state.notificationsSettingsSlice);
  const dispatch = useAppDispatch();

  const [showModalSetTimeOfNotice, setShowModalSetTimeOfNotice] = useState<boolean>(false);

  const [intervalTimeOfNotice, setIntervalTimeOfNotice] = useState<iTimePicker>({
    selectedIndexHour: 7,
    selectedIndexMinutes: 0,
  });

  const handleOpenModSetTimeOfNotice = () => { // открытие попапа Конца Сна
    if(morningNotice)
    setShowModalSetTimeOfNotice(!showModalSetTimeOfNotice);
  }

  const schedulePushNotification = async (date:Date) => {

    if (identifierOfMorningReminderToDoCatheterization){
      await Notifications.cancelScheduledNotificationAsync(identifierOfMorningReminderToDoCatheterization);
    }    
    try {        
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          priority: Notifications.AndroidNotificationPriority.MAX,
          title: '',
          launchImageName:'image',
          subtitle:'Напоминание!',
          interruptionLevel:'timeSensitive',
          body: 'Просыпайтесь! Пора делать катетеризацию! Не забудьте следить за интервалом!',
          sound: true,
          categoryIdentifier: 'morning-notification-to-do-catheterization',
        },
        trigger: {
            hour: date.getHours(), // like - Час: 23
            minute: date.getMinutes(), // like - Минуты: 45
            repeats: true, // Повторять каждый день
            channelId: undefined,
        },
      });
      dispatch(setIdentifierOfMorningReminderToDoCatheterization(notificationId)); // Устанавливаем ID уведомления
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

  useEffect(() => {
    const time = timeOfMorningNotice.split(':');
    const dateObject = setMinutes(setHours(new Date(), +time[0]), +time[1]);

    if (morningNotice && !cannulationAtNight){
      schedulePushNotification(dateObject);
    }else {
      // console.log('удален');
      Notifications.cancelScheduledNotificationAsync(identifierOfMorningReminderToDoCatheterization);
    }
  },[timeOfMorningNotice, morningNotice])

  const handleSetTimeOfNotice = () => { // при подтверждении интервала Начала сна
    const dateWithTime = createDateFromTime(intervalTimeOfNotice.selectedIndexHour, intervalTimeOfNotice.selectedIndexMinutes);
    const timeStartMorningNotice = formatDateToTimeString(dateWithTime);
    
    dispatch(setMorningNoticeTime(timeStartMorningNotice))
    handleOpenModSetTimeOfNotice();
  }

  const setText = () => {
    if (morningNotice){
      if(timeOfMorningNotice){
        return timeOfMorningNotice;
      }else{
        return timeSleepEnd;
      }
    }else {
      return 'не хочу'
    }
  }

  return ( 
    <View className={`mb-3 ${!morningNotice && 'bg-[#b2bec3]'} rounded-xl pt-1 px-1`}>
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
          {t("nightModeScreen.timeOfNoticeComponent.specify_the_time")}
        </Text>
        <ButtonBluBorder
          handlePressButton={handleOpenModSetTimeOfNotice}
          title={setText()}/>
        <ModalSetInterval
          height={2.6}
          handleOpenModalChangeInterval={handleOpenModSetTimeOfNotice}
          newInterval={intervalTimeOfNotice}
          setNewInterval={setIntervalTimeOfNotice}
          showModalSetInterval={showModalSetTimeOfNotice}
          pressSaveButton={handleSetTimeOfNotice}
          title="Выберите время когда показать уведомление"
          is24Hours
        />
    </View>
  );
};

export default TimeOfNotice;
