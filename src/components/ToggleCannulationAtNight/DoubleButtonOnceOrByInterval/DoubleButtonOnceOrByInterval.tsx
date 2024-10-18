import { useNavigation, useRoute } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { addDays, setHours, setMinutes } from "date-fns";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";

import DoubleButton from "../../DoubleButton/DoubleButton";
import ModalOneNoticeAtNight from "../ModalOneNoticeAtNight/ModalOneNoticeAtNight";
import NotificationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { switchCheckedButtonProfileScreen } from "../../../store/slices/appStateSlicer";
import { StackNavigationRoot } from "../../RootNavigations/RootNavigations";
import { setIdentifierOfOneNotificationAtNight } from "../../../store/slices/notificationsSettingsSlice";
import AppStateStatusContext from "../../../utils/AppStateStatusContext/AppStateStatusContext";
import { useSchedulePushNotificationTimerInterval } from "../../../hooks/notifications/useSchedulePushNotificationTimerInterval";

const DoubleButtonOnceOrByInterval = () => {
    const route = useRoute();
    const {t} = useTranslation();
    const { appStateStatus } = useContext(AppStateStatusContext);
    
    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationRoot>();

    const {doubleButtonProfileScreenClickable} = useAppSelector((state) => state.appStateSlice);

    const {cannulationAtNight, timeOfNoticeAtNightOneTime, timeSleepStart, timeSleepEnd} = useAppSelector((state) => state.nightOnBoarding);

    const {identifierOfOneNotificationAtNight, identifierOfCatheterizationNotice} = useAppSelector(state => state.notificationsSettingsSlice);

    const [toggleNightMode, setToggleNightMode] = useState<boolean>(cannulationAtNight);
    const [modalOnceAtNight, setModalOnceAtNight] = useState<boolean>(false);

    const { schedulePushNotificationTimerInterval } = useSchedulePushNotificationTimerInterval();

    useEffect(() => {
        setToggleNightMode(cannulationAtNight);
    },[cannulationAtNight]);

    const schedulePushNotification = async (date:Date) => {
        if (identifierOfOneNotificationAtNight){
            await Notifications.cancelScheduledNotificationAsync(identifierOfOneNotificationAtNight);
        }
        try {        
          const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
              priority: Notifications.AndroidNotificationPriority.MAX,
              title: 'Ночная катетеризация один раз ночью!',
              subtitle:'Напоминание!',
              interruptionLevel:'timeSensitive',
              body: 'Вставай и меняй катетер соня!',
              sound: true,
              categoryIdentifier: 'one-notification-at-night',
            },
            trigger: {
                hour: date.getHours(), // like - Час: 23
                minute: date.getMinutes(), // like - Минуты: 45
                repeats: true, // Повторять каждый день
                channelId: undefined,
            },
          });
          dispatch(setIdentifierOfOneNotificationAtNight(notificationId)); // Устанавливаем ID уведомления
        } catch (error) {
          console.error('Failed to schedule notification:', error);
        }
    };

    useEffect(() => { //TODO action by press right button
        if(doubleButtonProfileScreenClickable.leftButton){
            const timeOfNoticeOnceAtNightHoursMinutes = timeOfNoticeAtNightOneTime.split(':');
            const timeStartHoursMinutes = timeSleepStart.split(':');
            const timeEndSleepHoursMinutes = timeSleepEnd.split(':');
            
            const timeOfNoticeOnceAtNightDateObject = addDays(setMinutes(setHours(new Date(), +timeOfNoticeOnceAtNightHoursMinutes[0]), +timeOfNoticeOnceAtNightHoursMinutes[1]),1);

            const timeStartSleepObject = setMinutes(setHours(new Date(), +timeStartHoursMinutes[0]), +timeStartHoursMinutes[1]);//evening time
            const timeEndSleepObject = setMinutes(setHours(new Date(), +timeEndSleepHoursMinutes[0]), +timeEndSleepHoursMinutes[1]);//morning time
            // "notification once at night" must not been less then "time start sleep - night" and must not been more than "time end sleep - morning"
            const now = new Date().getHours();

            if(now > timeStartSleepObject.getHours() || now  < timeEndSleepObject.getHours()){                
                if(identifierOfCatheterizationNotice){
                    Notifications.cancelScheduledNotificationAsync(identifierOfCatheterizationNotice);
                }
                schedulePushNotification(timeOfNoticeOnceAtNightDateObject);
            }
        }else if(doubleButtonProfileScreenClickable.rightButton){
            if(identifierOfOneNotificationAtNight){
                Notifications.cancelScheduledNotificationAsync(identifierOfOneNotificationAtNight);
            }else if(!identifierOfCatheterizationNotice){
                schedulePushNotificationTimerInterval({body: 'Тестовое уведомление', title:'Возобновление уведомлений при клике По интервалу.'})
            }
        }
        
    },[doubleButtonProfileScreenClickable.leftButton, timeOfNoticeAtNightOneTime, appStateStatus]);
// when we press One notification per night - left button, this notification will only works after "time when user fall asleep" - time of start sleep,
// till "time when use wake up" - time of end sleep
// to trigger this notification user should open the app again to set notification, or find another way to implement it 
    const handleModalOneNoticeAtNight = () => setModalOnceAtNight(!modalOnceAtNight);

    const handleLeftButtonOnceAtNight = async () => {
        handleModalOneNoticeAtNight();
        if(!doubleButtonProfileScreenClickable.leftButton){
            dispatch(switchCheckedButtonProfileScreen({leftButton: true, rightButton: false}));
        }
    }

    const handleRightButtonByInterval = () => {
        if(!doubleButtonProfileScreenClickable.rightButton){
            dispatch(switchCheckedButtonProfileScreen({leftButton: false, rightButton: true}));
        }
    }

  return (
    <>
        <View className="w-full items-center mt-2">
            {!toggleNightMode && route.name !== 'FirstDataScreen' &&
                <TouchableOpacity className="p-2 bg-[#b5b8b933]" onPress={() => navigation.navigate('NightMode')}>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue">
                        {t("nightModeScreen.title")}
                    </Text>
                </TouchableOpacity>
            }
            {toggleNightMode &&
                <DoubleButton
                    clickable
                    marginBottom={false}
                    showIcon={false}
                    textOfLeftButton={t("toggleCannulationAtNightComponent.once_at_night.button_title")}
                    textOfRightButton={t("toggleCannulationAtNightComponent.by_interval")}
                    handlePressLeftButton={handleLeftButtonOnceAtNight}
                    handlePressRightButton={handleRightButtonByInterval}
                />
            }
            <ModalOneNoticeAtNight
                key={'modal-one-notice-at-night'}
                handleModalOnceAtNight={handleModalOneNoticeAtNight}
                modalOnceAtNight={modalOnceAtNight}/>
        </View>
        {toggleNightMode &&
            <View className="flex-row justify-between mt-2">
                <TouchableOpacity onPress={handleLeftButtonOnceAtNight} className="flex-1 items-center py-1 flex-row justify-center">
                    <NotificationIcon color={'#9966AA'} width={20}/>
                    <Text
                        style={{fontFamily:'geometria-bold'}}
                        className={`text-main-blue text-start ml-1 ${doubleButtonProfileScreenClickable.rightButton && 'line-through'}`}>
                        {timeOfNoticeAtNightOneTime}
                    </Text>
                </TouchableOpacity>
                <View className="flex-1"></View>
            </View>
        }
    </>
  );
};

export default DoubleButtonOnceOrByInterval;