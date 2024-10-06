import { View, Text } from "react-native";
import React from "react";

import DoubleButton from "../../../../components/DoubleButton/DoubleButton";
import { iTimePicker } from "../../../../types";
import { useTranslation } from "react-i18next";

interface iNoticeAlertToChangeInterval {
    newInterval: iTimePicker,
    newIntervalText: string,
    handleModalAlert: () => void,
    handleChangeOptimalInterval: () => void,
}

const NoticeAlertToChangeInterval = ({newInterval,newIntervalText,handleModalAlert,handleChangeOptimalInterval}:iNoticeAlertToChangeInterval) => {
    const {t} = useTranslation();

    return (
    <>
        <View className="justify-center items-center flex-1 mb-5">
            <Text style={{fontFamily:'geometria-regular'}} className="mb-2">
                {t("modalAlertChangeCatheterizationInterval.lets_be_clear")}, 
            </Text>
            <Text style={{fontFamily:'geometria-bold'}} className="w-full mb-1 text-lg">
                {t("modalAlertChangeCatheterizationInterval.interval_was")}: {newIntervalText}
            </Text> 
            <Text style={{fontFamily:'geometria-bold'}} className="w-full mb-2 text-lg">
                {t("change")} {t("for")}: {newInterval.selectedIndexHour} {t("hour")} {newInterval.selectedIndexMinutes} {t("min")}
            </Text>
            <Text style={{fontFamily:'geometria-regular'}} className="w-full mb-2">
                {t("modalAlertChangeCatheterizationInterval.next_catheterization_interval_will_be")}:
            </Text>
            <Text style={{fontFamily:'geometria-bold'}} className="text-lg border-b border-main-blue mb-2">
                {newInterval.selectedIndexHour} {t("hour")} {newInterval.selectedIndexMinutes} {t("min")}
            </Text>
            <Text style={{fontFamily:'geometria-regular'}}>
                {t("are_you_sure")}
            </Text>
        </View>
        <DoubleButton
            showIcon={false}
            textOfLeftButton={t("ill_think")}
            handlePressLeftButton={handleModalAlert}
            textOfRightButton={t("change")}
            handlePressRightButton={handleChangeOptimalInterval}
        />
    </>
  );
};

export default NoticeAlertToChangeInterval;
