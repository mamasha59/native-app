import { Image } from "expo-image";
import { View, Text } from "react-native";

const LogoTop = () => {
  return (
    <View className="w-full h-20 py-2 mx-auto">
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('../../../assets/images/AppLogo.png')}
        contentFit="contain"
        transition={1000}
        contentPosition={'center'}
        alt="Use Nelaton Easily Logo"
      />
    </View>
  );
};

export default LogoTop;
