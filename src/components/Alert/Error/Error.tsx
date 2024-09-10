import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import * as Clipboard from 'expo-clipboard';

import Ionicons from '@expo/vector-icons/Ionicons';
import { email } from "../../../utils/const";

interface iError {
  close: () => void,
}

const Error = ({close}:iError) => {

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(email);
  };

  return (
    <>
    <View className="items-center justify-center flex-1">
        <Text style={{fontFamily:'geometria-bold'}} className="text-xl text-error">Что то пошло не так.... </Text>
        <Text style={{fontFamily:'geometria-bold'}} className="text-xl text-error">Попробуйте снова!</Text>
    </View>
    <View className="items-center">
        <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-main-blue text-center">
          Если ошибка возникнет снова, пожалуйста, опишите подробно ваши действия, которые привели к ошибке, и отправьте эту информацию на наш электронный адрес.
        </Text>
        <View className="flex-row items-center">
          <Text style={{fontFamily:'geometria-bold'}} className="py-4 mr-1">{email}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
    </View>
    <TouchableOpacity onPress={() => close()} className="bg-main-blue py-3 items-center justify-center rounded-md">
        <Text style={{fontFamily:'geometria-bold'}} className="text-[#fff] text-дп lowercase">я понял</Text>
    </TouchableOpacity>
    </>
  );
};

export default Error;
