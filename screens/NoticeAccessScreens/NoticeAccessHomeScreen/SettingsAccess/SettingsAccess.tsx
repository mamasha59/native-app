import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ArrowProceed from "../../../../assets/images/iconsComponent/ArrowProceed";

interface SettingsAccessProps {
    title: string;
    onPress?: () => void;
}

const SettingsAccess = ({title, onPress}:SettingsAccessProps) => {
  return (
    <TouchableOpacity className="flex-row justify-between border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center relative">
        <Text style={{fontFamily:'geometria-regullar'}} className="text-xs leading-[15px] text-[#101010]">{title}</Text>
        <View className="absolute right-[5%]">
            <ArrowProceed width={10} color={'#101010'}/>
        </View>
    </TouchableOpacity>
  );
};

export default SettingsAccess;
