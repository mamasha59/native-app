import { View, Text } from "react-native";
import React from "react";
import ControllCatetor from "../../../assets/images/iconsComponent/TabMenuIcons/ControllCatetor";

const RestOf = () => {
  return (
    <View className="mb-5">
      <View className="mb-[10px]">
          <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-grey">Текущий остаток</Text>
      </View>
      <View className="flex-row gap-2">
          <View className="bg-main-blue flex-1 rounded-xl p-[15px] relative">
              <Text style={{ fontFamily: "geometria-regular" }} className="text-xs leading-[14px] text-[#ffff]">Нелатон</Text>
              <Text style={{ fontFamily: "geometria-bold" }} className="text-lg leading-[22px] text-[#ffff] my-[10px]">10шт.</Text>
              <Text style={{ fontFamily: "geometria-regular" }} className="text-[8px] leading-[10px] text-[#ffff]">Через 3 дня останется 0шт.</Text>
              <View className="border border-[#ffff] absolute right-[15px] top-[15px] rounded-full p-2">
              <ControllCatetor width={25} color={'#ffff'}/>
              </View>
          </View>
          <View className="bg-purple-button flex-1 rounded-xl p-[15px] relative">
              <Text style={{ fontFamily: "geometria-regular" }} className="text-xs leading-[14px] text-[#ffff]">Фолея</Text>
              <Text style={{ fontFamily: "geometria-bold" }} className="text-lg leading-[22px] text-[#ffff] my-[10px]">10шт.</Text>
              <Text style={{ fontFamily: "geometria-regular" }} className="text-[8px] leading-[10px] text-[#ffff]">Через 3 дня останется 0шт.</Text>
              <View className="border border-[#ffff] absolute right-[15px] top-[15px] rounded-full p-2">
              <ControllCatetor width={25} color={'#ffff'}/>
              </View>
          </View>
      </View>
    </View>
  );
};

export default RestOf;
