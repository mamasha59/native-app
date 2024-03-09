import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";

import NelatonIcon from "../../../assets/images/iconsComponent/CathetersIcons/NelatonIcon";
import ModalWindow from "../../../components/ModalAddCatheter/ModalAddCatheter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import FolleyIcon from "../../../assets/images/iconsComponent/CathetersIcons/FoleyIcon";
import { addCatheter } from "../../../store/slices/journalDataSlice";

const IntervalInfo = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // состояние попапа
  const [inputValue, setInputValue] = useState<string>(''); // значение инпута
  const [textInterval, setTextInterval] = useState<string>('');
  const [warning, setWarning] = useState<boolean>(false);

  const userData = useAppSelector(user => user.user);
  const userJournal = useAppSelector(user => user.journal);
  const useDispatch = useAppDispatch();

  const catheter = userData.catheterType === 'Нелатон';

  useEffect(() => { // форматируем интервал в текст с добавление приставок типа : д - день, ч - часы, минуты
    if (userData.interval) {
      const interval = userData.interval.split('.');
      if (userData.catheterType === 'Фоллея') {
        const days = +interval[0] === 0 ? '' : `${interval[0]} д. `;
        const hours = +interval[1] === 0 ? '' : `${interval[1]} ч.`;
        const minutes = +interval[2] === 0 ? '' : `${interval[2]} мин.`;
        const connectedString = days + hours + minutes;
        setTextInterval(connectedString);
      } else {
        const hours = +interval[0] === 0 ? '' : `${interval[0]} ч. `;
        const minutes = +interval[1] === 0 ? '' : `${interval[1]} мин.`;
        const connectedString = hours + minutes;
        setTextInterval(connectedString);
      }
    }
  },[userData.interval, userData.catheterType])

  useEffect(() => {
    if (catheter ? userJournal.initialCathetherAmount?.nelaton! <= 3 :userJournal.initialCathetherAmount?.foley! <= 3) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [userJournal.initialCathetherAmount?.nelaton,userJournal.initialCathetherAmount?.foley,userData.catheterType]);

  const handleChangeCatetor = (value:string): void => {
      const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
      setInputValue(numericValue);
  }

  const handleClosePopup = () => { // закрыть попап
    if (catheter) {
      useDispatch(addCatheter({amount: +inputValue, catheterType: 'nelaton'}));
    } else {
      useDispatch(addCatheter({amount: +inputValue, catheterType: 'foley'}));
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
          {!userData 
                ? <ActivityIndicator size="small" color="#4BAAC5"/>
                : userData.catheterType || "Выберите катетор"}
          </Text>
          <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-black">
          {!userData 
                ? <ActivityIndicator size="small" color="#4BAAC5"/>
                : `каждые ${textInterval}` || "Интервал не задан"}
          </Text>
        </View>
        <View className="absolute -top-1 flex-1 right-0 border border-[#4babc550] rounded-full items-center p-2">
          {catheter ? <NelatonIcon/> : <FolleyIcon/>}
        </View>
      </View>

      <TouchableOpacity activeOpacity={.6} className="flex-1 ml-5 items-end" onPress={() => setModalVisible(true)}>
        <Text style={{fontFamily:'geometria-bold'}}
              className={`px-[10px] py-[6px] rounded-[89px] text-center 
              ${warning ? 'text-warning bg-[#ea373724]' : 'text-main-blue bg-[#4babc528]'}`}>
          {userJournal  
          ? (userJournal.initialCathetherAmount.foley || userJournal.initialCathetherAmount.nelaton
              ? `остаток ${catheter ? userJournal.initialCathetherAmount.nelaton : userJournal.initialCathetherAmount.foley} шт`
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
      closePopup={handleClosePopup}
    />
  </View>
  );
};
export default IntervalInfo;