import { View, Text } from "react-native";
import { useState } from "react";
import { format, set } from "date-fns";

import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setMorningNoticeTime } from "../../../store/slices/nightStateSlice";

const TimeOfNotice = () => {
  const nightModeTimeSettings = useAppSelector(state => state.nightOnDoarding);
  const dispatch = useAppDispatch();

  const [showModalSetTimeOfNotice, setShowModalSetTimeOfNotice] = useState<boolean>(false); // попап Конца Сна

  const [intervalTimeOfNotice, setIntervalTimeOfNotice] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
    selectedIndexHour: 7,
    selectedIndexMinutes: 0,
  });

  const handleOpenModSetTimeOfNotice = () => { // открытие попапа Конца Сна
    if(nightModeTimeSettings.morningNotice)
    setShowModalSetTimeOfNotice(!showModalSetTimeOfNotice);
  }

  const createDateFromTime = (selectedIndexHour:number, selectedIndexMinutes:number) => {
    const now = new Date();
    // Используем функцию set для установки нужных значений часа и минуты
    const dateWithTime = set(now, { hours: selectedIndexHour, minutes: selectedIndexMinutes, seconds: 0 });
    return dateWithTime;
  };
  
  const formatDateToTimeString = (date:Date) => {
    const hours = format(date, 'H');
    const minutes = format(date, 'm');
    return `${hours} ч. ${minutes} мин.`;
  };

  const handleSetTimeOfNotice = () => { // при подтверждении интверала Начала сна
    const dateWithTime = createDateFromTime(intervalTimeOfNotice.selectedIndexHour, intervalTimeOfNotice.selectedIndexMinutes);
    const timeStartMorningNotice = formatDateToTimeString(dateWithTime);
    dispatch(setMorningNoticeTime(timeStartMorningNotice))
    handleOpenModSetTimeOfNotice();
  }

  const setText = () => {
    if (nightModeTimeSettings.morningNotice){
      if(nightModeTimeSettings.timeOfMorningNotice){
        return nightModeTimeSettings.timeOfMorningNotice;
      }else{
        return nightModeTimeSettings.timeSleepEnd;
      }
    }else {
      return 'не хочу'
    }
  }
  return ( 
    <View className={`mb-3 ${!nightModeTimeSettings.morningNotice && 'bg-[#b2bec3]'} rounded-xl pt-1 px-1`}>
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
            Укажите время, когда вы хотели бы получить уведомление.
        </Text>
        <ButtonBluBorder
          handlePressButton={handleOpenModSetTimeOfNotice}
          title={setText()}/>
        <ModalSetInterval
                handleOpenModalChangeInterval={handleOpenModSetTimeOfNotice}
                newInterval={intervalTimeOfNotice}
                setNewInterval={setIntervalTimeOfNotice}
                setShowModalSetInterval={setShowModalSetTimeOfNotice}
                showModalSetInterval={showModalSetTimeOfNotice}
                pressSaveButoon={handleSetTimeOfNotice}
                title="Выберите время когда показать уведомление"
                is24Hours
            />
    </View>
  );
};

export default TimeOfNotice;
