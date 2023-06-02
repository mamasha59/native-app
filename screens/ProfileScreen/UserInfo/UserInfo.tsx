import { View, Text } from "react-native";

const UserInfo = () => {
  return (
    <View className="flex-row flex-wrap gap-[10px] mb-5">
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-[#4BAAC5] text-lg leading-[21px] font-bold mb-[10px]">Мужчина</Text>
      <Text className="text-[#77787B] text-xs leading-[14px]">пол</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-[#4BAAC5] text-lg leading-[21px] font-bold mb-[10px]">31 год</Text>
      <Text className="text-[#77787B] text-xs leading-[14px]">возраст</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[300px] w-full">
      <Text className="text-[#4BAAC5] text-lg leading-[21px] font-bold mb-[10px]">300 мл.</Text>
      <Text className="text-[#77787B] text-xs leading-[14px]">объем мочевого пузыря</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-[#4BAAC5] text-lg leading-[21px] font-bold mb-[10px]">Нелатон</Text>
      <Text className="text-[#77787B] text-xs leading-[14px]">тип катетера</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-[#4BAAC5] text-lg leading-[21px] font-bold mb-[10px]">Ch08</Text>
      <Text className="text-[#77787B] text-xs leading-[14px]">размер катетера</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-[#4BAAC5] text-lg leading-[21px] font-bold mb-[10px]">Фолея</Text>
      <Text className="text-[#77787B] text-xs leading-[14px]">тип катетера</Text>
    </View>
    <View className="border border-[#4babc557] rounded-xl p-[15px] max-w-[145px] w-full">
      <Text className="text-[#4BAAC5] text-lg leading-[21px] font-bold mb-[10px]">Ch08</Text>
      <Text className="text-[#77787B] text-xs leading-[14px]">размер катетера</Text>
    </View>
  </View>
  );
};

export default UserInfo;
