import { View, Text } from "react-native";
import React from "react";

import DoubleButton from "../../../../components/DoubleButton/DoubleButton";
import { iTimePicker } from "../../../../types";

interface iNoticeAlertToChangeInterval {
    newInterval: iTimePicker,
    newIntervalText: string,
    handleModalAlert: () => void,
    handleChangeOptimalInterval: () => void,
}

const NoticeAlertToChangeInterval = ({newInterval,newIntervalText,handleModalAlert,handleChangeOptimalInterval}:iNoticeAlertToChangeInterval) => {
  return (
    <>
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
    </>
  );
};

export default NoticeAlertToChangeInterval;
