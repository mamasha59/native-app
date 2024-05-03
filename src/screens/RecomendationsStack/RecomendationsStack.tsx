import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import RecomendationsScreen from './RecomendationsScreen/RecomendationsScreen';
import FeedbackScreen from './FeedbackScreen/FeedbackScreen';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootRecomendationsStack = { // экраны
  RecomendationsScreen: undefined;
  FeedBackScreen: undefined;
}
// Определение типов для navigation и route в каждом экране
export type NavigationPropsRecomendations<RouteName extends keyof RootRecomendationsStack> = {
 navigation : NativeStackNavigationProp<RootRecomendationsStack, RouteName>
 route: RouteProp<RootRecomendationsStack, RouteName>
}

export type NavigationPropsRecomendationsStack = StackNavigationProp<RootRecomendationsStack>; // типизация для хука useNavigation

const Stack = createNativeStackNavigator<RootRecomendationsStack>();

const RecomendationsStack = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='RecomendationsScreen'>
      <Stack.Screen name="RecomendationsScreen" component={RecomendationsScreen} />
      <Stack.Screen name="FeedBackScreen" component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

export default RecomendationsStack;
