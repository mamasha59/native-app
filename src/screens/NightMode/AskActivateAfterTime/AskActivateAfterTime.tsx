import { View, Text } from "react-native";
import { useState } from "react";
import { format, set } from "date-fns";

import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTimeWhenAskToActivateNightMode } from "../../../store/slices/nightStateSlice";
import { useTranslation } from "react-i18next";
import { iTimePicker } from "../../../types";

const AskActivateAfterTime = () => {
    const {t} = useTranslation();
    const nightModeTimeSettings = useAppSelector(state => state.nightOnBoarding);
    const dispatch = useAppDispatch();

    const hoursMinutes = nightModeTimeSettings.timeWhenAskToActivate.split(':');
    
    const [showModalAskActivateAfter, setShowModalAskActivateAfter] = useState<boolean>(false); // попап Спрашивать активировать после времени

    const [whenAskToActivateNightMode, setWhenAskToActivateNightMode] = useState<iTimePicker>({
        selectedIndexHour: +hoursMinutes[0],
        selectedIndexMinutes: +hoursMinutes[1],
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
        const minutes = format(date, 'mm');
        return `${hours}:${minutes}`;
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
            {t("nightModeScreen.askActivateAfterTimeComponent.askToActivate")}
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
            showModalSetInterval={showModalAskActivateAfter}
            pressSaveButton={handleSetTimeWhenAsk}
            title={t("nightModeScreen.modal_ask_to_activate_after_time_title")}
            is24Hours
            height={2.6}
        />
    </View>
  );
};

export default AskActivateAfterTime;