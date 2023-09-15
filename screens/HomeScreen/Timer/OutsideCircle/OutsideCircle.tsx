import { View } from "react-native";
import InnerCircle from "../InnerCircle/InnerCircle";
import { SvgComponentText } from "../Text/Text";

const OutsideCircle = () => {

  return (
        <View className="flex-1 w-full h-full justify-center rounded-full relative">
          <View className="-rotate-90">
            <SvgComponentText/>
          </View>
          <View className="absolute right-[54px]">
            <InnerCircle/>
          </View>
        </View>
  );
};

export default OutsideCircle;
