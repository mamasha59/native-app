import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import Selects from "./Selects/Selects";
import UserInfo from "./UserInfo/UserInfo";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const removeProfile = async () => {
    try {
      await AsyncStorage.removeItem('my-key');
    } catch(e) {
      // remove error
    }
  }
  return (
    <MainLayout title="Профиль">
      <View className="flex-row justify-between items-center mb-[15px]">
          <Text style={{fontFamily:'geometria-regular'}} className="text-[#101010] text-xs leading-[14px]">Основные данные</Text>
          <Text style={{fontFamily:'geometria-regular'}} className="text-main-blue text-xs leading-[14px] opacity-50">Изменить</Text>
      </View>
      <ScrollView>
        <UserInfo/>
        <Selects/>
        <TouchableOpacity onPressOut={removeProfile} className="py-4">
          <Text style={{fontFamily:'geometria-bold'}} className="opacity-70 text-error">Сбросить профиль</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
