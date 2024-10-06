import './src/lang/i18n';
import 'react-native-get-random-values';
import { useCallback, useEffect, useState} from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, AppStateStatus} from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import * as Notifications from 'expo-notifications';

import { persistor, store } from './src/store/store';
import GradientBackground from './src/Layouts/GradientBackground/GradientBackground';
import RootNavigations from './src/components/RootNavigations/RootNavigations';
import { NavigationContainer } from '@react-navigation/native';
import { registerForPushNotificationsAsync } from './src/utils/registerForPushNotificationsAsync';
import AppStateStatusContext from './src/utils/AppStateStatusContext/AppStateStatusContext';
import useAppStateCheck from './src/hooks/useAppStateCheck';

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
    identifier: "do-catheterization",
    options: {
      opensAppToForeground: true,
      isDestructive: true,
    },
  },
]);

Notifications.setNotificationCategoryAsync("reminder-to-drink-water", [
  {
    buttonTitle: "Выпить воду",
    identifier: "drink-water",
    options: {
      opensAppToForeground: true,
      isDestructive: true,
    },
  },
]);

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [appStateStatus, setAppStateStatus] = useState<AppStateStatus>('unknown');

  useAppStateCheck({ setAppStateStatus });

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then(token => setExpoPushToken(token));
    // ниже метод выполняется когда пришло уведомление
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
      <AppStateStatusContext.Provider value={{ appStateStatus, setAppStateStatus}}>
        <PersistGate loading={<ActivityIndicator size={'large'}/>} persistor={persistor}>
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <NavigationContainer>
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
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </AppStateStatusContext.Provider>
    </Provider>
  );
}