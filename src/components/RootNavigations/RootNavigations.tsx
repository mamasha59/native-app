import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../../screens/Home';
import UserData from '../../screens/UserData/UserData';
import { useAppSelector } from '../../store/hooks';
import RecomendationsStack from '../../screens/RecomendationsStack/RecomendationsStack';
import PdfOnBoarding from '../../screens/PdfOnBoarding/PdfOnBoarding';
import Survey from '../../screens/Survey/Survey';
import NightMode from '../../screens/NightMode/NightMode';
import ControlCatheter from '../../screens/ControlCatheter/ControlСatheter';

  export type RootStacNativeParamList = {
    UserDataScreens: undefined;
    HomeScreen: undefined;
    Recommendation: undefined;
    PdfOnBoarding: {cameFrom?: string};
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

  return (// все роуты стоят по порядку их появления при загрузке приложения
    <NavigationContainer>
        <Stack.Navigator initialRouteName={userData ? 'HomeScreen' : 'UserDataScreens'} screenOptions={{headerShown:false}}>

          <Stack.Screen name='HomeScreen' component={Home}/>
          <Stack.Screen name='UserDataScreens' component={UserData}/>

          <Stack.Screen name='Recommendation' component={RecomendationsStack}/>

          <Stack.Screen name='PdfOnBoarding' component={PdfOnBoarding}/>
          <Stack.Screen name='Survey' component={Survey}/>
          <Stack.Screen name='NightMode' component={NightMode}/>
          <Stack.Screen name='ControlCatheter' component={ControlCatheter}/>
        
        </Stack.Navigator>

    </NavigationContainer>
  );
};

export default RootNavigations;
