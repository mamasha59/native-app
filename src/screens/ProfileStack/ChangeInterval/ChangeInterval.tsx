import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { useFormatInterval } from "../../../hooks/useFormatInterval";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Alert from "../../../components/Alert/Alert";
import { setInterval } from "../../../store/slices/timerStatesSlice";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import NoticeAlertToChangeInterval from "./NoticeAlertToChangeInterval/NoticeAlertToChangeInterval";
import NoticeAlertIfIntervalLessThanYellow from "./NoticeAlertIfIntervalLessThanYellow/NoticeAlertIfIntervalLessThanYellow";
import { iTimePicker } from "../../../types";

const ChangeInterval = () => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const {interval, yellowInterval} = useAppSelector((state) => state.timerStates);

  const newIntervalText = useFormatInterval({intervalInSeconds: interval}); // return text string interval, like 2 hour 3 min

  const [modalAlert, setModalAlert] = useState<boolean>(false);
  const [showModalSetInterval, setShowModalSetInterval] = useState<boolean>(false);
  const [changeAlert, setChangeAlert] = useState<boolean>(false);

  const [newInterval, setNewInterval] = useState<iTimePicker>({
    selectedIndexHour: 3,
    selectedIndexMinutes: 0,
  })

  const handleModalChangeInterval = () => setShowModalSetInterval(!showModalSetInterval); // open modal set interval
  const handleModalAlert = () => setModalAlert(!modalAlert);


  const handlePressSave = () => {
    const convertedInterval = convertTimeToSeconds();
    const convertedYellowInterval = yellowInterval * 60;

    convertedInterval < convertedYellowInterval ? setChangeAlert(true) : setChangeAlert(false);
    
    handleModalAlert();
    handleModalChangeInterval(); // close modal
  }

  const convertTimeToSeconds = () => {
    const hours = newInterval.selectedIndexHour;   // часы
    const minutes = newInterval.selectedIndexMinutes; // минуты
    const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
    return initialTime;
  }
  
  const handleChangeOptimalInterval = () => {
    const convertedInterval = convertTimeToSeconds();
    
    dispatch(setInterval(convertedInterval));
    handleModalAlert();
  }

  return (
    <>
    <TouchableOpacity onPress={() => handleModalChangeInterval()} activeOpacity={.6}>
      {/* <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-start mb-1">
        {t("profileScreen.profileSettingsComponent.change_interval")}
      </Text> */}
    
      <View className="flex-row">
        <View className="bg-[#048eff] rounded-md flex-1 justify-center mr-[10px]">
          <Text style={{fontFamily:'geometria-regular'}} className="py-2 text-white w-full text-lg text-center">
            {t("profileScreen.profileSettingsComponent.normal_interval")}
          </Text>
        </View>
        <View className="border border-main-blue rounded-md flex-1 justify-center">
          <Text style={{fontFamily:'geometria-bold'}} className="py-2 text-black w-full text-sm text-center">{newIntervalText}</Text>
        </View>
      </View>
    </TouchableOpacity>
      <ModalSetInterval
        handleOpenModalChangeInterval={handleModalChangeInterval}
        newInterval={newInterval}
        setNewInterval={setNewInterval}
        showModalSetInterval={showModalSetInterval}
        pressSaveButton={handlePressSave}
        title={t("firstDataScreen.setIntervalTitle")}
        is24Hours={false}
        key={'profile-screen'}
      />

      <Alert modalAlertState={modalAlert} setModalAlertState={setModalAlert}>
        {changeAlert 
          ? <NoticeAlertIfIntervalLessThanYellow
              newIntervalText={newInterval}
              yellowInterval={yellowInterval}
              handleModalAlert={handleModalAlert}
            />
          : <NoticeAlertToChangeInterval
              handleChangeOptimalInterval={handleChangeOptimalInterval}
              handleModalAlert={handleModalAlert}
              newInterval={newInterval}
              newIntervalText={newIntervalText}
            />
        }
      </Alert>
    </>
  );
};

export default ChangeInterval;