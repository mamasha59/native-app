import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";

import NoticeAccessHomeScreen from "./NoticeAccessHomeScreen/NoticeAccessHomeScreen";
import TypeOfSignalScreen from "./TypeOfSignalSreen/TypeOfSignalScreen";
import TextOfNotice from "./TextOfNotice/TextOfNotice";
import Confirmation from "./Confirmation/Confirmation";

export type NoticeAndAccessScreens = {
  NoticeAccessHomeScreen: undefined;
  TypeOfSignalScreen: undefined;
  TextOfNotice: undefined;
  Confirmation: undefined;
  }
  
  // Определение типов для navigation и route в каждом экране если они идут через пропс
  export type NavigationPropsNoticeAndAccess<RouteName extends keyof NoticeAndAccessScreens> = {
    navigation: StackNavigationProp<NoticeAndAccessScreens, RouteName>;
    route: RouteProp<NoticeAndAccessScreens, RouteName>;
  };
  //типизация useNavigation если не идет через пропс
  export type StackNavigation = StackNavigationProp<NoticeAndAccessScreens>;

  const Stack = createStackNavigator<NoticeAndAccessScreens>();
  
  export default function NoticeNavigationScreen() {

    return (
      <Stack.Navigator initialRouteName='NoticeAccessHomeScreen' screenOptions={{headerShown:false, presentation:'modal'}}>
        <Stack.Screen name='NoticeAccessHomeScreen'component={NoticeAccessHomeScreen}/>

        <Stack.Screen name='TypeOfSignalScreen'component={TypeOfSignalScreen}/>

        <Stack.Screen name='TextOfNotice'component={TextOfNotice}/>

        <Stack.Screen name='Confirmation'component={Confirmation}/>
        {/* TODO сделать экраны - Доступ и Пропуск */}
      </Stack.Navigator>
    )
}