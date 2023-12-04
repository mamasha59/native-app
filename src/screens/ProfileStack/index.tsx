import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './ProfileScreen/ProfileScreen';
import ChangeProfileScreen from './ChangeProfileScreen/ChangeProfileScreen';

export type RootProfileStack = { // экраны
  ProfileScreen: undefined;
  ChangeProfileScreen: undefined;
}
// Определение типов для navigation и route в каждом экране
export type NavigationPropsProfileStack<RouteName extends keyof RootProfileStack> = {
 navigation : NativeStackNavigationProp<RootProfileStack, RouteName>
 route: RouteProp<RootProfileStack, RouteName>
}

const Stack = createStackNavigator<RootProfileStack>();

const RecomendationsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='ProfileScreen'>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChangeProfileScreen" component={ChangeProfileScreen} />
    </Stack.Navigator>
  );
};

export default RecomendationsStack;
