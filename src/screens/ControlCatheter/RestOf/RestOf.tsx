import { View, Text, TouchableOpacity, Platform } from "react-native";
import {useState} from "react";

import ControllCatetor from "../../../assets/images/iconsComponent/TabMenuIcons/ControllCatetor";
import ModalWindow from "../../../components/ModalAddCatheter/ModalAddCatheter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCatheter } from "../../../store/slices/journalDataSlice";

const RestOf = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // состояние попапа

  const initial = useAppSelector(amount => amount.journal.initialCathetherAmount);
  const dispatch = useAppDispatch();

  const [selectedButton, setSelectedButton] = useState<string>(''); // Добавляем состояние для отслеживания выбранной кнопки

  const [inputValue, setInputValue] = useState<string>(''); // значение инпута

  const handleChangeCatetor = (value:string) => { // Используем регулярное выражение для удаления всех символов, кроме цифр
      const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
      setInputValue(numericValue);
  }

  const handleOpenPopup = (buttonType: string) => { // Функция для открытия попапа и сохранения типа кнопки
    setSelectedButton(buttonType);
    setModalVisible(true);
  };

  const handleClosePopup = () => { // закрыть попап
    if (selectedButton === 'nelaton') {
      dispatch(addCatheter({amount: +inputValue, catheterType: 'nelaton'}))
    } else if (selectedButton === 'foley') {
      dispatch(addCatheter({amount: +inputValue, catheterType: 'foley'}))
    }
    setInputValue(''); // очищаем инпут при закрытии
    setModalVisible(false);
  };

  return (
    <View className="mb-5">
      <View className="mb-[10px]">
          <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-grey">Текущий остаток</Text>
      </View>
      <View className="justify-center items-center flex-1">
        <TouchableOpacity style={{elevation:Platform.OS === 'android' ? 5 : 0, 
                                  shadowColor: 'black', 
                                  shadowOffset: { width: 0, height: 2 }, 
                                  shadowOpacity: 0.25,
                                  shadowRadius: 4,}} 
                                  activeOpacity={.8} 
                                  onPress={() => handleOpenPopup('nelaton')} 
                                  className="bg-main-blue rounded-xl w-full max-h-[96px] max-w-[250px] p-[15px] relative">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs leading-[14px] text-[#ffff]">Нелатон</Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-lg leading-[22px] text-[#ffff] my-[10px]">{initial.nelaton} шт.</Text>
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
        closePopup={handleClosePopup}
      />
    </View>
  );
};

export default RestOf;
