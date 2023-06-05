import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import Home from './screens/Home';
import FeedbackScreen from './screens/FeedbackScreen/FeedbackScreen';
import SetLanguageScreen from './screens/LanguageScreen/LanguageScreen';
import WelcomeScreens from './screens/UserData/UserData';
import Slider from './screens/Slider/Slider';


export type RootStacNativekParamList = {
  SetLanguageScreen: undefined;
  WelcomeScreens: undefined;
  Slider: undefined;
  Main: undefined;
  FeedbackScreen: undefined;
};

// Определение типов для navigation и route в каждом экране
export type NavigationPropsStart<RouteName extends keyof RootStacNativekParamList> = {
  navigation: StackNavigationProp<RootStacNativekParamList, RouteName>;
  route: RouteProp<RootStacNativekParamList, RouteName>;
};


const Stack = createNativeStackNavigator<RootStacNativekParamList>();

export default function App() {
  const [exist, setexist] = useState(false); // если юзер уже ввел данные раньше, то перенаправляет сразу на главный экран приложения
  // все роуты стоят по порядку их повяления при загрузки app
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={exist ? 'Main' : 'SetLanguageScreen'} screenOptions={{headerShown:false}}>
      <Stack.Screen name='SetLanguageScreen' component={SetLanguageScreen}/>
      <Stack.Screen name='WelcomeScreens' component={WelcomeScreens}/>
      <Stack.Screen name='Slider' component={Slider}/>
      <Stack.Screen name='Main' component={Home}/>
      <Stack.Screen name='FeedbackScreen' component={FeedbackScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
