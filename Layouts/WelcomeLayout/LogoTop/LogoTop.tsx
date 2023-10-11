import { View, Text } from "react-native";
import React from "react";

const LogoTop = () => {
  return (
    <View className="items-center">
        <Text style={{fontFamily:'geometria-bold'}} className="w-full text-center text-[40px] leading-[48px] text-[#FFFFFF] my-[50px]">
            Uro<Text className="italic">Control</Text>
        </Text>
    </View>
  );
};

export default LogoTop;
