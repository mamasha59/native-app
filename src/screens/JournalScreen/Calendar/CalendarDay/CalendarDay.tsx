import { Text, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { setCalendareDay } from "../../../../store/slices/appStateSlicer";
import { useAppDispatch } from "../../../../store/hooks";
import { iDay } from "../../../../types";
import { day } from "../../../../utils/date";
import { dateFormat } from "../../../../utils/const";

type iCalendarDay = {e: iDay}

const CalendarDay = ({e}:iCalendarDay) => {
  const {t} = useTranslation()
  const currentDay = format( new Date(e.year, e.month.index, e.dayNumber), dateFormat).slice(0,10);
  
  const dispatch = useAppDispatch();

  let isCurrentDay = day.getDate() === e.dayNumber && day.getMonth() === e.month.index;

  const selectDate = () => {
    dispatch(setCalendareDay(currentDay));
  }

  const daysOfWeek = [
    { value: t("weekDays.sun"), short: t("weekDays.sun") },
    { value: t("weekDays.mon"), short: t("weekDays.mon") },
    { value: t("weekDays.tue"), short: t("weekDays.tue") },
    { value: t("weekDays.wed"), short: t("weekDays.wed") },
    { value: t("weekDays.thu"), short: t("weekDays.thu") },
    { value: t("weekDays.fri"), short: t("weekDays.fri") },
    { value: t("weekDays.sat"), short: t("weekDays.sat") },
];

  return (
    <TouchableOpacity
      onPress={() => selectDate()}
      activeOpacity={0.5}
      className={`${isCurrentDay ? 'bg-main-blue' : 'bg-[#4babc563]'} px-[14px] py-[5px] mb-[20px] mr-[5px] items-center justify-center rounded-md`}>
        <Text
          style={{ fontFamily: `${isCurrentDay ? 'geometria-bold' : 'geometria-regular'}` }}
          className={`${isCurrentDay ? 'color-[#ffff]' : 'color-[#000000]'}  text-[10px]`}>
            {daysOfWeek[e.weekNumber].short}
        </Text>
        <Text
          style={{ fontFamily: `${isCurrentDay ? 'geometria-bold' : 'geometria-regular'}` }}
          className={`${isCurrentDay ? 'color-[#ffff]' : 'color-[#000000]'} font-normal text-xl`}>
            {e.dayNumber}
        </Text>
    </TouchableOpacity>
  );
};

export default CalendarDay;
