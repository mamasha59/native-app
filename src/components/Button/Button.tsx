import { View, Text, TouchableOpacity } from "react-native";

interface iButton {
  buttonBottomTitle?: string;
  buttonAction?: () => void;
}

const Button = ({ buttonAction, buttonBottomTitle }: iButton) => {

  const handleClickButton = () => {
    buttonAction && buttonAction();
  };

  return (
    <View className="absolute flex items-center left-0 right-0 bottom-5">
      {buttonBottomTitle && (
        <TouchableOpacity
          activeOpacity={.9}
          onPress={handleClickButton}
          className="min-w-[300px] bg-main-blue px-[53px] py-[18px] rounded-[89px]"
        >
          <Text
            style={{ fontFamily: "geometria-bold" }}
            className="text-white text-center text-base leading-5"
          >
            {buttonBottomTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Button;
