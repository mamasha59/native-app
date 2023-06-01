import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import ControlCatetor from './screens/ControlCatetor/ControlCatetor';
import JournalScreen from './screens/JournalScreen/JournalScreen';
import Recomendations from './screens/Recomendations/Recomendations.tsx/Recomendations';

const Tab = createBottomTabNavigator();

export default function App() {

  const [fontsLoader] = useFonts({
    'Geometria' : require('./assets/fonts/geometria_extrabold.otf'),
  })

  if (!fontsLoader) {
    return null;
  }

  return (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName='Home'
      backBehavior='history'
      screenOptions = {{
        headerShown:false, 
        tabBarActiveBackgroundColor:'#4BAAC5',  // цвет кнопки когда мы на странице
        tabBarActiveTintColor: '#ffffff', // цвет иконки когда активна
        tabBarItemStyle: { // стили самой кнопки перехода по страницам(дом, профиль и тд.)
          borderRadius: 100,
          marginVertical: 10,
          marginHorizontal: 13,
        },
        tabBarStyle: { // cтили самого меню
          height: 70,
          paddingHorizontal: 15,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name='ControlCatetor' component={ControlCatetor}/>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='JournalScreen'
        component={JournalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="notebook" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name='Recomendations' component={Recomendations}/>
    </Tab.Navigator>        
  </NavigationContainer>
  );
}
