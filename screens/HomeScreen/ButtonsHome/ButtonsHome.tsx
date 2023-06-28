import { View, Text, TouchableOpacity } from "react-native";
import { Drop, Graphic } from "../../../imgs/icons";
import {useState} from 'react';
import ModalLiquidAmount from "./ModalLiquidAmount/ModalLiquidAmount";

const ButtonsHome = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View className="flex-row">
        <TouchableOpacity activeOpacity={0.6} className="flex-1 bg-[#9966AA] pl-[18px] pr-[25px] py-[13px] mr-[13px] rounded-[89px] flex-row items-center justify-center">
            <Drop width={16} height={17} color={'#fff'}/>
            <Text style={{fontFamily:'geometria-bold'}} className="ml-4 text-[#FFFFFF] text-sm">Подтекание</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.6} className="flex-1 bg-[#4BAAC5] pl-[15px] pr-[30px] py-[8px] rounded-[89px] flex-row items-center justify-center">
            <Graphic width={16} height={16} color={'#fff'}/>
            <Text style={{fontFamily:'geometria-bold'}} className="ml-4 text-[#FFFFFF] text-center text-sm">Учет выпитой жидкости</Text>
        </TouchableOpacity>

        <ModalLiquidAmount modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </View>
  );
};

export default ButtonsHome;
