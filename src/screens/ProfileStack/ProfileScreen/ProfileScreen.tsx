import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

import UserInfo from "./UserInfo/UserInfo";
import MainLayout from '../../../Layouts/MainLayout/MainLayout';
import { persistor } from "../../../store/store";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import NameSurnameBirthday from "./NameSurnameBirthday/NameSurnameBirthday";
import { NavigationPropsProfileStack } from "..";

interface iProfileScreen extends NavigationPropsProfileStack<'ProfileScreen'>{}

const ProfileScreen = ({navigation}:iProfileScreen) => {

  const removeProfile = async () => { // удаление инфы из локал стореджа, временно для разработки
    Alert.alert('Закройте приложение, и откройте снова')
    persistor.purge();
  }

  const handleButtonChangeProfile = () => {
    navigation.navigate('ChangeProfileScreen');
  }

  return (
    <MainLayout title="Профиль">
      <View className="flex-row justify-between items-center mb-[15px]">
          <Text style={{fontFamily:'geometria-regular'}} className="text-[#101010] text-xs leading-[14px]">Основные данные</Text>
          <TouchableOpacity activeOpacity={.5} onPress={handleButtonChangeProfile}>
            <Text style={{fontFamily:'geometria-regular'}} className="text-main-blue text-xs leading-[14px] opacity-50">Изменить</Text>
          </TouchableOpacity>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <UserInfo/>
        <ProfileSettings/>
        <NameSurnameBirthday/>

        <TouchableOpacity onPressOut={removeProfile} className="py-4 mt-3">
          <Text style={{fontFamily:'geometria-bold'}} className="opacity-70 text-error">Сбросить профиль</Text>
        </TouchableOpacity>

      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
