import * as Notifications from 'expo-notifications';
import { setIdentifierOfCatheterizationNotice } from '../../store/slices/notificationsSettingsSlice'; // Замените на путь к вашим actions
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface iSchedulePushNotificationForTimer {
  body: string;
  title: string;
}

export const useSchedulePushNotificationTimerInterval = () => {
  const dispatch = useAppDispatch();
  
  const {interval, yellowInterval} = useAppSelector(state => state.timerStates);
  const {identifierOfCatheterizationNotice} = useAppSelector(state => state.notificationsSettingsSlice);

  const schedulePushNotificationTimerInterval = async ({ body, title }: iSchedulePushNotificationForTimer) => {
    const yellowIntervalStarts = interval - yellowInterval * 60;
    
    if (identifierOfCatheterizationNotice) {
      await Notifications.cancelScheduledNotificationAsync(identifierOfCatheterizationNotice);
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          priority: Notifications.AndroidNotificationPriority.MAX,
          title: title,
          launchImageName: 'image',
          subtitle: 'Напоминание!',
          interruptionLevel: 'timeSensitive',
          body: body,
          data: {
            title: 'timer',
            timeToMakeCatheterization: true,
          },
          sound: true,
          categoryIdentifier: 'its-about-cannulation',
        },
        trigger: { channelId: undefined, seconds: yellowIntervalStarts, repeats: false },
      });
      dispatch(setIdentifierOfCatheterizationNotice(notificationId)); //notification ID
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

  return { schedulePushNotificationTimerInterval };
};
