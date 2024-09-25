import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import * as Notifications from 'expo-notifications';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setReducingFluidIntake, setTimeReducingFluidIntakeNotice } from "../../../store/slices/nightStateSlice";
import { setIdentifierOfReducingFluidIntakeBeforeSleep } from "../../../store/slices/notificationsSettingsSlice";
import { setHours, setMinutes, subHours } from "date-fns";

const ReducingFluidIntake = () => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const {reducingFluidIntakeTimeOfNotice, reducingFluidIntake, timeSleepStart, cannulationAtNight} = useAppSelector(state => state.nightOnBoarding);
  const {identifierOfReducingFluidIntakeBeforeSleep} = useAppSelector(state => state.notificationsSettingsSlice);

  const [timeBeforeSleep, setTimeBeforeSleep] = useState(''+reducingFluidIntakeTimeOfNotice);

  const schedulePushNotification = async (date:Date) => {
    if (identifierOfReducingFluidIntakeBeforeSleep){
      await Notifications.cancelScheduledNotificationAsync(identifierOfReducingFluidIntakeBeforeSleep);
    }    
    try {        
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          priority: Notifications.AndroidNotificationPriority.MAX,
          title: 'Внимание! Внимание! ',
          launchImageName:'image',
          subtitle:'Напоминание!',
          interruptionLevel:'timeSensitive',
          body: `До сна осталось ${timeBeforeSleep} часа, следует уменьшить потребление жидкости!`,
          sound: true,
          categoryIdentifier: 'reduce-fluid-intake-before-sleep',
        },
        trigger: {
          hour: date.getHours(), // like - Час: 23
          minute: date.getMinutes(), // like - Минуты: 45
          repeats: true, // Повторять каждый день
          channelId: undefined,
        },
      });
      dispatch(setIdentifierOfReducingFluidIntakeBeforeSleep(notificationId)); // Устанавливаем ID уведомления
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

  useEffect(() => {
    const hoursMinutes = timeSleepStart.split(':');
    const dateObject = setMinutes(setHours(new Date(), +hoursMinutes[0]), +hoursMinutes[1]);

    const takeHours = subHours(dateObject, Number(timeBeforeSleep)); // take hours from date

    if (reducingFluidIntake && !cannulationAtNight){
      schedulePushNotification(takeHours);
    }else {
      Notifications.cancelScheduledNotificationAsync(identifierOfReducingFluidIntakeBeforeSleep);
    }
  },[timeBeforeSleep, timeSleepStart, reducingFluidIntake, cannulationAtNight]);

  const handleInputOnChange = (value:string) => {
    if (+value <= 0 || +value > 5) {
      setTimeBeforeSleep('');
    } else {
      setTimeBeforeSleep(value);
    }
  }

  const whetherSetNotificationReducingFluidIntake = ({value}:{value: boolean}) => {
    if(value) dispatch(setReducingFluidIntake(value));
    else dispatch(setReducingFluidIntake(value));
  }

  const handleInputReducingFluidIntakeTime = () =>{
    if(+timeBeforeSleep > 0){
      dispatch(setTimeReducingFluidIntakeNotice(+timeBeforeSleep));
    }
  } 

  return (
    <View className="mb-3">
      <View className={`justify-center my-2 ${!reducingFluidIntake && 'bg-[#b2bec3]'} rounded-xl pt-1 px-1`}>
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
          {t("nightModeScreen.reducingFluidIntakeComponent.receive_notifications_to_reduce_fluid_intake")}
        </Text>

        <View className="mt-3 max-w-[250px] flex-row mx-auto">
          <TextInput
            value={timeBeforeSleep}
            editable={reducingFluidIntake}
            onChangeText={(e) => handleInputOnChange(e)}
            onEndEditing={handleInputReducingFluidIntakeTime}
            selectTextOnFocus
            maxLength={1}
            keyboardType="numeric"
            placeholder="max 5 hours"
            style={{fontFamily:'geometria-bold'}}
            className="text-base flex-1 px-2 text-center leading-[22px] min-h-[44px] border-b border-main-blue"
            />
          <View className="w-auto h-auto px-3 py-2">
            <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>{t("hour")} {t("before")} {t("sleep")}</Text>
          </View>
        </View>

      </View>
      <View className="flex-row px-2 justify-between">
        <TouchableOpacity
          onPress={() => whetherSetNotificationReducingFluidIntake({value: true})}
          activeOpacity={.6}
          className={`${reducingFluidIntake && 'bg-[#b2bec3]'} border border-main-blue rounded-xl min-w-[150px] min-h-[44px] flex-1 justify-center items-center mr-2`}>
            <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{t("yes")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => whetherSetNotificationReducingFluidIntake({value: false})}
          activeOpacity={.6}
          className={`${!reducingFluidIntake && 'bg-[#b2bec3]'} border border-main-blue rounded-xl min-w-[150px] min-h-[44px] flex-1 justify-center items-center mr-2`}>
          <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{t("no")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReducingFluidIntake;
