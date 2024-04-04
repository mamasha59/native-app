import { View, Text, TouchableOpacity } from "react-native";
import { Drop, Graphic } from "../../assets/images/icons";

interface iDoubleButton {
    textOfLeftButton: string;
    textOfRightButton: string;
    handlePressRightButton?: () => void;
    handlePressLeftButton?: () => void;
    showIcon: boolean;
}

const DoubleButton = ({handlePressRightButton, handlePressLeftButton, textOfLeftButton, textOfRightButton, showIcon}:iDoubleButton) => {
  return (
    <View className="flex-row gap-[13px] mb-[15px]">
        <TouchableOpacity onPress={handlePressLeftButton} activeOpacity={0.6} className="min-h-[44px] p-1 flex-1 bg-purple-button rounded-[89px] flex-row items-center justify-center">
            {showIcon && <Drop width={16} height={17} color={'#fff'}/>}
            <Text style={{fontFamily:'geometria-bold'}} className="ml-1 text-[#FFFFFF] text-sm text-center">{textOfLeftButton}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressRightButton} activeOpacity={0.6} className="min-h-[44px] p-1 flex-1 bg-main-blue rounded-[89px] flex-row items-center justify-center">
            {showIcon && <View className="mr-4"><Graphic width={16} height={16} color={'#fff'}/></View> }
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#FFFFFF] text-sm text-center leading-4">{textOfRightButton}</Text>
        </TouchableOpacity>
    </View>
  );
};

export default DoubleButton;
