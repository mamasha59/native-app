import { View, Text, ActivityIndicator} from "react-native";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../../store/hooks";
import { useFormatInterval } from "../../../hooks/useFormatInterval";

const IntervalInfo = () => {
  const {t} = useTranslation();
  const userData = useAppSelector(user => user.user);
  const interval = useAppSelector(user => user.timerStates.interval);

  const newIntervalText = useFormatInterval({intervalInSeconds: interval!});

  return (
    <View className="items-start mt-2">
      <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs">
        {t("intervalInfoComponent.title")}
      </Text>
      <Text style={{fontFamily:'geometria-bold'}} className="text-xs text-black">
      {!userData 
        ? <ActivityIndicator size="small" color="#4BAAC5"/>
        : `${t("every")} ${newIntervalText}` || "Интервал не задан"}
      </Text>
    </View>
  );
};
export default IntervalInfo;