import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../screens/Home';
import UserData from '../../screens/UserData/UserData';
import NoticeNavigationScreen from '../../screens/NoticeAccessScreens/NoticeNavigationScreen';
import { useAppSelector } from '../../store/hooks';

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

const Navigation = () => {

    const userData = useAppSelector(isExist => isExist.appStateSlice.isExist);

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={userData ? 'MainScreen' : 'WelcomeScreens'} screenOptions={{headerShown:false}}>

            <Stack.Screen name='MainScreen'component={Home}/>
            <Stack.Screen name='NoticeAccessScreens'component={NoticeNavigationScreen}/>

            <Stack.Screen name='WelcomeScreens'component={UserData}/>
        
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
