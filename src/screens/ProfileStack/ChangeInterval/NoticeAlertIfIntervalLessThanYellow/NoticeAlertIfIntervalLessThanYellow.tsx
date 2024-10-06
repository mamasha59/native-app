import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { iTimePicker } from "../../../../types";

interface iNoticeAlertIfIntervalLessThanYellow{
    newIntervalText: iTimePicker,
    yellowInterval: number,
    handleModalAlert: () => void,
}

const NoticeAlertIfIntervalLessThanYellow = ({newIntervalText, yellowInterval, handleModalAlert}:iNoticeAlertIfIntervalLessThanYellow) => {
    const {t} = useTranslation();
    
  return (
    <View className="items-center">
        <View className="w-full mb-2">
            <View className="mb-3">
                <View className="flex-row">
                    <Text className="text-base mr-2" style={{fontFamily:'geometria-bold'}}>
                        {t("new_interval").split('')[0].charAt(0).toUpperCase()}{t("new_interval").slice(1)}:
                    </Text>
                    <Text style={{fontFamily:'geometria-bold'}} className="underline text-base">
                        {newIntervalText.selectedIndexHour} {t("hour")} {newIntervalText.selectedIndexMinutes} {t("min")}
                    </Text>
                </View>
                <Text className="text-center text-error" style={{fontFamily:'geometria-regular'}}>
                    меньше чем интервал перед катетеризацией
                </Text>
            </View>
            <Text className="w-full text-center underline text-base mb-3" style={{fontFamily:'geometria-bold'}}>
                {yellowInterval} {t("min")}
            </Text>
            <Text className="w-full mb-2" style={{fontFamily:'geometria-bold'}}>
                - либо измените интервал катетеризации;
            </Text>
            <Text className="w-full mb-2" style={{fontFamily:'geometria-bold'}}>
                - либо измените время "Уведомления перед катетеризацией" на экране "Уведомления";
            </Text>
        </View>
        <TouchableOpacity onPress={handleModalAlert} className="px-8 rounded-md py-4 bg-main-blue">
            <Text style={{fontFamily:'geometria-bold'}} className="w-full text-white">Я понял!</Text>
        </TouchableOpacity>
    </View>
  );
};

export default NoticeAlertIfIntervalLessThanYellow;
