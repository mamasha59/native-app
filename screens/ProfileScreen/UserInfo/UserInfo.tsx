import { View, Text, ActivityIndicator } from "react-native";

import { useAppSelector } from "../../../store/hooks";
import useGetLocalStorage from "../../../hooks/useGetLocalStorage";

const UserInfo = () => {
  const user = useAppSelector(state => state.user);
  const {userData} = useGetLocalStorage();
  
  return (
    <View className="flex-row flex-wrap gap-[10px] mb-5">
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">
        {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                   : userData.sex || "Заполните профиль"}
      </Text>
      <Text className="text-grey text-xs leading-[14px]">пол</Text>
    </View>

    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">
      {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                 : userData.age || "Заполните профиль"}
      </Text>
      <Text className="text-grey text-xs leading-[14px]">возраст</Text>
    </View>

    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[300px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">
      {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                 : userData.volume || "Заполните профиль"}
      </Text>
      <Text className="text-grey text-xs leading-[14px]">объем мочевого пузыря</Text>
    </View>

    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">
      {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                 : userData.catheterType || "Заполните профиль"}
      </Text>
      <Text className="text-grey text-xs leading-[14px]">тип катетера</Text>
    </View>

    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">
      {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                 : userData.catheterSize || "Заполните профиль"}
      </Text>
      <Text className="text-grey text-xs leading-[14px]">размер катетера</Text>
    </View>

    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">Фолея</Text>
      <Text className="text-grey text-xs leading-[14px]">тип катетера</Text>
    </View>

    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">Ch08</Text>
      <Text className="text-grey text-xs leading-[14px]">размер катетера</Text>
    </View>

  </View>
  );
};

export default UserInfo;
