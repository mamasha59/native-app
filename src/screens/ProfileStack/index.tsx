import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './ProfileScreen/ProfileScreen';
import { RootStacNativeParamList } from '../../components/RootNavigations/RootNavigations';

export type RootProfileStack = { // экраны
  ProfileScreen: undefined;
}
// Определение типов для navigation и route в каждом экране
export type NavigationPropsProfileStack<RouteName extends keyof RootProfileStack> = {
//  navigation : NativeStackNavigationProp<RootProfileStack, RouteName>
 navigation: CompositeNavigationProp<
  StackNavigationProp<RootProfileStack, RouteName>,
  StackNavigationProp<RootStacNativeParamList>
 >
 route?: RouteProp<RootProfileStack, RouteName>
}

const Stack = createStackNavigator<RootProfileStack>();

const ProfileScreenStack = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='ProfileScreen'>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreenStack;
