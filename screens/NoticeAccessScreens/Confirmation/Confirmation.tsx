import { View, Text, TouchableOpacity } from "react-native";
import {useState} from "react";
import { CheckedIcom } from "../../../imgs/icons";
import MainLayout from "../../../components/MainLayout/MainLayout";

const Confirmation = () => {

    const [chosen, setChosen] = useState(false);
//TODO
  return (
    <MainLayout title="Подтверждение">
    <Text
      style={{ fontFamily: "geometria-regullar" }}
      className="mt-[10px] text-[#77787B] text-sm"
    >
      Тип подтвердения катетеризации
    </Text>
    <Text
      style={{ fontFamily: "geometria-regullar" }}
      className="mt-[10px] text-[#4BAAC5] text-sm my-5"
    >
      Тип подтверждения
    </Text>
    <View>
      <TouchableOpacity id="1"
        onPress={() => setChosen(!chosen)}
        className="min-w-[327px] border border-[#4babc543] rounded-xl py-4 pl-[71px] relative justify-center"
      >
        {chosen && (
          <View className="absolute left-[5%]">
            <CheckedIcom width={16} height={16} />
          </View>
        )}
        <Text
          style={{ fontFamily: "geometria-regullar" }}
          className="text-[#101010] text-xs"
        >
          Заход в приложение
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setChosen(!chosen)}
        className="min-w-[327px] border border-[#4babc543] rounded-xl py-4 pl-[71px] relative justify-center"
      >
        {chosen && (
          <View className="absolute left-[5%]">
            <CheckedIcom width={16} height={16} />
          </View>
        )}
        <Text
          style={{ fontFamily: "geometria-regullar" }}
          className="text-[#101010] text-xs"
        >
          Нажатие кнопки “катетеризация”
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setChosen(!chosen)}
        className="min-w-[327px] border border-[#4babc543] rounded-xl py-4 pl-[71px] relative justify-center"
      >
        {chosen && (
          <View className="absolute left-[5%]">
            <CheckedIcom width={16} height={16} />
          </View>
        )}
        <Text
          style={{ fontFamily: "geometria-regullar" }}
          className="text-[#101010] text-xs"
        >
          Закрытие уведомления
        </Text>
      </TouchableOpacity>
    </View>
  </MainLayout>
  );
};

export default Confirmation;
