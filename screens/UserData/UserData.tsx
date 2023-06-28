import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";

import FirstDataScreen from "./FirstScreen/FirstDataScreen";
import SecondDataScreen from "./SecondScreen/SecondDataScreen";
import ThirdDataScreen from "./ThirdScreen/ThirdScreen";
import FirstOptionalScreen from "./OptionalScreens/FirstOptionalScreen/FirstOptionalScreen";
import SecondOptionalScreen from "./OptionalScreens/SecondOptionalScreen/SecondOptionalScreen";
import ThirdOptionalScreen from "./OptionalScreens/ThirdOptionalScreen/ThirdOptionalScreen";
import { RootStacNativeParamList } from "../../App";

export type RootStackParamList = {
  FirstDataScreen: undefined;
  SecondDataScreen: undefined;
  ThirdDataScreen: undefined;
  FirstOptionalScreen: undefined;
  SecondOptionalScreen: undefined;
  ThirdOptionalScreen: undefined;
};

// Определение типов для navigation и route в каждом экране
export type NavigationPropsWelcome<RouteName extends keyof RootStackParamList> = {
  navigation: CompositeNavigationProp<  // объединяем роуты для типизации, чтобы с последней страницы перенаправить юзера на стек других экранов
    StackNavigationProp<RootStackParamList, RouteName>, // тут роуты UserData
    StackNavigationProp<RootStacNativeParamList> // тут роуты App 
  > 
  route: RouteProp<RootStackParamList, RouteName>;
};

const Stack = createStackNavigator<RootStackParamList>();

const UserData = () => {
// компонент который содержит все начальные страницы где нужно вводить данные юзера
  return (
    <Stack.Navigator initialRouteName="FirstDataScreen" screenOptions={{headerShown:false}}>
        <Stack.Screen name="FirstDataScreen" component={FirstDataScreen}/>
        <Stack.Screen name="SecondDataScreen" component={SecondDataScreen}/>
        <Stack.Screen name="ThirdDataScreen" component={ThirdDataScreen}/>

        <Stack.Screen name="FirstOptionalScreen" component={FirstOptionalScreen}/>
        <Stack.Screen name="SecondOptionalScreen" component={SecondOptionalScreen}/>
        <Stack.Screen name="ThirdOptionalScreen" component={ThirdOptionalScreen}/>
    </Stack.Navigator>
  );
};

export default UserData;
