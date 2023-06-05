import { View, Text, Image, useWindowDimensions } from "react-native";

const SlideItem = ({item}:iProps) => {
    const width = useWindowDimensions();
  return (
    <View className="items-center">
      <Image className="w-[280px]" source={item.image}/>
      <View className="mt-20 items-center">
        <Text className="text-base leading-5 text-[#101010] font-normal">{item.title}</Text>
      </View>
    </View>
  );
};

export default SlideItem;
