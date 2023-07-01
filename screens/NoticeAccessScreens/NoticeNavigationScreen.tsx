import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import NoticeAccessHomeScreen from "./NoticeAccessHomeScreen/NoticeAccessHomeScreen";

export type NoticeAndAccessScreens = {
  NoticeAccessHomeScreen: undefined;
  }
  
  // Определение типов для navigation и route в каждом экране
  export type NavigationPropsNoticeAndAccess<RouteName extends keyof NoticeAndAccessScreens> = {
    navigation: StackNavigationProp<NoticeAndAccessScreens, RouteName>;
    route: RouteProp<NoticeAndAccessScreens, RouteName>;
  };
  
  const Stack = createStackNavigator<NoticeAndAccessScreens>();
  
  export default function NoticeNavigationScreen() {

    return (
      <Stack.Navigator initialRouteName='NoticeAccessHomeScreen' screenOptions={{headerShown:false, presentation:'modal'}}>
        <Stack.Screen name='NoticeAccessHomeScreen'component={NoticeAccessHomeScreen}/>
      </Stack.Navigator>
    )
}