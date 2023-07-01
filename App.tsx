import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text} from 'react-native'
import Home from './screens/Home';
import UserData from './screens/UserData/UserData'; ///
import NoticeNavigationScreen from './screens/NoticeAccessScreens/NoticeNavigationScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type RootStacNativeParamList = {
  WelcomeScreens: undefined;
  MainScreen: undefined;
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
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={exist ? 'MainScreen' : 'WelcomeScreens'} screenOptions={{headerShown:false}}>

              <Stack.Screen name='MainScreen'component={Home}/>
              <Stack.Screen name='WelcomeScreens'component={UserData}/>
              <Stack.Screen name='NoticeAccessScreens'component={NoticeNavigationScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}
