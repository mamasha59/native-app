import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
    let token;
     
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C', 
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC, 
                sound: 'default',
                enableLights: true,
                enableVibrate: true,
                bypassDnd: true,
            }
        );
    }
    
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Permission not granted to get push token for push notification!');
            return;
        }
        token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas.projectId,
        });
    } else {
        alert('Must use physical device for Push Notifications');
    }
    
    return token && token.data;
}