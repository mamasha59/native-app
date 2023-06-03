import { View, Text, Pressable } from "react-native";
import { Drop, Graphic } from "../../../imgs/icons";

const ButtonsHome = () => {
  return (
    <View className="flex-row gap-[13px] justify-between mt-[67px]">
        <Pressable className="flex-1 bg-[#9966AA] pl-[18px] pr-[25px] py-[13px] rounded-[89px] flex-row items-center justify-center">
            <Drop width={16} height={17} color={'#fff'}/>
            <Text className="ml-4 text-[#FFFFFF] font-bold text-sm">Подтекание</Text>
        </Pressable>

        <Pressable className="flex-1 bg-[#4BAAC5] pl-[15px] pr-[30px] py-[8px] rounded-[89px] flex-row items-center justify-center">
            <Graphic width={16} height={16} color={'#fff'}/>
            <Text className="ml-4 text-[#FFFFFF] font-bold text-center text-sm">Учет выпитой жидкости</Text>
        </Pressable>
    </View>
  );
};

export default ButtonsHome;
