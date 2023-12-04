import { View, Text } from "react-native";

const JournalRecord = () => {
  return (
    <View  className="flex-row justify-between items-center border px-[15px] py-[10px] mb-3 rounded-md border-border-color">
        <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-black">Время</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-black">21:54</Text>
        </View>
        <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-black">Катетеризация:</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-black">Фолея</Text>
        </View>
        <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-black">Выпито жид.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-black">200 мл.</Text>
        </View>
        <View className="gap-1 p-2">
            <View className="bg-main-blue w-[4px] h-[4px] rounded-full"></View>
            <View className="bg-main-blue w-[4px] h-[4px] rounded-full"></View>
        </View>
    </View>
  );
};

export default JournalRecord;
