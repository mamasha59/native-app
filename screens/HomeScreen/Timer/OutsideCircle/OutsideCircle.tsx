import { View, Dimensions, Text, StyleSheet } from "react-native";
import InnerCircle from "../InnerCircle/InnerCircle";
import { SvgComponentText } from "../Text/Text";

const OutsideCircle = () => {
    const windowWidth = Dimensions.get('window').width;

  return (
        <View className="flex-1 min-h-[327px] min-w-[327px]  border-[#DADADA] rounded-full  my-14 relative">
          <View className="-rotate-90">
            <SvgComponentText/>
          </View>
          <View className="absolute right-[35px] bottom-[38px]">
            <InnerCircle/>
          </View>
        </View>
  );
};

export default OutsideCircle;
