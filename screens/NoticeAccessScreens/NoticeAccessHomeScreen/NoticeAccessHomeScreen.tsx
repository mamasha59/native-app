import { View, Text } from "react-native";
import React from "react";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { TouchableOpacity } from "react-native-gesture-handler";

const NoticeAccessHomeScreen = () => {
  return (
    <MainLayout title="Уведомления и доступ">
      <Text style={{fontFamily:'geometria-regullar'}} className="text-[#4BAAC5] text-sm leading-4 mb-4">Настройки уведомлений</Text>
      <View>
        <TouchableOpacity className="flex-row justify-between border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-[10px] leading-3 text-[#77787B]">Тип сигнала</Text>
            <Text className="text-[12px] leading-[15px] text-[#101010] text-start">Будильник 1</Text>
            <View>
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-[10px] leading-3 text-[#77787B]">Текст уведомления</Text>
            <Text className="text-[12px] leading-[15px] text-[#101010] text-start">Время принять таблетку</Text>
            <View>
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-[10px] leading-3 text-[#77787B]">Подтверждение</Text>
            <Text className="text-[12px] leading-[15px] text-[#101010] text-start">Заход в приложение</Text>
            <View>
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>

        <Text style={{fontFamily:'geometria-regullar'}} className="text-[#4BAAC5] text-sm leading-4 mb-4 mt-8">Настройки доступа</Text>
        <TouchableOpacity className="flex-row justify-between border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-xs leading-[15px] text-[#101010]">Доступ к журналу мочеиспускания</Text>
            <View>
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-between border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-xs leading-[15px] text-[#101010]">Пропуск катетеризации</Text>
            <View>
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default NoticeAccessHomeScreen;
