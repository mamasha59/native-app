import { Text, Alert, View } from "react-native";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import ChangeInterval from "./ChangeInterval/ChangeInterval";
import { setInterval } from "../../../../store/slices/timerStatesSlice";
import { useFormatInterval } from "../../../../hooks/useFormatInterval";
import ModalSetInterval from "../../../../components/ModalSetInterval/ModalSetInterval";
import ToggleCannulationAtNight from "../../../../components/ToggleCannulationAtNight/ToggleCannulationAtNight";
import ToggleIsCountUrine from "../../../../components/ToggleIsCountUrine/ToggleIsCountUrine";

const ProfileSettings = () => { // TODO clean the code
    const [showModalSetInterval, setShowModalSetInterval] = useState(false);
    const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 3,
        selectedIndexMinutes: 0,
    })

    const interval = useAppSelector((state) => state.timerStates.interval); // берем интервал из стейта (начального экрана)
    const newIntervalText = useFormatInterval({intervalInSeconds: interval}); // хук форматриования интервала, из миллисекунд в строку типа - 4 часа 30 минут
    
    const dispatch = useAppDispatch();

    const handleModalChangeInterval = () => { // при клике на Выбрать новый интервал - открываем попап для выбора нового интервала
        setShowModalSetInterval(!showModalSetInterval);
    }

    const handleChangeOptimalInterval = () => { // при подтверждении нового интервала
        const hours = newInterval.selectedIndexHour;   // часы
        const minutes = newInterval.selectedIndexMinutes; // минуты
        const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
        dispatch(setInterval(initialTime));

        handleModalChangeInterval();
    }

    const handlePressSave = () => {
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
    <View className="flex-1 w-full">
        <Text style={{fontFamily:'geometria-regular'}} className="text-black text-xs leading-[14px] mb-[10px]">Режим катетеризации</Text>
        {/*  изменить интервал катетеризации - Оптимальный */}
        <ChangeInterval handleChangeOptimalInterval={handleModalChangeInterval}/>
        <ToggleCannulationAtNight/>
        <ToggleIsCountUrine/>
        <ModalSetInterval
            handleOpenModalChangeInterval={handleModalChangeInterval}
            newInterval={newInterval}
            setNewInterval={setNewInterval}
            showModalSetInterval={showModalSetInterval}
            pressSaveButoon={handlePressSave}
            title="Выберите новый интервал"
            is24Hours={false}
            key={'profilescreen'}
        />
  </View>
  );
};
export default ProfileSettings;