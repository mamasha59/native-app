import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import NelatonIcon from "../../../assets/images/iconsComponent/CathetersIcons/NelatonIcon";
import ModalWindow from "../../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import FolleyIcon from "../../../assets/images/iconsComponent/CathetersIcons/FoleyIcon";
import { addCatheter } from "../../../store/slices/journalDataSlice";

const IntervalInfo = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false); // состояние попапа
  const [inputValue, setInputValue] = useState<string>(''); // значение инпута
  
  const userData = useAppSelector(user => user.user);
  const userJournal = useAppSelector(user => user.journal);
  const useDispatch = useAppDispatch();

  const cathether = userData.catheterType === 'Нелатон';

  const handleChangeCatetor = (value:string): void => {// Используем регулярное выражение для удаления всех символов, кроме цифр
      const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
      setInputValue(numericValue);
  }

  const handleClosePopup = () => { // закрыть попап
    if (cathether) {
      useDispatch(addCatheter({amount: +inputValue, catheterType: 'nelaton'}))
    } else {
      useDispatch(addCatheter({amount: +inputValue, catheterType: 'foley'}))
    }
    setModalVisible(false);
    setInputValue('');
  };

  return (
  <View className="border-b border-[#DADADA]">
    <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs">Интервал катетеризации:</Text>
    
    <View className="my-[17px] flex-row items-center">

      <View className="flex-1 relative">
        <View className="mr-[14px]">
          <Text style={{fontFamily:'geometria-bold'}} className="text-lg mb-[5px] text-black">
          {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                : userData.catheterType || "Выберите катетор"}
          </Text>
          <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-black">
          {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                : 'каждые ' + userData.interval + ' ч.' || "Интервал не задан"}
          </Text>
        </View>
        <View className="absolute top-0 flex-1 right-2 border border-[#4babc550] rounded-full items-center p-2">
          {cathether ? <NelatonIcon/> : <FolleyIcon/>}
        </View>
      </View>

      <TouchableOpacity activeOpacity={.6} className="flex-1 ml-5 items-end" onPress={() => setModalVisible(true)}>
        <Text style={{fontFamily:'geometria-bold'}} className="bg-[#4babc528] px-[10px] py-[6px] rounded-[89px] text-center text-main-blue">
          {userJournal ? 
            userJournal.initialCathetherAmount.foley! | userJournal.initialCathetherAmount.nelaton! 
              ? `остаток ${cathether ? userJournal.initialCathetherAmount.nelaton : userJournal.initialCathetherAmount.foley} шт`
              : "Введите кол-во катеторов"
          : <ActivityIndicator/>
          }
        </Text>
      </TouchableOpacity>
    </View>
    {/* ПОПАП ПОПОЛНИТЬ КАТЕТОРЫ */}
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

export default IntervalInfo;
