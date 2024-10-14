import { View, Text, Dimensions, Switch, Pressable } from "react-native";
import * as Notifications from 'expo-notifications';
import { TextInput } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { isEnabledNoticeOfGoalReminderDuringDay, setIdentifierOfGoalReminderDuringDay, setIntervalForGoalReminderDuringDay } from "../../../store/slices/notificationsSettingsSlice";
import { focusInput } from "../../../utils/const";

const windowSize = Dimensions.get('window');

const WaterGoalReminderDuringDay = () => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const {noticeOfGoalReminderDuringDay} = useAppSelector(state => state.notificationsSettingsSlice);

    const [intervalGoalReminder, setIntervalGoalReminder] = useState<string>(''+noticeOfGoalReminderDuringDay.interval)
    const inputRef = useRef<TextInput>(null);
    const [isEnabled, setIsEnabled] = useState<boolean>(noticeOfGoalReminderDuringDay.state);

    const handleInput = (value:string, setState: (value: string) => void) => {
      if (+value <= 0 || +value > 12) {
        setState('');
      } else {
        setState(value);
      }
    }
    
    const handleInputGoalReminderDuringDay = (value: string) => handleInput(value, setIntervalGoalReminder);

    const schedulePushNotification = async (interval:number) => {
      if(noticeOfGoalReminderDuringDay.state){
        const secondsInterval = interval * 3600;
        
        if (noticeOfGoalReminderDuringDay.identifierOfGoalReminderDuringDay){                    
          await Notifications.cancelScheduledNotificationAsync(noticeOfGoalReminderDuringDay.identifierOfGoalReminderDuringDay);
          dispatch(setIdentifierOfGoalReminderDuringDay(''));
        }
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            priority: Notifications.AndroidNotificationPriority.MAX,
            title: "Не забывайте пить воду!",
            launchImageName:'image',
            subtitle:'Напоминание!',
            interruptionLevel:'timeSensitive',
            body: 'Поддерживайте баланс воды в организме!',
            sound: true,
            categoryIdentifier: 'reminder-to-drink-water',
            data: {
              title: 'drink-water',
            }
          },
          trigger: {
            seconds: secondsInterval,
            repeats: true,
            channelId: undefined,
          },
        });
        dispatch(setIdentifierOfGoalReminderDuringDay(notificationId)); // Устанавливаем ID уведомления
      }
    };

    useEffect(() => {
      if(!noticeOfGoalReminderDuringDay.state){
        Notifications.cancelScheduledNotificationAsync(noticeOfGoalReminderDuringDay.identifierOfGoalReminderDuringDay);
        dispatch(setIdentifierOfGoalReminderDuringDay(''));
      }else {
        schedulePushNotification(+intervalGoalReminder);     
      }
    },[intervalGoalReminder, noticeOfGoalReminderDuringDay.state])

    const submitInputGoalReminderDuringDay = () => dispatch(setIntervalForGoalReminderDuringDay(+intervalGoalReminder));

    const toggleSwitch = async () => {
      const newIsEnabled = !isEnabled;
      setIsEnabled(newIsEnabled);
      dispatch(isEnabledNoticeOfGoalReminderDuringDay(newIsEnabled));
    }

  return (
    <View className="flex-row flex-1 justify-between items-center mt-2 border-b border-[#bdc3c75e]">
      <Pressable
        disabled={!noticeOfGoalReminderDuringDay.state}
        onPress={() => focusInput(inputRef)}
        className={`bg-grey flex-row justify-between items-center relative ${noticeOfGoalReminderDuringDay.state && 'bg-white'}`}>
          <Text className="text-[17px] w-full" style={{fontFamily:'geometria-regular', maxWidth: windowSize.width / 2}}>
            {t("noticeOfWaterConsumptionComponents.remind_to_reached_water_goal_time")}
          </Text>
          <View className="flex-row items-center">
              <Text className="text-base" style={{fontFamily:'geometria-regular'}}>{t("every")} </Text>
              <TextInput
                value={intervalGoalReminder}
                ref={inputRef}
                onEndEditing={submitInputGoalReminderDuringDay}
                onChangeText={(e) => handleInputGoalReminderDuringDay(e)}
                className="text-base"
                style={{fontFamily:'geometria-bold'}}
                keyboardType="numeric"
                maxLength={2}
                selectTextOnFocus
              />
              <Text className="text-base" style={{fontFamily:'geometria-bold'}}>{t("hour")} </Text>
          </View>
      </Pressable>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={noticeOfGoalReminderDuringDay.state ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        value={noticeOfGoalReminderDuringDay.state}
        onValueChange={toggleSwitch}
      />
    </View>
  );
};

export default WaterGoalReminderDuringDay;
