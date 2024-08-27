import { View, Text } from "react-native";
import { useState } from "react";
import { format, set, subHours } from "date-fns";
import { useTranslation } from "react-i18next";

import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTimeSleepEnd, setTimeSleepStart, setTimeWhenAskToActivateNightMode } from "../../../store/slices/nightStateSlice";
import Pencil from "../../../assets/images/iconsComponent/Pencil";

const SleepTimeStartEnd = ({showInfo = true}:{showInfo?:boolean}) => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const nightModeTimeSettings = useAppSelector(state => state.nightOnBoarding);
    
    const [intervalOfStartSleep, setIntervalOfStartSleep] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 22,
        selectedIndexMinutes: 0,
    });
    
    const [intervalOfEndSleep, setIntervalOfEndSleep] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 7,
        selectedIndexMinutes: 0,
    });

    const [showModalSetIntervalStart, setShowModalSetIntervalStart] = useState<boolean>(false); // попап Начала Сна
    const [showModalSetIntervalEnd, setShowModalSetIntervalEnd] = useState<boolean>(false); // попап Конца Сна

    const handleOpenModalStart = () => { // открытие попапа Начала Сна
        setShowModalSetIntervalStart(!showModalSetIntervalStart);
    }

    const handleOpenModalEnd = () => { // открытие попапа Конца Сна
        setShowModalSetIntervalEnd(!showModalSetIntervalEnd);
    }

    const createDateFromTime = (selectedIndexHour:number, selectedIndexMinutes:number) => { // создает дату со временем типа 2024-06-14T19:00:00.497Z
        const now = new Date();
        const dateWithTime = set(now, { hours: selectedIndexHour, minutes: selectedIndexMinutes, seconds: 0 });
        return dateWithTime;
    };
      
    const formatDateToTimeString = (date:Date) => {
        const hours = format(date, 'H');
        const minutes = format(date, 'mm');
        return `${hours}:${minutes}`;
    };
    
    const handleSetStartTime = () => { // при подтверждении интверала Начала сна
        const dateWithTime = createDateFromTime(intervalOfStartSleep.selectedIndexHour, intervalOfStartSleep.selectedIndexMinutes);        
        const timeStartSleep = formatDateToTimeString(dateWithTime);
        const timeWhenAskActivate = formatDateToTimeString(subHours(dateWithTime, 2)); // вычитаем два часа до сна что бы определить время уведомления
        
        dispatch(setTimeWhenAskToActivateNightMode(timeWhenAskActivate));
        dispatch(setTimeSleepStart(timeStartSleep));
        handleOpenModalStart();
    }

    const handleSetEndTime = () => { // при подтверждении интверала Конца сна
        const dateWithTime = createDateFromTime(intervalOfEndSleep.selectedIndexHour, intervalOfEndSleep.selectedIndexMinutes);
        const time = formatDateToTimeString(dateWithTime)
        dispatch(setTimeSleepEnd(time));
        handleOpenModalEnd()
    }

  return (
    <View className="flex-1">
        <Text className="text-base" style={{fontFamily:'geometria-bold'}}>
            {t('componentSleepTimeStartEnd.title')}
        </Text>
        <View className="flex-row items-center flex-1">
            <Text className="text-lg px-3" style={{fontFamily:'geometria-regular'}}>{t('componentSleepTimeStartEnd.from')}</Text>
            <ButtonBluBorder handlePressButton={handleOpenModalStart} title={nightModeTimeSettings.timeSleepStart || t('componentSleepTimeStartEnd.select')}/>
            <Text className="text-lg px-3" style={{fontFamily:'geometria-regular'}}>{t('componentSleepTimeStartEnd.to')}</Text>
            <ButtonBluBorder handlePressButton={handleOpenModalEnd} title={nightModeTimeSettings.timeSleepEnd || t('componentSleepTimeStartEnd.select')}/>
            <View className="w-[40px] h-[40px] items-center justify-center">
                <Pencil/>
            </View>
        </View>

        {showInfo && <View className="mb-3">
            <Text className="text-lg" style={{fontFamily:'geometria-bold'}}>{t("night_mode")}:</Text>
            <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
                {t("componentSleepTimeStartEnd.night_mode_description")}
            </Text>
        </View>}
        <ModalSetInterval
                handleOpenModalChangeInterval={handleOpenModalStart}
                newInterval={intervalOfStartSleep}
                setNewInterval={setIntervalOfStartSleep}
                showModalSetInterval={showModalSetIntervalStart}
                pressSaveButton={handleSetStartTime}
                title="Выберите время когда вы ложитесь спать"
                is24Hours
            />
        <ModalSetInterval
            handleOpenModalChangeInterval={handleOpenModalEnd}
            newInterval={intervalOfEndSleep}
            setNewInterval={setIntervalOfEndSleep}
            showModalSetInterval={showModalSetIntervalEnd}
            pressSaveButton={handleSetEndTime}
            title="Выберите время когда вы просыпаетесь"
            is24Hours
        />
    </View>
  );
};

export default SleepTimeStartEnd;