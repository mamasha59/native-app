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
      if (route.name === 'Recomendations' || route.name === 'FeedbackScreen') {
        setShow(true);
      } else {
        setShow(false);
      }
    },[route.name])

  return (
    <View className="absolute flex items-center left-0 right-0 bottom-5">
        {show && 
        <Pressable onPress={() => buttonAction()} className="min-w-[300px] bg-[#4BAAC5] px-[53px] py-[18px] rounded-[89px]">
            <Text className="text-[#FFFFFF] font-bold text-center text-base leading-5">{buttonBottomTitle}</Text>
        </Pressable>
        }
    </View>
  );
};

export default Button;
