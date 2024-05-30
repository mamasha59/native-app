import { View, Text } from "react-native";
import { useState } from "react";
import { format, set } from "date-fns";

import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTimeWhenAskToActivateNightMode } from "../../../store/slices/nightStateSlice";

const AskActivateAfterTime = () => {
    const nightModeTimeSettings = useAppSelector(state => state.nightOnDoarding);
    const dispatch = useAppDispatch();
    
    const [showModalAskActivateAfter, setShowModalAskActivateAfter] = useState<boolean>(false); // попап Спрашивать активировать после времени

    const [whenAskToActivateNightMode, setWhenAskToActivateNightMode] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 21,
        selectedIndexMinutes: 0,
    });

    const handleOpenModalAskToActivateAfterTime = () => { // открытие попапа Активация после
        setShowModalAskActivateAfter(!showModalAskActivateAfter);
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

    const handleSetTimeWhenAsk = () => { // при подтверждении интверала Конца сна
        const dateWithTime = createDateFromTime(whenAskToActivateNightMode.selectedIndexHour, whenAskToActivateNightMode.selectedIndexMinutes);
        const timeWhenAskActivate = formatDateToTimeString(dateWithTime); // вычитаем два часа
        dispatch(setTimeWhenAskToActivateNightMode(timeWhenAskActivate));
        handleOpenModalAskToActivateAfterTime();
    }

  return (
    <View className="mb-3">
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
            Спрашивать об активации ночного режима при катетеризации  после:
        </Text>
        <ButtonBluBorder 
            title={nightModeTimeSettings.timeWhenAskToActivate}
            key={'notice'}
            handlePressButton={handleOpenModalAskToActivateAfterTime}
        />

        <ModalSetInterval
            handleOpenModalChangeInterval={handleOpenModalAskToActivateAfterTime}
            newInterval={whenAskToActivateNightMode}
            setNewInterval={setWhenAskToActivateNightMode}
            setShowModalSetInterval={setShowModalAskActivateAfter}
            showModalSetInterval={showModalAskActivateAfter}
            showAlert={handleSetTimeWhenAsk}
            title="Выберите время когда вы хотите что бы вас спросили включать ночной режим"
            is24Hours
        />
    </View>
  );
};

export default AskActivateAfterTime;
