import { View, Text } from "react-native";
import React from "react";

const IntervalInfo = () => {
  return (
  <View className="border-b border-[#DADADA]">
        <Text style={{fontFamily:'geometria-regullar'}} className="text-[#77787B] text-xs">Интервал катетеризации:</Text>
        <View className="mt-[17px] mb-[15px]  flex-row justify-between items-center">
          <View className="text-[#101010]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg mb-[5px]">Нелатон</Text>
            <Text style={{fontFamily:'geometria-regullar'}} className="text-xs">каждые 4 часов</Text>
          </View>
          <View>
            <Text style={{fontFamily:'geometria-bold'}} className="bg-[#4babc528] px-[10px] py-[6px] rounded-[89px] text-[#4BAAC5]">остаток 180 шт</Text>
          </View>
        </View>
  </View>
  );
};

export default IntervalInfo;
