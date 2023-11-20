import { useCallback } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { persistor, store } from './store/store';
import GradientBackground from './Layouts/GradientBackground/GradientBackground';
import Navigation from './components/Navigations/Navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoader] = useFonts({  // загружаем шрифт
    'geometria-bold' : require('./assets/fonts/geometria-bold.ttf'),
    'geometria-regular' : require('./assets/fonts/geometria-regular.ttf')
    });
    
  const onLayoutRootView = useCallback(async () => { // работа загрузочного экрана
    if (fontsLoader) await SplashScreen.hideAsync();
    }, [fontsLoader]);

    if (!fontsLoader) return null;

  return (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator size={'large'}/>} persistor={persistor}>
      <RootSiblingParent>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <GradientBackground>
            <SafeAreaView className="flex-1 h-full">
            <StatusBar style='auto' translucent={true} backgroundColor='transparent'/>
              <Navigation/>
            </SafeAreaView>
          </GradientBackground>
        </SafeAreaProvider>
      </RootSiblingParent>
    </PersistGate>
  </Provider>
  );
}
