import { Dispatch, SetStateAction, memo, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Dimensions, TextInput, Pressable } from "react-native";
import { Slider } from '@miblanchard/react-native-slider';
import { ClosePopup } from "../../../assets/images/icons";

interface iModalLiquidAmount {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
}
const windowHeight = Dimensions.get('window').height;

const ModalLiquidAmount = ({setModalVisible, modalVisible}:iModalLiquidAmount) => {

    const [liquidValue, setLiquidValue] = useState<number>(0); // значение полосы прокрутки
    const [focusInput, setFocusInput] = useState<boolean>(false); // значение полосы прокрутки

    const handleOnSubmitSave = () => {
        setModalVisible(!modalVisible);
        setLiquidValue(liquidValue);
        console.log(liquidValue); // TODO отправляем данные в сторедж 
        setLiquidValue(0);  // сбрасываем рейдж при сабмите
        setFocusInput(!focusInput);
    }

    const closeByPressButton = () => {
      setModalVisible(!modalVisible);
      setLiquidValue(0);  // сбрасываем рейдж при сабмите
      setFocusInput(!focusInput);
    }
console.log('hi');

    const handlePressCustomMl1 = (item:string) => {
      if(item) setLiquidValue(+item) 
    }
    const customMl = ['300','400','600','650','700']
  return (
  <Modal
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {setModalVisible(!modalVisible)}}
    animationType="fade">
      <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-end flex-1 bg-[#10101035]">
        <View style={{minHeight: windowHeight * 0.45}} className="bg-[#ffff] rounded-t-[30px] pt-10 pb-[30px] px-6">
        <View>
          <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-4 mb-3">Сколько вы выпили жидкости?</Text>

          <View className="flex-row items-center py-2 flex-wrap gap-2">
            {customMl.map((item, index) => 
              <TouchableOpacity onPress={() => handlePressCustomMl1(item)} key={index} activeOpacity={.6} className="p-1 rounded-md bg-main-blue">
                <Text style={{fontFamily:'geometria-regular'}} className="text-[#ffff]">{item} мл.</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TextInput
                style={{fontFamily:'geometria-regular'}}
                keyboardType="numeric"
                value={liquidValue.toString()}
                maxLength={4}
                onChangeText={value => +value > 1000 ? setLiquidValue(1000) : setLiquidValue(+value.replace(/[^0-9]/g, ""))}
                onFocus={() => setFocusInput(!focusInput)}
                className="border-b-[#DADADA] border-b w-1/2 outline-none"
              />
             <Text style={{fontFamily:'geometria-regular'}}>{focusInput ? 'просто начните вводить значение' : 'задать вручную'}</Text>
          </View>
        </View>

          <View className={`flex-1 justify-center pt-6`}>
                <Slider
                    trackClickable={true}
                    minimumValue={0}
                    maximumValue={1000}
                    animationType="timing"
                    renderAboveThumbComponent={() =>
                        <Text style={{fontFamily:'geometria-regular'}} className="text-[12px] justify-center items-center leading-3 text-[#101010] opacity-70 -ml-5">{Math.floor(liquidValue)+ ' мл'}</Text>}
                    thumbStyle={{backgroundColor:'#4BAAC5'}}
                    minimumTrackStyle={{backgroundColor:'#4BAAC5',height:7}}
                    maximumTrackStyle={{backgroundColor:'#4babc56b', height:7}}
                    value={liquidValue}
                    onValueChange={(value)=> setLiquidValue(Math.floor(+value))}
                />
          </View>

          <TouchableOpacity onPress={handleOnSubmitSave} activeOpacity={0.6} className="justify-end py-[19px] px-[61px] items-center bg-main-blue rounded-[89px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">Сохранить изменения</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeByPressButton} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
            <ClosePopup width={15} height={15}/>
          </TouchableOpacity>
        </View>
      </Pressable>
  </Modal>
  );
};

export default memo(ModalLiquidAmount);
