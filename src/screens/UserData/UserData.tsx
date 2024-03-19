import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";

import FirstDataScreen from "./FirstDataScreen/FirstDataScreen";
import SecondDataScreen from "./SecondDataScreen/SecondDataScreen";
import ThirdDataScreen from "./ThirdDataScreen/ThirdDataScreen";

import FirstOptionalScreen from "./OptionalScreens/FirstOptionalScreen/FirstOptionalScreen";
import SecondOptionalScreen from "./OptionalScreens/SecondOptionalScreen/SecondOptionalScreen";
import ThirdOptionalScreen from "./OptionalScreens/ThirdOptionalScreen/ThirdOptionalScreen";

import LanguageScreen from "../LanguageScreen/LanguageScreen";
import Slider from "../Slider/Slider";
import { RootStacNativeParamList } from "../../components/Navigations/Navigation";

export type RootStackParamList = {
  FirstDataScreen: { cameFrom?: string };
  SecondDataScreen: any;
  ThirdDataScreen: undefined;
  FirstOptionalScreen: undefined;
  SecondOptionalScreen: undefined;
  ThirdOptionalScreen: undefined;
  LanguageScreen: undefined;
  SliderScreen: undefined;
};

// Определение типов для navigation и route в каждом экране
export type NavigationPropsWelcome<RouteName extends keyof RootStackParamList> = {
  navigation: CompositeNavigationProp<                    // объединяем роуты для типизации, чтобы с последней страницы перенаправить юзера на стек других экранов
    StackNavigationProp<RootStackParamList, RouteName>, // тут роуты UserData
    StackNavigationProp<RootStacNativeParamList> // тут роуты App 
  > 
  route: RouteProp<RootStackParamList, RouteName>;
};

const Stack = createStackNavigator<RootStackParamList>();

const UserData = () => {
// компонент который содержит все начальные страницы где нужно вводить данные юзера, расставлены по порядку появления 
  return (
    <Stack.Navigator initialRouteName="LanguageScreen" screenOptions={{headerShown:false}}>
        <Stack.Screen name="LanguageScreen" component={LanguageScreen}/>

        <Stack.Screen name='SliderScreen'component={Slider}/>

        {/* <Stack.Screen name="FirstDataScreen" component={FirstDataScreen}/> */}
        <Stack.Screen name="SecondDataScreen" component={SecondDataScreen}/>
        <Stack.Screen name="ThirdDataScreen" component={ThirdDataScreen}/>

        <Stack.Screen name="FirstOptionalScreen" component={FirstOptionalScreen}/>
        <Stack.Screen name="SecondOptionalScreen" component={SecondOptionalScreen}/>
        <Stack.Screen name="ThirdOptionalScreen" component={ThirdOptionalScreen}/>

    </Stack.Navigator>
  );
};

export default UserData;
