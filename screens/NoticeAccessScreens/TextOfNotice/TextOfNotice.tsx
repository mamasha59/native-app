import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import MainLayout from "../../../components/MainLayout/MainLayout";
import { CheckedIcom } from "../../../assets/images/icons";

const TextOfNotice = () => {
  const [chosen, setChosen] = useState(false);
// TODO сделать выбранный с галкой
console.log(chosen);

  return (
    <MainLayout title="Текст уведомления">
      <Text
        style={{ fontFamily: "geometria-regular" }}
        className="mt-[10px] text-[#77787B] text-sm"
      >
        Введите текст уведомления
      </Text>
      <Text
        style={{ fontFamily: "geometria-regular" }}
        className="mt-[10px] text-main-blue text-sm my-5"
      >
        Текст уведомления
      </Text>

        {/* <BouncyCheckbox
          size={16}
          unfillColor="#FFFFFF"
          text="Время принять таблетку"
          textStyle={{ fontFamily: "geometria-regular", color:'#101010', fontSize:12, lineHeight:16, textDecorationLine: 'none', paddingLeft:50}}
          innerIconStyle={{borderColor:'transparent'}}
          isChecked={chosen}
          onPress={(isChecked: boolean) => {setChosen(!isChecked)}}
          className="w-full min-w-[327px] border border-[#4babc543] rounded-xl py-4 px-[15px] relative"
          // fillColor="#FFFFFF"
          iconComponent={<CheckedIcom width={16} height={16} />}
        />
       */}

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
