import { View, Text } from "react-native";

const LogoTop = () => {
  return (
    <View className="justify-center flex-grow-0 relative py-5 mx-auto">
      <Text style={{fontFamily: 'geometria-regular'}} className="absolute top-[20%] text-white">Use</Text>
      <Text style={{fontFamily: 'geometria-bold'}} className="py-3 text-4xl leading-7 text-white">Nelaton</Text>
      <Text style={{fontFamily: 'geometria-regular'}} className="absolute bottom-[45%] right-0 text-white">easily</Text>
    </View>
  );
};

export default LogoTop;
