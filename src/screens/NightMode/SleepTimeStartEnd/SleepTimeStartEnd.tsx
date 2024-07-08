import { View, Text } from "react-native";
import { useState } from "react";
import { format, set, subHours } from "date-fns";

import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTimeSleepEnd, setTimeSleepStart, setTimeWhenAskToActivateNightMode } from "../../../store/slices/nightStateSlice";
import Pencil from "../../../assets/images/iconsComponent/Pencil";

const SleepTimeStartEnd = ({showInfo = true}:{showInfo?:boolean}) => {
    const dispatch = useAppDispatch();
    const nightModeTimeSettings = useAppSelector(state => state.nightOnDoarding);
    
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
        <Text className="text-base" style={{fontFamily:'geometria-bold'}}>Укажите ваше обычное время сна:</Text>
        <View className="flex-row items-center flex-1">
            <Text className="text-lg px-3" style={{fontFamily:'geometria-regular'}}>c</Text>
            <ButtonBluBorder handlePressButton={handleOpenModalStart} title={nightModeTimeSettings.timeSleepStart || 'Выбрать'}/>
            <Text className="text-lg px-3" style={{fontFamily:'geometria-regular'}}>до</Text>
            <ButtonBluBorder handlePressButton={handleOpenModalEnd} title={nightModeTimeSettings.timeSleepEnd || 'Выбрать'}/>
            <View className="w-[40px] h-[40px] items-center justify-center">
                <Pencil/>
            </View>
        </View>

        {showInfo && <View className="mb-3">
            <Text className="text-lg" style={{fontFamily:'geometria-bold'}}>Ночной режим: </Text>
            <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
                Если вы не планируете катетеризацию в ночное время, активируйте ночной режим во время вечерней катетеризации или используя кнопку «Ночной режим» на главном экране.
            </Text>
        </View>}
        <ModalSetInterval
                handleOpenModalChangeInterval={handleOpenModalStart}
                newInterval={intervalOfStartSleep}
                setNewInterval={setIntervalOfStartSleep}
                showModalSetInterval={showModalSetIntervalStart}
                pressSaveButoon={handleSetStartTime}
                title="Выберите время когда вы ложитесь спать"
                is24Hours
            />
        <ModalSetInterval
            handleOpenModalChangeInterval={handleOpenModalEnd}
            newInterval={intervalOfEndSleep}
            setNewInterval={setIntervalOfEndSleep}
            showModalSetInterval={showModalSetIntervalEnd}
            pressSaveButoon={handleSetEndTime}
            title="Выберите время когда вы просыпаетесь"
            is24Hours
        />
    </View>
  );
};

export default SleepTimeStartEnd;