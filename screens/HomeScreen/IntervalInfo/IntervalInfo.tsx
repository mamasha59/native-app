import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable, Dimensions, TextInput } from "react-native";
import { ClosePopup } from "../../../assets/images/icons";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const IntervalInfo = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addCatetor, setAddCatetor] = useState<string>('');
  const [catetorAmount, setCatetorAmount] = useState<number>(180);

  const handleChangeCatetor = (value:string) => {
    setAddCatetor(value);
    if(value.length > 0){
      setCatetorAmount(catetorAmount + +value) 
    }
  }
  const handleClosePopup = () => {
    setModalVisible(!modalVisible);
    setAddCatetor('')
  }
  return (
  <View className="border-b border-[#DADADA]">
        <Text style={{fontFamily:'geometria-regular'}} className="text-[#77787B] text-xs">Интервал катетеризации:</Text>
        <View className="mt-[17px] mb-[15px]  flex-row justify-between items-center">
          <View className="text-[#101010]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg mb-[5px]">Нелатон</Text>
            <Text style={{fontFamily:'geometria-regular'}} className="text-xs">каждые 4 часов</Text>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{fontFamily:'geometria-bold'}} className="bg-[#4babc528] px-[10px] py-[6px] rounded-[89px] text-main-blue">остаток {catetorAmount} шт</Text>
          </TouchableOpacity>
          {/* ПОПАП ПОПОЛНИТЬ КАТЕТОРЫ */}
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}}
            animationType="fade">
            <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-center px-4 flex-1 bg-[#10101035]">
              <View style={{minHeight: windowHeight * 0.3, width:windowWidth * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] rounded-3xl justify-center items-center">
              <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mb-8">Напишите колличество новых катететров:</Text>
                <View className="flex-row items-center">
                    <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 mr-[10px]">Колличество</Text>
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        keyboardType="numeric"
                        value={addCatetor}
                        maxLength={3}
                        placeholder="нажмите для ввода"
                        underlineColorAndroid={'#DADADA'}
                        onChangeText={handleChangeCatetor}
                        onSubmitEditing={handleClosePopup}
                        className="w-1/2 text-center"
                        autoFocus={true}
                       />
                </View>

                <TouchableOpacity onPress={handleClosePopup} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                  <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </View>
  </View>
  );
};

export default IntervalInfo;
