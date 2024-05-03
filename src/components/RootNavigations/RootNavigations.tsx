import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../screens/Home';
import UserData from '../../screens/UserData/UserData';
import { useAppSelector } from '../../store/hooks';
import RecomendationsStack from '../../screens/RecomendationsStack/RecomendationsStack';

  export type RootStacNativeParamList = {
    WelcomeScreens: undefined;
    MainScreen: undefined;
    Recomendation: undefined;
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

  return (// все роуты стоят по порядку их повяления при загрузке приложения
    <NavigationContainer>
        <Stack.Navigator initialRouteName={userData ? 'MainScreen' : 'WelcomeScreens'} screenOptions={{headerShown:false}}>

            <Stack.Screen name='MainScreen'component={Home}/>
            <Stack.Screen name='Recomendation'component={RecomendationsStack}/>

            <Stack.Screen name='WelcomeScreens'component={UserData}/>
        
        </Stack.Navigator>

    </NavigationContainer>
  );
};

export default RootNavigations;
