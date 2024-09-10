import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { useFormatInterval } from "../../../hooks/useFormatInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Alert from "../../../components/Alert/Alert";
import DoubleButton from "../../../components/DoubleButton/DoubleButton";
import { setInterval } from "../../../store/slices/timerStatesSlice";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";

const ChangeInterval = () => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const interval = useAppSelector((state) => state.timerStates.interval);

  const newIntervalText = useFormatInterval({intervalInSeconds: interval}); // return text string interval, like 2 hour 3 min

  const [modalAlert, setModalAlert] = useState<boolean>(false);
  const [showModalSetInterval, setShowModalSetInterval] = useState<boolean>(false);

  const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
    selectedIndexHour: 3,
    selectedIndexMinutes: 0,
  })

  const handleModalChangeInterval = () => setShowModalSetInterval(!showModalSetInterval); // open modal set interval
  const handleModalAlert = () => setModalAlert(!modalAlert);

  const handlePressSave = () => {
    handleModalAlert();
    handleModalChangeInterval();
  }
  
  const handleChangeOptimalInterval = () => { // при подтверждении нового интервала
    const hours = newInterval.selectedIndexHour;   // часы
    const minutes = newInterval.selectedIndexMinutes; // минуты
    const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
    dispatch(setInterval(initialTime));
    handleModalAlert();
  }

  return (
    <>
      <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-start mb-1">
        {t("profileScreen.profileSettingsComponent.change_interval")}
      </Text>
    
      <View className="flex-row items-center">
        <View className="bg-[#048eff] rounded-2xl min-w-[185px] items-center flex-1 justify-center mr-[10px]">
          <Text style={{fontFamily:'geometria-regular'}} className="py-2 text-[#fff] w-full text-lg text-center">
            {t("profileScreen.profileSettingsComponent.normal_interval")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleModalChangeInterval()}
          activeOpacity={.6}
          className="border border-main-blue rounded-2xl min-w-[150px] max-h-11 h-full flex-1 justify-center items-center">
            <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{newIntervalText}</Text>
        </TouchableOpacity>
      </View>

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
          handlePressLeftButton={handleModalAlert}
          textOfRightButton="Меняем!"
          handlePressRightButton={handleChangeOptimalInterval}
        />
      </Alert>
    </>
  );
};

export default ChangeInterval;