import { View, Text } from "react-native";
import React from "react";
import InnerCircle from "../InnerCircle/InnerCircle";

const OutsideCircle = () => {
  return (
        <View className="justify-center items-center border-[#DADADA] border-[2px] border-solid rounded-full relative">
            
            <InnerCircle/>
        </View>
  );
};

export default OutsideCircle;
