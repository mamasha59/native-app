import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../store/hooks';

import NoticeNavigationScreen from './NoticeAccessScreens/NoticeNavigationScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import JournalScreen from './JournalScreen/JournalScreen';

import JournalIcon from '../assets/images/iconsComponent/TabMenuIcons/JournalIcon';
import HomeIcon from '../assets/images/iconsComponent/TabMenuIcons/HomeIcon';
import ControllCatetor from '../assets/images/iconsComponent/TabMenuIcons/NelatonIcon';
import ProfileIcon from '../assets/images/iconsComponent/TabMenuIcons/ProfileIcon';
import NotificationIcon from '../assets/images/iconsComponent/TabMenuIcons/NotificationIcon';
import WaterBalance from './WaterBalance/WaterBalance';
import ProfileScreen from './ProfileStack/ProfileScreen/ProfileScreen';
import Loader from '../components/Loader/Loader';

export type RootStackParamList = {
  ProfileScreen: undefined;
  WaterBalance: undefined;
  Home: undefined;
  JournalScreen: undefined;
  NoticeNavigationScreen: undefined;
};

// Определение типов для navigation и route в каждом экране
export type NavigationPropsHome<RouteName extends keyof RootStackParamList> = {
  navigation: BottomTabNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Home() {
  const {t, i18n} = useTranslation();

  const badges = useAppSelector((state) => state.appStateSlice.tabBarBadgeJournalScreen);
  const language = useAppSelector((state) => state.appStateSlice.setLanguage);
  const loaderState = useAppSelector((state) => state.appStateSlice.loader);
  
  if(loaderState) return <Loader/>
  
  useEffect(() => {
    if(language.id)
    i18n.changeLanguage(language.id);
  },[i18n.language]);

  return (
    <Tab.Navigator
      initialRouteName='Home'
      backBehavior='history' 
      safeAreaInsets={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
      screenOptions = {{
        headerShown:false,
        tabBarItemStyle: { // стили самой кнопки перехода по страницам(дом, профиль и тд.)
          // borderRadius: 100,
          marginVertical: 10,
          marginHorizontal: 0,
          // backgroundColor: "#000"
        },
        tabBarStyle: { // cтили самого меню
          height: 70,
          paddingHorizontal: 15,
        },
        tabBarShowLabel: true,
        tabBarButton: (props) => <TouchableOpacity activeOpacity={.6} {...props} />,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Group >
      <Tab.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          tabBarLabel:t("tabBar.profile"),
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon width={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name='WaterBalance'
        component={WaterBalance}
        options={{
          tabBarLabel:t("tabBar.water_balance"),
          tabBarIcon: ({ color, size }) => (
            <ControllCatetor width={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel:t("tabBar.home"),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name='JournalScreen'
        component={JournalScreen}
        options={{
          tabBarLabel:t("tabBar.journal"),
          tabBarIcon: ({ color, size }) => (
            <JournalIcon width={size} color={color}/>
          ),
        tabBarBadge: badges > 0 ? badges : undefined,
        }}
      />
      <Tab.Screen
        name='NoticeNavigationScreen'
        component={NoticeNavigationScreen}
        options={{
          tabBarLabel:t("tabBar.notice"),
          tabBarIcon: ({ color, size }) => (
            <NotificationIcon color={color} width={size}/>
          ),
        }}
      />
      </Tab.Group>
    </Tab.Navigator>
  );
}
