import { View, Text } from "react-native";
import React from "react";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { TouchableOpacity } from "react-native-gesture-handler";

const NoticeAccessHomeScreen = () => {
  return (
    <MainLayout title="Уведомления и доступ">
  
        <Text style={{fontFamily:'geometria-regullar'}} className="text-[#4BAAC5] text-sm leading-4 mb-4 mt-3">Настройки уведомлений</Text>

        <TouchableOpacity className="flex-row border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-[10px] leading-3 text-[#77787B] flex-1">Тип сигнала</Text>
            <Text className="text-[12px] leading-[15px] text-[#101010] -ml-2">Будильник 1</Text>
            <View className="flex-1 justify-end flex-row">
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-[10px] leading-3 text-[#77787B] flex-1">Текст уведомления</Text>
            <Text className="text-[12px] leading-[15px] text-[#101010]">Время принять таблетку</Text>
            <View className="flex-1 justify-end flex-row">
                <Text>arrow</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row border border-[#4babc53f] py-4 px-[17px] rounded-[10px] mb-3 items-center">
            <Text style={{fontFamily:'geometria-regullar'}} className="text-[10px] leading-3 text-[#77787B] flex-1">Подтверждение</Text>
            <Text className="text-[12px] leading-[15px] text-[#101010]">Заход в приложение</Text>
            <View className="flex-1 justify-end flex-row">
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
 
    </MainLayout>
  );
};

export default NoticeAccessHomeScreen;
