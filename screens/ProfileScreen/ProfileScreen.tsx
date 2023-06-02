import { View, Text, ScrollView } from "react-native";
import MainLayout from "../../components/MainLayout/MainLayout";

import Selects from "./Selects/Selects";
import UserInfo from "./UserInfo/UserInfo";

const ProfileScreen = ({  }) => {

  return (
    <MainLayout>
      <View className="px-6">
          <Text className=" text-[#101010] font-bold text-[22px] leading-[26px] pb-5">Профиль</Text>
          <View className="flex-row justify-between items-center mb-[15px]">
              <Text className="text-[#101010] font-normal text-xs leading-[14px]">Основные данные</Text>
              <Text className="text-[#4BAAC5] font-normal text-xs leading-[14px] opacity-50">Изменить</Text>
          </View>
          <UserInfo/>
          <Selects/>
      </View>
    </MainLayout>
  );
};

export default ProfileScreen;
