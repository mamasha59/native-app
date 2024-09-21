import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import * as Notifications from 'expo-notifications';
import { TextInput } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

import Pencil from "../../../assets/images/iconsComponent/Pencil";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setGoalReminderIntervalDuringDay, setIdentifierOfGoalReminderIntervalDuringDay } from "../../../store/slices/notificationsSettingsSlice";
import { focusInput } from "../../../utils/const";

const windowSize = Dimensions.get('window');

const WaterGoalReminderDuringDay = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {goalReminderIntervalDuringDay, identifierOfGoalReminderIntervalDuringDay} = useAppSelector(state => state.notificationsSettingsSlice);

    const [intervalGoalReminder, setIntervalGoalReminder] = useState<string>(''+goalReminderIntervalDuringDay)
    const inputRef = useRef<TextInput>(null);

    const handleInput = (value:string, setState: (value: string) => void) => {
      if (+value <= 0 || +value > 12) {
        setState('');
      } else {
        setState(value);
      }
    }

    const handleInputGoalReminderDuringDay = (value: string) => handleInput(value, setIntervalGoalReminder);

    const schedulePushNotification = async (interval:number) => {
        const secondsInterval = interval * 3600;
        
        if (identifierOfGoalReminderIntervalDuringDay){
          await Notifications.cancelScheduledNotificationAsync(identifierOfGoalReminderIntervalDuringDay);
        }    
        try {
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
            },
            trigger: {
                seconds: secondsInterval,
                repeats: true,
                channelId: undefined,
            },
          });
          dispatch(setIdentifierOfGoalReminderIntervalDuringDay(notificationId)); // Устанавливаем ID уведомления
        } catch (error) {
          console.error('Failed to schedule notification:', error);
        }
    };

    const submitInputGoalReminderDuringDay = () => { // set new Yellow Interval for timer
      schedulePushNotification(+intervalGoalReminder);
      dispatch(setGoalReminderIntervalDuringDay(+intervalGoalReminder));
    }

  return (
    <TouchableOpacity onPress={() => focusInput(inputRef)} className="mt-2 flex-row justify-between items-center border-b border-[#bdc3c75e]">
        <Text className="text-[17px] w-full" style={{fontFamily:'geometria-regular', maxWidth: windowSize.width / 2}}>
            {t("noticeOfWaterConsumptionComponents.remind_to_reached_water_goal_time")}
        </Text>
        <View className="flex-row items-center">
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
            <View className="w-[20px] h-[20px] items-center justify-center ml-1">
                <Pencil/>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default WaterGoalReminderDuringDay;
