import { View, Text } from "react-native";

const JournalRecord = () => {
  return (
    <View  className="flex-row justify-between items-center border px-[15px] py-[10px] mb-3 rounded-md border-[#4babc563]">
        <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Время</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">21:54</Text>
        </View>
        <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Катетеризация:</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">Фолея</Text>
        </View>
        <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Выпито жид.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">200 мл.</Text>
        </View>
        <View className="gap-1 p-2">
            <View className="bg-main-blue w-[4px] h-[4px] rounded-full"></View>
            <View className="bg-main-blue w-[4px] h-[4px] rounded-full"></View>
        </View>
    </View>
  );
};

export default JournalRecord;
