import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator} from "react-native";
import * as Notifications from 'expo-notifications';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCatheter } from "../../../store/slices/journalDataSlice";
import { useFormatInterval } from "../../../hooks/useFormatInterval";
import ModalAddCatheter from "../../../components/ModalAddCatheter/ModalAddCatheter";

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
  <View className="flex-row pb-2">
    <View className="flex-1 items-start mt-2">
      <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs">Интервал катетеризации:</Text>
      <Text style={{fontFamily:'geometria-bold'}} className="text-xs text-black">
      {!userData 
            ? <ActivityIndicator size="small" color="#4BAAC5"/>
            : `каждые ${newIntervalText}` || "Интервал не задан"}
      </Text>
    </View>
    {/* ПОПАП ПОПОЛНИТЬ КАТЕТОРЫ */}
    <ModalAddCatheter
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