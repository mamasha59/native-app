import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import Home from './screens/Home';
import LanguageScreen from './screens/LanguageScreen/LanguageScreen';
import UserData from './screens/UserData/UserData'; ///
import Slider from './screens/Slider/Slider';
import NoticeMainScreen from './screens/NoticeAccessScreens/NoticeMainScreen';

export type RootStacNativeParamList = {
  LanguageScreen: undefined;
  WelcomeScreens: undefined;
  SliderScreen: undefined;
  MainScreen: undefined;
  FeedbackScreen: undefined;
  NotificationScreen: undefined;
  NoticeAccessScreens: undefined;
};

// Определение типов для navigation и route в каждом экране
export type NavigationPropsStart<RouteName extends keyof RootStacNativeParamList> = {
  navigation: StackNavigationProp<RootStacNativeParamList, RouteName>;
  route: RouteProp<RootStacNativeParamList, RouteName>;
};

const Stack = createNativeStackNavigator<RootStacNativeParamList>();

export default function App() {
  const [exist, setExist] = useState(false); // если юзер уже ввел данные раньше, то перенаправляет сразу на главный экран приложения
  // все роуты стоят по порядку их повяления при загрузки app
  return (
  <NavigationContainer fallback>
    <Stack.Navigator initialRouteName={!exist ? 'MainScreen' : 'LanguageScreen'} screenOptions={{headerShown:false}}>
      <Stack.Screen name='LanguageScreen'component={LanguageScreen}/>
      <Stack.Screen name='WelcomeScreens'component={UserData}/>
      <Stack.Screen name='SliderScreen'component={Slider}/>
      <Stack.Screen name='MainScreen'component={Home}/>
      <Stack.Screen name='NoticeAccessScreens'component={NoticeMainScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
