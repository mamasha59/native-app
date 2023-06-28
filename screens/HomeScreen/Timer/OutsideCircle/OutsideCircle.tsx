import { View, Dimensions, Text, StyleSheet } from "react-native";
import InnerCircle from "../InnerCircle/InnerCircle";

const OutSideCircle = () => {
    const windowWidth = Dimensions.get('window').width;


  return (
        <View className="flex-1 min-h-[327px] min-w-[327px] border-dashed border border-[#DADADA] rounded-full my-14">
            <InnerCircle/>
        </View>
  );
};

export default OutSideCircle;
