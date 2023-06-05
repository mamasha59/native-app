import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import Home from './screens/Home';
import FeedbackScreen from './screens/FeedbackScreen/FeedbackScreen';
import LanguageScreen from './screens/LanguageScreen/LanguageScreen';
import UserData from './screens/UserData/UserData';
import Slider from './screens/Slider/Slider';

const Stack = createNativeStackNavigator();

export default function App() {
  const [exist, setexist] = useState(false); // если юзер уже ввел данные раньше, то перенаправляет сразу на главный экран приложения
  // все роуты стоят по порядку их повяления
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={exist ? 'Main' : 'SetLanguage'} screenOptions={{headerShown:false}}>
      <Stack.Screen name='SetLanguage' component={LanguageScreen}/>
      <Stack.Screen name='WelcomeScreens' component={UserData}/>
      <Stack.Screen name='Slider' component={Slider}/>
      <Stack.Screen name='Main' component={Home}/>
      <Stack.Screen name='FeedbackScreen' component={FeedbackScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
