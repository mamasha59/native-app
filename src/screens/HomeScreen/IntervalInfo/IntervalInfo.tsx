import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import * as Notifications from 'expo-notifications';

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
  const interval = useAppSelector(user => user.timerStates.interval);
  const userJournal = useAppSelector(user => user.journal);
  const useDispatch = useAppDispatch();
  const newIntervalText = useFormatInterval({intervalInSeconds: interval!});

  useEffect(() => {
    if (userJournal.initialCathetherAmount?.nelaton! <= 3) {
      setWarning(true);
      Notifications.scheduleNotificationAsync({
        content: {
          title: `Осталось ${userJournal.initialCathetherAmount.nelaton} катеторов!`,
          body: 'Пополни запас',
          data: { data: 'goes here' },  
        },
        trigger: null,
      });
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
  <View className="border-b flex-row border-[#DADADA] pb-2 gap-3 items-center">
    <View className="max-w-[44px] max-h-[44px] border p-3 border-[#4babc550] rounded-full items-center justify-center mr-2">
      <NelatonIcon/>
    </View>

    <View className="flex-row flex-1 items-center justify-center">

      <View className="mr-[14px]">
        <View className="mb-2">
          <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs">Интервал катетеризации:</Text>
        </View>
          <Text style={{fontFamily:'geometria-regular'}} className="text-xs text-black">
          {!userData 
                ? <ActivityIndicator size="small" color="#4BAAC5"/>
                : `каждые ${newIntervalText}` || "Интервал не задан"}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={.6} className="flex-1 max-w-[120px] ml-5" onPress={() => setModalVisible(true)}>
        <Text style={{fontFamily:'geometria-bold'}}
              className={`px-[10px] py-[6px] rounded-[89px] text-center 
              ${warning ? 'text-warning bg-[#ea373724]' : 'text-main-blue bg-[#4babc528]'}`}>
          {userJournal  
          ? (userJournal.initialCathetherAmount.nelaton
              ? `остаток ${userJournal.initialCathetherAmount.nelaton} шт.`
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