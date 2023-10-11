import { View, Text, Dimensions, Image } from "react-native";
import { iSliderItem } from "../sliders";

const {width} = Dimensions.get("window");

interface iOnBoardingItem {
  item: iSliderItem;
}

const OnBoardingItem = ({item}:iOnBoardingItem) => {

  const {image, description} = item;
  
  return (
    <View style={{width:width}} className={`flex-1 items-center justify-center`}>
        <Image
            className="justify-center px-2"
            source={image}
            resizeMode="contain"
        />
        <View className="flex-[0.3%] w-full justify-end py-10">
          <Text style={{ fontFamily: "geometria-regular" }} className="text-center text-black text-base">{description}</Text>
        </View>
    </View>
  );
};

export default OnBoardingItem;
