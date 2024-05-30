import { View, Text } from "react-native";

const СatheterСonsumption = () => {
  return (
    <View className="my-5">
        <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px] mb-[10px]">Средний расход катетеров Нелатон</Text>
        <View className="flex-row gap-2">
            <View className="border border-border-color p-4 flex-1 rounded-xl">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">6 катететоров в день</Text>
            </View>
            <View className="border border-border-color p-4 flex-1 rounded-xl">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">6 катететоров в день</Text>
            </View>
        </View>
    </View>
  );
};

export default СatheterСonsumption;
