import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Selects from "./Selects/Selects";
import UserInfo from "./UserInfo/UserInfo";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import NameSurnameBirthday from "./NameSurnameBirthday/NameSurnameBirthday";

const ProfileScreen = () => {
  const removeProfile = async () => { // удаление инфы из локал стореджа, временно для разработки
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
        <NameSurnameBirthday/>

        <TouchableOpacity onPressOut={removeProfile} className="py-4 mt-3">
          <Text style={{fontFamily:'geometria-bold'}} className="opacity-70 text-error">Сбросить профиль</Text>
        </TouchableOpacity>

      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
