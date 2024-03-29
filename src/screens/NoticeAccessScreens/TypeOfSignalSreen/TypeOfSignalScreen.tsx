import { View, Text } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { CheckedIcom } from "../../../assets/images/icons";
import MainLayout from '../../../Layouts/MainLayout/MainLayout';

const TypeOfSignalScreen = () => {

  return (
    <MainLayout title="Тип сигнала" >
      <Text style={{fontFamily:'geometria-regular'}} className="text-sm mt-[10px] text-main-blue">Выберите тип сигнала для уведомления</Text>
      <Text style={{fontFamily:'geometria-regular'}} className="text-sm mt-[10px] my-5 text-grey">Тип сигнала</Text>
      <View>
        <TouchableOpacity className="min-w-[327px] border border-[#4babc543] rounded-xl py-4 pl-[71px] relative justify-center">
            <View className="absolute left-[5%]">
                <CheckedIcom width={16} height={16}/>
            </View>
            <Text
                style={{fontFamily:'geometria-regular'}}
                className="text-[#101010] text-xs">
                    Будильник 1 (по умолчанию)
            </Text>
        </TouchableOpacity>
        <TouchableOpacity className="min-w-[327px] border border-[#4babc543] rounded-xl py-4 pl-[71px] relative justify-center">
            <View className="absolute left-[5%]">
                <CheckedIcom width={16} height={16}/>
            </View>
            <Text
                style={{fontFamily:'geometria-regular'}}
                className="text-[#101010] text-xs">
                    Радар
            </Text> 
        </TouchableOpacity>
        <TouchableOpacity className="min-w-[327px] border border-[#4babc543] rounded-xl py-4 pl-[71px] relative justify-center">
            <View className="absolute left-[5%]">
                <CheckedIcom width={16} height={16}/>
            </View>
            <Text
                style={{fontFamily:'geometria-regular'}}
                className="text-[#101010] text-xs">
                    Звук смс
            </Text>
        </TouchableOpacity>
        <TouchableOpacity className="min-w-[327px] border border-[#4babc543] rounded-xl py-4 pl-[71px] relative justify-center">
            <View className="absolute left-[5%]">
                <CheckedIcom width={16} height={16}/>
            </View>
            <Text
                style={{fontFamily:'geometria-regular'}}
                className="text-[#101010] text-xs">
                    Вступление
            </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default TypeOfSignalScreen;
