import './src/lang/i18n';
import 'react-native-get-random-values';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator} from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import * as Notifications from 'expo-notifications';

import { persistor, store } from './src/store/store';
import GradientBackground from './src/Layouts/GradientBackground/GradientBackground';
import RootNavigations from './src/components/RootNavigations/RootNavigations';
import { registerForPushNotificationsAsync } from './src/utils/registerForPushNotificationsAsync';

Animated.addWhitelistedNativeProps({ text: true });
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({ // notices foreground
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

Notifications.setNotificationCategoryAsync("its-about-cannulation", [
  {
    buttonTitle: "Выполнить катетеризацию",
    identifier: "first", 
    options: {
      opensAppToForeground: true,
      isDestructive: true,
    },
  },
]);

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  console.log(notification);
  
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then(token => setExpoPushToken(token));
    // ниже метод выполняется когда пришло уведомление
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    });
    // ниже метод, при клике на уведомление, когда пользователь взаимодействует с уведомлением
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
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

  const [fontsLoader, fontError] = useFonts({     // LOAD FONTS
    'geometria-bold' : require('./src/assets/fonts/geometria-bold.ttf'),
    'geometria-regular' : require('./src/assets/fonts/geometria-regular.ttf')
  });
    
  const onLayoutRootView = useCallback(async () => { // SPLASH SCREEN
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
                <GestureHandlerRootView>
                  <BottomSheetModalProvider>
                    <RootNavigations/>
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </SafeAreaView>
            </GradientBackground>
          </SafeAreaProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}