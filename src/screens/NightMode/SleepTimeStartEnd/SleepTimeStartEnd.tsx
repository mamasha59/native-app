import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { addDays, addMinutes, differenceInHours, differenceInMinutes, format, parse, set, subHours } from "date-fns";
import { useTranslation } from "react-i18next";

import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTimeOfNoticeAtNightOneTime, setTimeSleepEnd, setTimeSleepStart, setTimeWhenAskToActivateNightMode } from "../../../store/slices/nightStateSlice";
import Pencil from "../../../assets/images/iconsComponent/Pencil";
import { day } from "../../../utils/date";

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

    const [calculatedOnceTimeNoticeAtNight, setCalculatedOnceTimeNoticeAtNight] = useState<{sleepTimeStart:string,endTimeStart:string}>({
        sleepTimeStart: '',
        endTimeStart: ''
    });

    useEffect(() => {
        if (calculatedOnceTimeNoticeAtNight.sleepTimeStart && calculatedOnceTimeNoticeAtNight.endTimeStart){
            const dateStart = parse(calculatedOnceTimeNoticeAtNight.sleepTimeStart, 'HH:mm', day);
            let dateEnd = parse(calculatedOnceTimeNoticeAtNight.endTimeStart, 'HH:mm', day);
            // Если время окончания раньше времени начала, добавляем 1 день к времени окончания
            if (dateEnd < dateStart) {
                dateEnd = addDays(dateEnd, 1); // add one day, that means that wake up time on the nex day in the morning
            }
            // found total time of sleep
            const totalTimeOfSleep = differenceInMinutes(dateEnd, dateStart);
            // Находим середину, поделив разницу пополам
            const halfDifference = totalTimeOfSleep / 2;

            // We add half the difference to the start time to find the midpoint
            const middleTime = addMinutes(dateStart, halfDifference);
            if (middleTime)
            dispatch(setTimeOfNoticeAtNightOneTime(middleTime.toTimeString().slice(0, 5)));
        }
    },[calculatedOnceTimeNoticeAtNight]);

    const [showModalSetIntervalStart, setShowModalSetIntervalStart] = useState<boolean>(false); // попап Начала Сна
    const [showModalSetIntervalEnd, setShowModalSetIntervalEnd] = useState<boolean>(false); // попап Конца Сна

    const handleOpenModalStart = () => { // modal set time Start of Sleep
        setShowModalSetIntervalStart(!showModalSetIntervalStart);
    }

    const handleOpenModalEnd = () => { // modal set time of End Sleep
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
        const timeStartSleep = formatDateToTimeString(dateWithTime);// time start sleep
        const timeWhenAskActivate = formatDateToTimeString(subHours(dateWithTime, 2)); // take 2 hours from time
        
        setCalculatedOnceTimeNoticeAtNight({sleepTimeStart: timeStartSleep, endTimeStart: calculatedOnceTimeNoticeAtNight.endTimeStart});
        dispatch(setTimeWhenAskToActivateNightMode(timeWhenAskActivate)); // set time to component - time when ask to activate
        dispatch(setTimeSleepStart(timeStartSleep)); // save time start sleep in store redux
        handleOpenModalStart();
    }

    const handleSetEndTime = () => { // при подтверждении интверала Конца сна
        const dateWithTime = createDateFromTime(intervalOfEndSleep.selectedIndexHour, intervalOfEndSleep.selectedIndexMinutes);
        const time = formatDateToTimeString(dateWithTime);

        setCalculatedOnceTimeNoticeAtNight({sleepTimeStart:calculatedOnceTimeNoticeAtNight.sleepTimeStart,endTimeStart: time});
        dispatch(setTimeSleepEnd(time));
        handleOpenModalEnd();
    }

  return (
    <View className="flex-1">
        <Text className="text-base" style={{fontFamily:'geometria-bold'}}>
            {t('componentSleepTimeStartEnd.title')}
        </Text>
        <View className="flex-row items-center flex-1">
            <Text className="text-lg px-3" style={{fontFamily:'geometria-regular'}}>{t('componentSleepTimeStartEnd.from')}</Text>
            <ButtonBluBorder
                handlePressButton={handleOpenModalStart}
                title={nightModeTimeSettings.timeSleepStart || t('componentSleepTimeStartEnd.select')}/>
            <Text className="text-lg px-3" style={{fontFamily:'geometria-regular'}}>{t('componentSleepTimeStartEnd.to')}</Text>
            <ButtonBluBorder
                handlePressButton={handleOpenModalEnd}
                title={nightModeTimeSettings.timeSleepEnd || t('componentSleepTimeStartEnd.select')}/>
            <View className="w-[40px] h-[40px] items-center justify-center">
                <Pencil/>
            </View>
        </View>

        {showInfo && 
        <View className="mb-3">
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
            title={t("nightModeScreen.modal_title_set_time_of_start_sleep")}
            is24Hours
            />
        <ModalSetInterval
            handleOpenModalChangeInterval={handleOpenModalEnd}
            newInterval={intervalOfEndSleep}
            setNewInterval={setIntervalOfEndSleep}
            showModalSetInterval={showModalSetIntervalEnd}
            pressSaveButton={handleSetEndTime}
            title={t("nightModeScreen.modal_title_set_time_of_end_sleep")}
            is24Hours
        />
    </View>
  );
};

export default SleepTimeStartEnd;