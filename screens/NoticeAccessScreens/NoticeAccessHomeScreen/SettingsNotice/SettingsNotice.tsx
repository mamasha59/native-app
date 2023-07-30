import { View, Text, TouchableOpacity } from "react-native";
import ArrowProceed from "../../../../imgs/iconsComponent/ArrowProceed";

interface SettingsNoticeProps {
    title: string;
    text: string;
    onPress?: () => void;
}

const SettingsNotice = ({title, text, onPress}:SettingsNoticeProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center relative">
        <Text style={{fontFamily:'geometria-regullar'}} className="text-[10px] leading-3 text-[#77787B] max-w-[100px] pr-1 flex-1">{title}</Text>
        <View className="flex-1 px-3">
            <Text className="text-[12px] leading-[15px] text-[#101010]">{text}</Text>
        </View>
        <View className="absolute right-[5%]">
            <ArrowProceed width={10} color={'#101010'}/>
        </View>
    </TouchableOpacity>
  );
};

export default SettingsNotice;
