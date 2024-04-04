import 'react-native-get-random-values';
import { useCallback } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { persistor, store } from './src/store/store';
import GradientBackground from './src/Layouts/GradientBackground/GradientBackground';
import Navigations from './src/components/Navigations/Navigations';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoader, fontError] = useFonts({     // загружаем шрифт
    'geometria-bold' : require('./src/assets/fonts/geometria-bold.ttf'),
    'geometria-regular' : require('./src/assets/fonts/geometria-regular.ttf')
    });
    
  const onLayoutRootView = useCallback(async () => { // работа загрузочного экрана
    if (fontsLoader || fontError) await SplashScreen.hideAsync();
    }, [fontsLoader, fontError]);

    if (!fontsLoader && !fontError) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size={'large'}/>} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <GradientBackground>
              <SafeAreaView className="flex-1 h-full">
              <StatusBar style='auto' translucent={true} backgroundColor='transparent'/>
                <Navigations/>
              </SafeAreaView>
            </GradientBackground>
          </SafeAreaProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
