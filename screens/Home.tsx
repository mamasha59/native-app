import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen/HomeScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import ControlCatetor from './ControlCatetor/ControlCatetor';
import JournalScreen from './JournalScreen/JournalScreen';
import RecomendationIcon from '../assets/images/iconsComponent/RecomendationIcon';
import JournalIcon from '../assets/images/iconsComponent/JournalIcon';
import HomeIcon from '../assets/images/iconsComponent/HomeIcon';
import ControllCatetor from '../assets/images/iconsComponent/ControllCatetor';
import ProfileIcon from '../assets/images/iconsComponent/ProfileIcon';
import RecomendationsStack from './Recomendations/Recomendations.tsx';


export type RootStackParamList = {
  Profile: undefined;
  ControlCatetor: undefined;
  Home: undefined;
  JournalScreen: undefined;
  RecomendationsStack: undefined;
};

// Определение типов для navigation и route в каждом экране
export type NavigationPropsHome<RouteName extends keyof RootStackParamList> = {
  navigation: BottomTabNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();
export default function Home() {

  return (
    <Tab.Navigator
      initialRouteName='Home'
      backBehavior='history'
      screenOptions = {{
        headerShown:false, 
        tabBarActiveBackgroundColor:'#4BAAC5',  // цвет кнопки когда мы на странице
        tabBarActiveTintColor: '#ffffff', // цвет иконки когда активна color
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
      <Tab.Group >
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon width={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name='ControlCatetor'
        component={ControlCatetor}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ControllCatetor width={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name='JournalScreen'
        component={JournalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <JournalIcon width={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name='RecomendationsStack'
        component={RecomendationsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <RecomendationIcon width={size} color={color}/>
          ),
        }}
      />
      </Tab.Group>

        {/* <Tab.Screen
          name='NoticeAccessScreens'
          component={NoticeNavigationScreen}
          options={{tabBarStyle:{display:'none'}, tabBarBadgeStyle:{display:'none'}}}
        /> */}
            {/* <Stack.Navigator screenOptions={{headerShown:false}}>
              <Stack.Screen name='NoticeAccessScreens'component={NoticeNavigationScreen}/>
            </Stack.Navigator> */}
    </Tab.Navigator>
  );
}
