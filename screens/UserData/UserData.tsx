import { createStackNavigator } from "@react-navigation/stack";
import FirstDataScreen from "./FirstScreen/FirstDataScreen";
import SecondDataScreen from "./SecondScreen/SecondDataScreen";
import ThirdDataScreen from "./ThirdScreen/ThirdScreen";
import FirstOptionalScreen from "./OptionalScreens/FirstOptionalScreen/FirstOptionalScreen";
import SecondOptionalScreen from "./OptionalScreens/SecondOptionalScreen/SecondOptionalScreen";
import ThirdOptionalScreen from "./OptionalScreens/ThirdOptionalScreen/ThirdOptionalScreen";

const Stack = createStackNavigator();

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
