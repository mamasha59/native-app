import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import Home from './screens/Home';
import UserData from './screens/UserData/UserData';
import NoticeNavigationScreen from './screens/NoticeAccessScreens/NoticeNavigationScreen';
import { store } from './store/store';
import { StatusBar } from 'expo-status-bar';
import GradientBackground from './Layouts/GradientBackground/GradientBackground';

export type RootStacNativeParamList = {
  WelcomeScreens: undefined;
  MainScreen: undefined;
  NoticeAccessScreens: undefined;
};

//типизация useNavigation если не идет через пропс
export type StackNavigation = StackNavigationProp<RootStacNativeParamList>;

// Определение типов для navigation и route в каждом экране
export type NavigationPropsStart<RouteName extends keyof RootStacNativeParamList> = {
  navigation: StackNavigationProp<RootStacNativeParamList, RouteName>;
  route: RouteProp<RootStacNativeParamList, RouteName>;
};

const Stack = createNativeStackNavigator<RootStacNativeParamList>();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [exist, setExist] = useState(false); // если юзер уже ввел данные раньше, то перенаправляет сразу на главный экран приложения

  const [fontsLoader] = useFonts({  // загружаем шрифт
    'geometria-bold' : require('./assets/fonts/geometria-bold.ttf'),
    'geometria-regular' : require('./assets/fonts/geometria-regular.ttf')
    });
    
  const onLayoutRootView = useCallback(async () => { // работа загрузочного экрана
    if (fontsLoader) await SplashScreen.hideAsync();
    }, [fontsLoader]);

    if (!fontsLoader) return null;
  // все роуты стоят по порядку их повяления при загрузки app
  return (
  <Provider store={store}>
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GradientBackground>
        <SafeAreaView className="flex-1 h-full">
        <StatusBar style='auto' translucent={true} backgroundColor='transparent'/>
            <NavigationContainer fallback={'loading'}>
              <Stack.Navigator initialRouteName={!exist ? 'MainScreen' : 'WelcomeScreens'} screenOptions={{headerShown:false}}>
                <Stack.Screen name='MainScreen'component={Home}/>
                <Stack.Screen name='WelcomeScreens'component={UserData}/>
                <Stack.Screen name='NoticeAccessScreens'component={NoticeNavigationScreen}/>
              </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
      </GradientBackground>
    </SafeAreaProvider>
  </Provider>
  );
}
