import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";

interface iButton {
    buttonBottomTitle?: string;
    buttonAction?: () => void;
}

const Button = ({buttonAction, buttonBottomTitle}:iButton) => {
    const route = useRoute(); // берем именя маршрутов
    const [show , setShow] = useState<boolean>(false);
    
    useEffect(() => { // показываем кнопку только на опр страницах
      if (route.name === 'RecomendationsScreen' || route.name === 'FeedBackScreen' || route.name === 'ChangeProfileScreen') {
        setShow(true);
      } else {
        setShow(false);
      }
    },[route.name])

    const handleClickButton = () => {
      buttonAction && buttonAction()
    }

  return (
    <View className="absolute flex items-center left-0 right-0 bottom-5">
        {show && 
        <Pressable onPress={handleClickButton} className="min-w-[300px] bg-main-blue px-[53px] py-[18px] rounded-[89px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#FFFFFF] text-center text-base leading-5">{buttonBottomTitle}</Text>
        </Pressable>
        }
    </View>
  );
};

export default Button;
