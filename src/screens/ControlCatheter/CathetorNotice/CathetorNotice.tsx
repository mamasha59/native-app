import { View, Text } from "react-native";
import React from "react";

const CathetorNotice = () => {
  return (
    <>
        <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px] mb-[10px]">Уведомления</Text>
        <View className="border border-border-color p-4 flex-1 rounded-xl">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">При остатке менее чем на 7 дней</Text>
        </View>      
    </>
  );
};

export default CathetorNotice;
