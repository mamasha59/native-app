import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import Home from '../../screens/Home';
import UserData from '../../screens/UserData/UserData';
import { useAppSelector } from '../../store/hooks';
import RecomendationsStack from '../../screens/RecomendationsStack/RecomendationsStack';
import PdfOnBoarding from '../../screens/PdfOnBoarding/PdfOnBoarding';
import Survey from '../../screens/Survey/Survey';
import NightMode from '../../screens/NightMode/NightMode';
import ControlСatheter from '../../screens/ControlCatheter/ControlСatheter';
import { useEffect } from 'react';

  export type RootStacNativeParamList = {
    WelcomeScreens: undefined;
    MainScreen: undefined;
    Recomendation: undefined;
    PdfOnBoarding: undefined;
    Survey: {cameFrom?: string};
    NightMode: undefined;
    ControlCatheter: undefined;
  };
  
  //типизация useNavigation если не идет через пропс
  export type StackNavigationRoot = StackNavigationProp<RootStacNativeParamList>;
  
  // Определение типов для navigation и route в каждом экране
  export type NavigationPropsRoot<RouteName extends keyof RootStacNativeParamList> = {
    navigation: StackNavigationProp<RootStacNativeParamList, RouteName>;
    route: RouteProp<RootStacNativeParamList, RouteName>;
  };

  const Stack = createNativeStackNavigator<RootStacNativeParamList>();

const RootNavigations = () => {
  const userData = useAppSelector(isExist => isExist.appStateSlice.isExist);
  const settings = useAppSelector(isExist => isExist.timerStates);

  async function schedulePushNotification(title:string,body:string, time:number) { // уведомления
    await Notifications.scheduleNotificationAsync({
      identifier: 'welcome',
      content: {
        priority: 'HIGH',
        title: title,
        body: body,
        subtitle:'Мы контролируем твою катетеризацию',
        data: {data: new Date()},
        categoryIdentifier: "welcome",
        color: "blue",
        sound: "default",
        vibrate: [0, 255, 255, 255],
      },
      trigger: {seconds: 1} ,
    });
  }

  // useEffect(() => {
  //  const timeWhenShowNoticeOfYellowInterval = settings.interval - (settings.yellowInterval * 60);
  //  console.log('dd',timeWhenShowNoticeOfYellowInterval);
   
  //  schedulePushNotification(`До катетеризации осталось ${settings.yellowInterval} минут`, 'дада', timeWhenShowNoticeOfYellowInterval);
  // },[settings.interval,settings.yellowInterval])

  return (// все роуты стоят по порядку их повяления при загрузке приложения
    <NavigationContainer>
        <Stack.Navigator initialRouteName={userData ? 'MainScreen' : 'WelcomeScreens'} screenOptions={{headerShown:false}}>

            <Stack.Screen name='MainScreen' component={Home}/>
            <Stack.Screen name='WelcomeScreens' component={UserData}/>

            <Stack.Screen name='Recomendation' component={RecomendationsStack}/>

            <Stack.Screen name='PdfOnBoarding' component={PdfOnBoarding}/>
            <Stack.Screen name='Survey' component={Survey}/>
            <Stack.Screen name='NightMode' component={NightMode}/>
            <Stack.Screen name='ControlCatheter' component={ControlСatheter}/>
        
        </Stack.Navigator>

    </NavigationContainer>
  );
};

export default RootNavigations;
