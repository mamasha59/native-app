import { View, Text } from "react-native";
import React from "react";

const IntervalInfo = () => {
  return (
  <View className="border-b border-[#DADADA]">
    <View className="px-6">
        <Text className="text-[#77787B] text-xs">Интервал катетеризации:</Text>
        <View className="mt-[17px] mb-[15px]  flex-row justify-between items-center">
          <View className="text-[#101010]">
            <Text className="text-lg font-bold mb-[5px]">Нелатон</Text>
            <Text className="text-xs font-normal">каждые 4 часов</Text>
          </View>
          <View>
            <Text className="bg-[#4babc528] px-[10px] py-[6px] rounded-[89px] text-[#4BAAC5] font-bold">остаток 180 шт</Text>
          </View>
        </View>
    </View>
  </View>
  );
};

export default IntervalInfo;