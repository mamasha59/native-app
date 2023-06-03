import { View, Text, ScrollView } from "react-native";
import MainLayout from "../../components/MainLayout/MainLayout";

import Selects from "./Selects/Selects";
import UserInfo from "./UserInfo/UserInfo";

const ProfileScreen = ({  }) => {

  return (
    <MainLayout title="Профиль">
          <View className="flex-row justify-between items-center mb-[15px]">
              <Text className="text-[#101010] font-normal text-xs leading-[14px]">Основные данные</Text>
              <Text className="text-[#4BAAC5] font-normal text-xs leading-[14px] opacity-50">Изменить</Text>
          </View>
          <UserInfo/>
          <Selects/>
    </MainLayout>
  );
};

export default ProfileScreen;
