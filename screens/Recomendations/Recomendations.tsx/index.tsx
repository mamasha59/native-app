import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import Recomendations from './Recomendations';
import FeedbackScreen from '../../FeedbackScreen/FeedbackScreen';
import { RouteProp } from '@react-navigation/native';
import NoticeAndAccess from '../../NoticeAccessScreens/NoticeMainScreen';

export type RootRecomendationsStack = { // экраны
  Recomendations: undefined;
  FeedBack: undefined;
  NoticeAndAccess: undefined;
}
// Определение типов для navigation и route в каждом экране
export type NavigationPropsRecomendations<RouteName extends keyof RootRecomendationsStack> = {
 navigation : NativeStackNavigationProp<RootRecomendationsStack, RouteName>
 route: RouteProp<RootRecomendationsStack, RouteName>
}

const Stack = createNativeStackNavigator<RootRecomendationsStack>();

const RecomendationsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Recomendations'>
      <Stack.Screen name="Recomendations" component={Recomendations} />
      <Stack.Screen name="FeedBack" component={FeedbackScreen} />
      <Stack.Screen name="NoticeAndAccess" component={NoticeAndAccess} />
    </Stack.Navigator>
  );
};

export default RecomendationsStack;
