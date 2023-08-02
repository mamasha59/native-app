import { View, Text, TouchableOpacity } from "react-native";
import ArrowProceed from "../../../../imgs/iconsComponent/ArrowProceed";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../NoticeNavigationScreen";

interface SettingsNoticeProps {
    title: string;
    text: string;
    goTo: any; // TODO 
}

const SettingsNotice = ({title, text, goTo}:SettingsNoticeProps) => {
  // TODO сделать типизацию
  const navigation = useNavigation<StackNavigation>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(goTo)} className="flex-row border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center relative">
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
