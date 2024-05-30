import { View, Text, TouchableOpacity, Platform } from "react-native";
import {useState} from "react";

import ControllCatetor from "../../../assets/images/iconsComponent/TabMenuIcons/ControllCatetor";
import ModalWindow from "../../../components/ModalAddCatheter/ModalAddCatheter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCatheter } from "../../../store/slices/journalDataSlice";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";

const RestOf = () => {
  const navigation = useNavigation<StackNavigationRoot>();
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  
  const [modalVisible, setModalVisible] = useState<boolean>(false); // состояние попапа

  const initial = useAppSelector(amount => amount.journal.initialCathetherAmount);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>(''); // значение инпута

  const handleChangeCatetor = (value:string) => { // Используем регулярное выражение для удаления всех символов, кроме цифр
      const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
      setInputValue(numericValue);
  }

  const handleOpenPopup = () => {
    if(currentRoute === 'Home') {
      navigation.navigate('ControlCatheter');
    }else {
      setModalVisible(true);
    } 
  };

  const handleClosePopup = () => { // закрыть попап
    dispatch(addCatheter({amount: +inputValue}))
    setInputValue(''); // очищаем инпут при закрытии
    setModalVisible(false);
  };

  return (
    <>
      <View className="justify-center items-center flex-0">
        <TouchableOpacity style={{elevation:Platform.OS === 'android' ? 5 : 0, 
                                  shadowColor: 'black', 
                                  shadowOffset: { width: 0, height: 2 }, 
                                  shadowOpacity: 0.25,
                                  shadowRadius: 4,}} 
                                  activeOpacity={.8} 
                                  onPress={handleOpenPopup} 
                                  className="bg-main-blue rounded-xl w-full max-h-[96px] max-w-[250px] p-[15px] relative">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs leading-[14px] text-[#ffff]">Remaning catheters</Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-lg leading-[22px] text-[#ffff] my-[5px]">{initial.nelaton} шт.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-[8px] leading-[10px] text-[#ffff]">Через 3 дня останется 0шт.</Text>
            <View className="border border-[#ffff] absolute right-[15px] top-[15px] rounded-full p-2">
              <ControllCatetor width={25} color={'#ffff'}/>
            </View>
        </TouchableOpacity>
      </View>
      <ModalWindow 
        visible={modalVisible}
        onChangeText={handleChangeCatetor}
        setModalVisible={setModalVisible}
        value={inputValue}
        handleSafe={handleClosePopup}
      />
    </>
  );
};

export default RestOf;
