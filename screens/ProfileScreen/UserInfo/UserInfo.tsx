import { View, Text } from "react-native";
import { useAppSelector } from "../../../store/hooks";

const UserInfo = () => {
  const user = useAppSelector(state => state.user);
  return (
    <View className="flex-row flex-wrap gap-[10px] mb-5">
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">{user.sex || 'Заполните профиль'}</Text>
      <Text className="text-grey text-xs leading-[14px]">пол</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">{user.age || 'Заполните профиль'}</Text>
      <Text className="text-grey text-xs leading-[14px]">возраст</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[300px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">{user.volume || 'Заполните профиль'}</Text>
      <Text className="text-grey text-xs leading-[14px]">объем мочевого пузыря</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">{user.catetorType || 'Заполните профиль'}</Text>
      <Text className="text-grey text-xs leading-[14px]">тип катетера</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-main-blue text-lg leading-[21px] font-bold mb-[10px]">{user.catetorSize || 'Заполните профиль'}</Text>
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
