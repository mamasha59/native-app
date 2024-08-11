import { useEffect } from "react";
import { View, Text, ActivityIndicator} from "react-native";
import * as Notifications from 'expo-notifications';
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../../store/hooks";
import { useFormatInterval } from "../../../hooks/useFormatInterval";

const IntervalInfo = () => {
  const {t} = useTranslation();
  const userData = useAppSelector(user => user.user);
  const interval = useAppSelector(user => user.timerStates.interval);
  const userJournal = useAppSelector(user => user.journal);
  const newIntervalText = useFormatInterval({intervalInSeconds: interval!});

  useEffect(() => {
    if (userJournal.initialCathetherAmount?.nelaton! <= 3) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: `Осталось ${userJournal.initialCathetherAmount.nelaton} катеторов!`,
          body: 'Пополни запас',
          data: { data: 'goes here' },
        },
        trigger: null,
      });
    } else {
    }
  }, [userJournal.initialCathetherAmount?.nelaton, userData.catheterType]);

  return (
  <View className="flex-row pb-2">
    <View className="flex-1 items-start mt-2">
      <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs">
        {t("intervalInfoComponent.title")}
      </Text>
      <Text style={{fontFamily:'geometria-bold'}} className="text-xs text-black">
      {!userData 
        ? <ActivityIndicator size="small" color="#4BAAC5"/>
        : `${t("every")} ${newIntervalText}` || "Интервал не задан"}
      </Text>
    </View>
  </View>
  );
};
export default IntervalInfo;