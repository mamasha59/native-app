import { View, Text, ScrollView } from "react-native";

import Selects from "./Selects/Selects";
import UserInfo from "./UserInfo/UserInfo";
import MainLayout from '../../Layouts/MainLayout/MainLayout';

const ProfileScreen = ({  }) => {

  return (
    <MainLayout title="Профиль">
          <View className="flex-row justify-between items-center mb-[15px]">
              <Text className="text-[#101010] font-normal text-xs leading-[14px]">Основные данные</Text>
              <Text className="text-main-blue font-normal text-xs leading-[14px] opacity-50">Изменить</Text>
          </View>
          <ScrollView>
            <UserInfo/>
            <Selects/>
          </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
