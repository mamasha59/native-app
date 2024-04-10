import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import NelatonIcon from "../../../assets/images/iconsComponent/CathetersIcons/NelatonIcon";
import ModalWindow from "../../../components/ModalAddCatheter/ModalAddCatheter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCatheter } from "../../../store/slices/journalDataSlice";
import { useFormatInterval } from "../../../hooks/useFormatInterval";

const IntervalInfo = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // состояние попапа
  const [inputValue, setInputValue] = useState<string>(''); // значение инпута
  const [warning, setWarning] = useState<boolean>(false);

  const userData = useAppSelector(user => user.user);
  const userJournal = useAppSelector(user => user.journal);
  const useDispatch = useAppDispatch();
  const newIntervalText = useFormatInterval({intervalInSeconds: +userData.interval!});

  useEffect(() => {
    if (userJournal.initialCathetherAmount?.nelaton! <= 3) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [userJournal.initialCathetherAmount?.nelaton, userData.catheterType]);

  const handleChangeCatetor = (value:string): void => { // фильтруем, только цифры
      const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
      setInputValue(numericValue);
  }

  const handleSafe = () => { // при клике на кнопку Сохранить или Enter
    useDispatch(addCatheter({amount: +inputValue}));
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
          {!userData 
                ? <ActivityIndicator size="small" color="#4BAAC5"/>
                : userData.catheterType || "Выберите катетор"}
          </Text>
          <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-black">
          {!userData 
                ? <ActivityIndicator size="small" color="#4BAAC5"/>
                : `каждые ${newIntervalText}` || "Интервал не задан"}
          </Text>
        </View>
        <View className="absolute -top-1 flex-1 right-0 border border-[#4babc550] rounded-full items-center p-2">
          <NelatonIcon/>
        </View>
      </View>
      <TouchableOpacity activeOpacity={.6} className="flex-1 ml-5 items-end" onPress={() => setModalVisible(true)}>
        <Text style={{fontFamily:'geometria-bold'}}
              className={`px-[10px] py-[6px] rounded-[89px] text-center 
              ${warning ? 'text-warning bg-[#ea373724]' : 'text-main-blue bg-[#4babc528]'}`}>
          {userJournal  
          ? (userJournal.initialCathetherAmount.nelaton
              ? `остаток ${userJournal.initialCathetherAmount.nelaton} шт`
              : "Введите кол-во катеторов")
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
      handleSafe={handleSafe}
    />
  </View>
  );
};
export default IntervalInfo;