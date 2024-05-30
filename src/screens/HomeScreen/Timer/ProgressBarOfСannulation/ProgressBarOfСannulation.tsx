import { View, Text } from "react-native";
import React from "react";

const ProgressBarOfСannulation = () => {
  return (
    <View className="my-2 h-5" style={{ width: '100%', flexDirection: 'row' }}>
        <View className="rounded-l-md bg-error items-center justify-center" style={{ flex: 8}}>
            <Text style={{ fontFamily: "geometria-regular"}} className="text-[#fff]">80%</Text>
        </View>
        <View className="rounded-r-md bg-main-blue items-center justify-center" style={{ flex: 2}}>
            <Text style={{ fontFamily: "geometria-regular"}} className="text-[#fff]">20%</Text>
        </View>
    </View>
  );
};

export default ProgressBarOfСannulation;
