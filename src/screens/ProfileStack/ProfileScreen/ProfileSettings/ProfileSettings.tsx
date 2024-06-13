import { Text, Alert } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";
import { useRef, RefObject, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import ChangeInterval from "./ChangeInterval/ChangeInterval";
import ProfileSelect from "./ProfileSelect/ProfileSelect";
import { setInterval } from "../../../../store/slices/timerStatesSlice";
import { useFormatInterval } from "../../../../hooks/useFormatInterval";
import { Option } from "../../../../types";
import { setWhetherCountUrine } from "../../../../store/slices/appStateSlicer";
import NightModeSelect from "./NightModeSelect/NightModeSelect";
import ModalSetTime from "../../../../components/ModalSetTime/ModalSetTime";


const ProfileSettings = () => { // TODO clean the code
    const [showModalSetInterval, setShowModalSetInterval] = useState(false);
    const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 3,
        selectedIndexMinutes: 0,
    })
    const dropDownCountUrine:RefObject<IDropdownRef> = useRef(null);

    const settings = useAppSelector((state) => state.appStateSlice); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const interval = useAppSelector((state) => state.timerStates.interval); // берем интервал из стейта (начального экрана)
    const newIntervalText = useFormatInterval({intervalInSeconds: interval}); // хук форматриования интервала, из миллисекунд в строку типа - 4 часа 30 минут
    
    const dispatch = useAppDispatch();

    const handleIsCountUrine = (value:Option) => { // функция при выборе селекта Измерение кол-ва мочи
        dispatch(setWhetherCountUrine({value: value.value, title: value.title}));
        dropDownCountUrine.current && dropDownCountUrine.current.close();
    }

    const handleOpenModalChangeInterval = () => { // при клике на Выбрать новый интервал - открываем попап для выбора нового интервала
        setShowModalSetInterval(!showModalSetInterval);
    }

    const handleChangeOptimalInterval = () => { // при подтверждении нового интервала
            const hours = newInterval.selectedIndexHour;   // часы
            const minutes = newInterval.selectedIndexMinutes; // минуты
            const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
            dispatch(setInterval(initialTime));

            handleOpenModalChangeInterval();
    }

    const createThreeButtonAlert = () => {
        Alert.alert('Давайте уточним.', `Был интервал: ${newIntervalText}, меняем на: ${newInterval.selectedIndexHour} ч. ${newInterval.selectedIndexMinutes} мин. При следующей катетеризации интервал станет ${newInterval.selectedIndexHour} ч. ${newInterval.selectedIndexMinutes} мин. Вы уверены?`, [
            {
                text: 'Я передумал :(',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'Да, меняем!', onPress: handleChangeOptimalInterval},
        ]);
    }

  return (
    <>
    <Text style={{fontFamily:'geometria-regular'}} className="text-black text-xs leading-[14px] mb-[10px]">Режим катетеризации</Text>
    {/*  изменить интервал катетеризации - Оптимальный */}
    <ChangeInterval handleChangeOptimalInterval={handleOpenModalChangeInterval}/>
    <NightModeSelect/>
    {/* измерять мочю селект */} 
    <ProfileSelect 
        selectRef={dropDownCountUrine}
        confirmation={true}
        handleClickOption={handleIsCountUrine}
        title="Измерение кол-ва выделяемой мочи"
        value={settings.urineMeasure.title}
        key={"Измерение кол-ва выделяемой мочи"}
        />
    <ModalSetTime
        newInterval={newInterval}
        setNewInterval={setNewInterval}
        close={handleOpenModalChangeInterval}
        handlePressSave={createThreeButtonAlert}
        showModalSetInterval={showModalSetInterval}
        key={'profilescreen'}
    /> 
  </>
  );
};
export default ProfileSettings;