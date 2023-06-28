import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Dimensions, TextInput, Pressable } from "react-native";
import { Slider } from '@miblanchard/react-native-slider';

interface iModalLiquidAmount {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
}
const windowHeight = Dimensions.get('window').height;

const ModalLiquidAmount = ({setModalVisible, modalVisible}:iModalLiquidAmount) => {

    const [liquidValue, setLiquidValue] = useState<any>(0); // значение полосы прокрутки
    const [inputValue, setInputValue] = useState<string>(); // значение инпута
    const [focus, setFocus] = useState<boolean>(); // если инпут в фокусе то дисейблим рейдж и отправляем данные инпута, и наоборот

    const handleOnSubmitSave = () => {
        setModalVisible(!modalVisible);
        setInputValue(''); // очищаем инпут при сабмите
        setLiquidValue(0); // сбрасываем рейдж при сабмите
        setFocus(false); // очищаем состояние фокуса
        console.log(focus ? inputValue : Math.floor(liquidValue)); // отправляем данные в сторедж TODO
    }

    const handleInputChange = (value:string) => {
        const numericValue = value.replace(/[^0-9]/g, ""); // оставляем только цифры
        const limitedValue = Number(numericValue) > 1000 ? 1000 : numericValue; // если ввели значение больше 1000, то заменяем на максимальное 1000
        setInputValue(limitedValue.toString());
    }
    
  return (
  <Modal
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {setModalVisible(!modalVisible)}}
    animationType="fade">
      <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-end flex-1 bg-[#10101035]">
        <View style={{minHeight: windowHeight * 0.4}} className="bg-[#ffff] rounded-t-[30px] pt-10 pb-[30px] px-6">
        <View>
            <Text style={{fontFamily:'geometria-regullar'}} className="text-base leading-4 mb-3">Сколько вы выпили жидкости?</Text>
            <TextInput
                style={{fontFamily:'geometria-regullar'}}
                onFocus={()=> setFocus(!focus)}
                keyboardType="numeric"
                value={inputValue}
                maxLength={4}
                onChangeText={handleInputChange}
                className="border-b-[#DADADA] border-b w-1/2 outline-none"
                placeholder="задать МЛ вручную"/>
        </View>

          <View className={`${focus && 'opacity-30'} flex-1 justify-center`}>
                <Slider
                    trackClickable={true}
                    disabled={focus}
                    minimumValue={0}
                    maximumValue={1000}
                    animationType="timing"
                    renderAboveThumbComponent={() =>
                        <Text style={{fontFamily:'geometria-regullar'}} className="text-[12px] justify-center items-center leading-3 text-[#101010] opacity-70">{Math.floor(liquidValue)+ ' мл'}</Text>}
                    thumbStyle={{backgroundColor:'#4BAAC5'}}
                    minimumTrackStyle={{backgroundColor:'#4BAAC5',height:7}}
                    maximumTrackStyle={{backgroundColor:'#4babc56b', height:7}}
                    value={liquidValue}
                    onValueChange={(value)=> setLiquidValue(value)}
                />
          </View>

          <TouchableOpacity onPress={handleOnSubmitSave} activeOpacity={0.6} className="justify-end py-[19px] px-[61px] items-center bg-[#4BAAC5] rounded-[89px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">Сохранить изменения</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
  </Modal>
  );
};

export default ModalLiquidAmount;
