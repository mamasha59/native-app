import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import NelatonIcon from "../../../assets/images/iconsComponent/CathetersIcons/NelatonIcon";
import ModalWindow from "../../../components/Modal/Modal";
import { useAppSelector } from "../../../store/hooks";
import FolleyIcon from "../../../assets/images/iconsComponent/CathetersIcons/FoleyIcon";

const IntervalInfo = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false); // состояние попапа
  const [savedValue, setSavedValue] = useState<string>(''); // сохраняем введенное значение после очистки инпута
  const [inputValue, setInputValue] = useState<string>(''); // значение инпута

  const handleChangeCatetor = (value:string) => {
     // Используем регулярное выражение для удаления всех символов, кроме цифр
      const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
      setInputValue(numericValue);
  }

  const userData = useAppSelector(user => user.user); 
  
  const handleClosePopup = () => { // закрыть попап
    setSavedValue(inputValue);
    setModalVisible(false);
    setSavedValue(() => {
     const newValue = Number(savedValue) + Number(inputValue);
     return newValue.toString();
    })
    setInputValue('');
  };

  return (
  <View className="border-b border-[#DADADA]">
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs">Интервал катетеризации:</Text>
        <View className="mt-[17px] mb-[15px] flex-row justify-between items-center">

          <View className="flex-row">
            <View className="mr-[14px]">
              <Text style={{fontFamily:'geometria-bold'}} className="text-lg mb-[5px] text-black">
              {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                   : userData.catheterType || "Выберите катетор"}
              </Text>
              <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-black">
              {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                   : userData.interval || "Интервал"}
              </Text>
            </View>
            <View className="border border-[#4babc550] rounded-full items-center justify-center flex-1 max-w-[44px] max-h-[44px]">
              {userData.catheterType === 'Нелатон' ? <NelatonIcon/> : <FolleyIcon/>}
            </View>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{fontFamily:'geometria-bold'}} className="bg-[#4babc528] px-[10px] py-[6px] rounded-[89px] max-w-[200px] text-center text-main-blue">
              {+savedValue <= 0 ? 'Введите кол-во катеторов' : `остаток ${savedValue} шт `}
            </Text>
          </TouchableOpacity>
          {/* ПОПАП ПОПОЛНИТЬ КАТЕТОРЫ */}
          <ModalWindow
            visible={modalVisible}
            onChangeText={handleChangeCatetor}
            setModalVisible={setModalVisible}
            value={inputValue}
            closePopup={handleClosePopup}
           />
        </View>
  </View>
  );
};

export default IntervalInfo;
