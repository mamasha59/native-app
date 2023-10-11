import { View, Text, TouchableOpacity } from "react-native";
import {useState} from "react";

import ControllCatetor from "../../../assets/images/iconsComponent/TabMenuIcons/ControllCatetor";
import ModalWindow from "../../../components/Modal/Modal";

const RestOf = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false); // состояние попапа

  const [naletonAmount, setNelatonAmount] = useState<string>('0'); // количество катеторов Нелатон
  const [foleyAmount, setFoleyAmount] = useState<string>('0'); // количество катеторов Фолея
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
      // Если выбрана кнопка "Нелатон", обновляем состояние naletonAmount
      setNelatonAmount((prevAmount) => (Number(prevAmount) + Number(inputValue)).toString());
    } else if (selectedButton === 'foley') {
      // Если выбрана кнопка "Фолея", обновляем состояние foleyAmount
      setFoleyAmount((prevAmount) => (Number(prevAmount) + Number(inputValue)).toString());
    }
    setInputValue(''); // очищаем инпут при закрытии
    setModalVisible(false);
  };

  return (
    <View className="mb-5">
      <View className="mb-[10px]">
          <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-grey">Текущий остаток</Text>
      </View>
      <View className="flex-row flex-1 gap-2">
        <TouchableOpacity activeOpacity={.8} onPress={() => handleOpenPopup('nelaton')} className="bg-main-blue flex-1 rounded-xl max-h-[96px] p-[15px] relative">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs leading-[14px] text-[#ffff]">Нелатон</Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-lg leading-[22px] text-[#ffff] my-[10px]">{naletonAmount}шт.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-[8px] leading-[10px] text-[#ffff]">Через 3 дня останется 0шт.</Text>
            <View className="border border-[#ffff] absolute right-[15px] top-[15px] rounded-full p-2">
            <ControllCatetor width={25} color={'#ffff'}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.8} onPress={() => handleOpenPopup('foley')} className="bg-purple-button flex-1 rounded-xl max-h-[96px] p-[15px] relative">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs leading-[14px] text-[#ffff]">Фолея</Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-lg leading-[22px] text-[#ffff] my-[10px]">{foleyAmount}шт.</Text>
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
