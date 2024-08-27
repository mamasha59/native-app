import { Text, View } from "react-native";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import ChangeInterval from "./ChangeInterval/ChangeInterval";
import { setInterval } from "../../../../store/slices/timerStatesSlice";
import { useFormatInterval } from "../../../../hooks/useFormatInterval";
import ModalSetInterval from "../../../../components/ModalSetInterval/ModalSetInterval";
import ToggleCannulationAtNight from "../../../../components/ToggleCannulationAtNight/ToggleCannulationAtNight";
import ToggleIsCountUrine from "../../../../components/ToggleIsCountUrine/ToggleIsCountUrine";
import Alert from "../../../../components/Alert/Alert";
import DoubleButton from "../../../../components/DoubleButton/DoubleButton";

const ProfileSettings = () => {
    const [showModalSetInterval, setShowModalSetInterval] = useState<boolean>(false);
    const [modalAlert, setModalAlert] = useState<boolean>(false);

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

    const handleModalAlert = () => { // handle modal alert
        setModalAlert(!modalAlert);
    }

    const handleChangeOptimalInterval = () => { // при подтверждении нового интервала
        const hours = newInterval.selectedIndexHour;   // часы
        const minutes = newInterval.selectedIndexMinutes; // минуты
        const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
        dispatch(setInterval(initialTime));
        handleModalAlert();
    }

    const denyChangeInterval = () => {
        handleModalAlert();
    }

    const handlePressSave = () => {
        handleModalAlert();
        handleModalChangeInterval();
    }
    
  return (
    <View className="flex-1 w-full">
        <ChangeInterval handleChangeOptimalInterval={handleModalChangeInterval}/>
        <ToggleCannulationAtNight/>
        <ToggleIsCountUrine/>
        <ModalSetInterval
            handleOpenModalChangeInterval={handleModalChangeInterval}
            newInterval={newInterval}
            setNewInterval={setNewInterval}
            showModalSetInterval={showModalSetInterval}
            pressSaveButton={handlePressSave}
            title="Выберите новый интервал"
            is24Hours={false}
            key={'profilescreen'}
        />
        <Alert modalAlertState={modalAlert} setModalAlertState={setModalAlert}>
            <View className="justify-center items-center flex-1 mb-5">
                <Text style={{fontFamily:'geometria-regular'}} className="mb-2">
                    Давайте уточним, 
                </Text>
                <Text style={{fontFamily:'geometria-bold'}} className="w-full mb-1 text-lg">
                    Был интервал: {newIntervalText}
                </Text> 
                <Text style={{fontFamily:'geometria-bold'}} className="w-full mb-2 text-lg">
                    Меняем на: {newInterval.selectedIndexHour} ч. {newInterval.selectedIndexMinutes} мин.
                </Text>
                <Text style={{fontFamily:'geometria-regular'}} className="w-full mb-2">
                    При следующей катетеризации интервал станет:
                </Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-lg border-b border-main-blue mb-2">
                    {newInterval.selectedIndexHour} ч. {newInterval.selectedIndexMinutes} мин.
                </Text>
                <Text style={{fontFamily:'geometria-regular'}}>
                    Вы уверены?
                </Text>
            </View>
            <DoubleButton
                showIcon={false}
                textOfLeftButton="Я подумаю"
                handlePressLeftButton={denyChangeInterval}
                textOfRightButton="Меняем!"
                handlePressRightButton={handleChangeOptimalInterval}
            />
        </Alert>
    </View>
  );
};
export default ProfileSettings;