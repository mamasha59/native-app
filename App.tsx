import './src/lang/i18n';
import 'react-native-get-random-values';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Platform } from 'react-native';
import Animated from 'react-native-reanimated';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import { persistor, store } from './src/store/store';
import GradientBackground from './src/Layouts/GradientBackground/GradientBackground';
import RootNavigations from './src/components/RootNavigations/RootNavigations';

Animated.addWhitelistedNativeProps({ text: true });
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({ // norices foreground
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.setNotificationCategoryAsync("its-about-cannulation", [
  {
    buttonTitle: "Выполнить катетеризацию",
    identifier: "first",
    options: {
      opensAppToForeground: true,
    },
  },
  {
    buttonTitle: "Проигнорировать",
    identifier: "second",
    options: {
      opensAppToForeground: false,
      isDestructive: true,
    },
  },
]);

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // ниже метод выполняется когда пришло уведомление
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    // ниже метод, при клике на уведомление, когда пользователь взаимодействует с уведомлением
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response);
    });

    return () => {
      if(notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if(responseListener.current){
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const [fontsLoader, fontError] = useFonts({     // загружаем шрифт
    'geometria-bold' : require('./src/assets/fonts/geometria-bold.ttf'),
    'geometria-regular' : require('./src/assets/fonts/geometria-regular.ttf')
    });
    
  const onLayoutRootView = useCallback(async () => { // работа загрузочного экрана
    if (fontsLoader || fontError) await SplashScreen.hideAsync();
    }, [fontsLoader, fontError]);

    if (!fontsLoader && !fontError) return null

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size={'large'}/>} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaProvider onLayout={onLayoutRootView}>
              <GradientBackground>
                <SafeAreaView className="flex-1 h-full">
                <StatusBar style='auto' translucent={true} backgroundColor='transparent'/>
                  <RootNavigations/>
                </SafeAreaView>
              </GradientBackground>
          </SafeAreaProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({ 
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token && token.data;
}