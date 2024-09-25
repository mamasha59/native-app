import { useEffect, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import Home from '../../screens/Home';
import UserData from '../../screens/UserData/UserData';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import RecomendationsStack from '../../screens/RecomendationsStack/RecomendationsStack';
import PdfOnBoarding from '../../screens/PdfOnBoarding/PdfOnBoarding';
import Survey from '../../screens/Survey/Survey';
import NightMode from '../../screens/NightMode/NightMode';
import ControlCatheter from '../../screens/ControlCatheter/ControlСatheter';
import { popupLiquidState } from '../../store/slices/appStateSlicer';

  export type RootStackNativeParamList = {
    UserDataScreens: undefined;
    HomeScreen: undefined;
    Recommendation: undefined;
    PdfOnBoarding: {cameFrom?: string};
    Survey: {cameFrom?: string};
    NightMode: undefined;
    ControlCatheter: undefined;
  };
  
  //типизация useNavigation если не идет через пропс
  export type StackNavigationRoot = StackNavigationProp<RootStackNativeParamList>;
  
  // Определение типов для navigation и route в каждом экране
  export type NavigationPropsRoot<RouteName extends keyof RootStackNativeParamList> = {
    navigation: StackNavigationProp<RootStackNativeParamList, RouteName>;
    route: RouteProp<RootStackNativeParamList, RouteName>;
  };

  const Stack = createNativeStackNavigator<RootStackNativeParamList>();

  const RootNavigations = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(isExist => isExist.appStateSlice.isExist);

  const navigation = useNavigation<StackNavigationRoot>()
  
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // ниже метод выполняется когда пришло уведомление
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    });
    // ниже метод, при клике на уведомление, когда пользователь взаимодействует с уведомлением
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response.notification.request.content.data);
      
      if(response.notification.request.content.data.title === 'timer'){
        navigation.navigate('HomeScreen');
      }else if(response.notification.request.content.data.title === 'drink-water'){
        dispatch(popupLiquidState(true));
      }
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

  return (// все роуты стоят по порядку их появления при загрузке приложения
    <Stack.Navigator initialRouteName={userData ? 'HomeScreen' : 'UserDataScreens'} screenOptions={{headerShown:false}}>

      <Stack.Screen name='HomeScreen' component={Home}/>
      <Stack.Screen name='UserDataScreens' component={UserData}/>

      <Stack.Screen name='Recommendation' component={RecomendationsStack}/>

      <Stack.Screen name='PdfOnBoarding' component={PdfOnBoarding}/>
      <Stack.Screen name='Survey' component={Survey}/>
      <Stack.Screen name='NightMode' component={NightMode}/>
      <Stack.Screen name='ControlCatheter' component={ControlCatheter}/>
    
    </Stack.Navigator>
  );
};

export default RootNavigations;