import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

import { CheckedIcom } from "../../../assets/images/icons";
import MainLayout from '../../../Layouts/MainLayout/MainLayout';

const TextOfNotice = () => {
  const [chosen, setChosen] = useState(false);
// TODO сделать выбранный с галкой

  return (
    <MainLayout title="Текст уведомления">
      <Text
        style={{ fontFamily: "geometria-regular" }}
        className="mt-[10px] text-grey text-sm"
      >
        Введите текст уведомления
      </Text>
      <Text
        style={{ fontFamily: "geometria-regular" }}
        className="mt-[10px] text-main-blue text-sm my-5"
      >
        Текст уведомления
      </Text>
      
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
            style={{ fontFamily: "geometria-regular" }}
            className="text-[#101010] text-xs"
          >
            Мама просит перезвонить
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
            style={{ fontFamily: "geometria-regular" }}
            className="text-[#101010] text-xs"
          >
            Пришло новое сообщене
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
            style={{ fontFamily: "geometria-regular" }}
            className="text-[#101010] text-xs"
          >
            Свой текст
          </Text>
        </TouchableOpacity>
      
    </MainLayout>
  );
};

export default TextOfNotice;
