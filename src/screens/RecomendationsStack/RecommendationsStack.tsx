import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import RecommendationsScreen from './RecomendationsScreen/RecommendationsScreen';
import FeedbackScreen from './FeedbackScreen/FeedbackScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNativeParamList } from '../../components/RootNavigations/RootNavigations';

export type RootRecommendationsStack = { // экраны
  RecommendationsScreen: undefined;
  FeedBackScreen: undefined;
}
// Определение типов для navigation и route в каждом экране
export type NavigationPropsRecommendations<RouteName extends keyof RootRecommendationsStack> = {
 navigation : CompositeNavigationProp<
  NativeStackNavigationProp<RootRecommendationsStack, RouteName>,
  NativeStackNavigationProp<RootStackNativeParamList>
 >
 route: RouteProp<RootRecommendationsStack, RouteName>
}

export type NavigationPropsRecommendationsStack = StackNavigationProp<RootRecommendationsStack>; // типизация для хука useNavigation

const Stack = createNativeStackNavigator<RootRecommendationsStack>();

const RecommendationsStack = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown:false, animation: 'fade_from_bottom'}} initialRouteName='RecommendationsScreen'>
      <Stack.Screen name="RecommendationsScreen" component={RecommendationsScreen} />
      <Stack.Screen name="FeedBackScreen" component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

export default RecommendationsStack;
