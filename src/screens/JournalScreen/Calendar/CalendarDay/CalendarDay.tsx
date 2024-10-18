import { Text, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { setCalendarDay } from "../../../../store/slices/appStateSlicer";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { iDay } from "../../../../types";
import { dateFormat } from "../../../../utils/const";

type iCalendarDay = {day: iDay}

const CalendarDay = ({day}:iCalendarDay) => {
  const {t} = useTranslation();

  const {calendarDay} = useAppSelector(state => state.appStateSlice);

  const currentDay = format(new Date(day.year, day.month.index, day.dayNumber), dateFormat).slice(0,10);

  const dispatch = useAppDispatch();
  
  const selectDate = () => {
    dispatch(setCalendarDay(currentDay));
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
      onPress={selectDate}
      activeOpacity={0.5}
      className={`${calendarDay === currentDay ? 'bg-main-blue' : 'bg-[#4babc563]'} px-[14px] py-[5px] mr-[5px] flex-grow-0 items-center rounded-md`}>
        <Text
          style={{ fontFamily: `${calendarDay === currentDay ? 'geometria-bold' : 'geometria-regular'}` }}
          className={`${calendarDay === currentDay ? 'text-white' : 'text-black'} text-[10px]`}>
            {daysOfWeek[day.weekNumber].short}
        </Text>
        <Text
          style={{ fontFamily: `${calendarDay === currentDay ? 'geometria-bold' : 'geometria-regular'}` }}
          className={`${calendarDay === currentDay ? 'text-white' : 'text-black'} font-normal text-xl`}>
            {day.dayNumber}
        </Text>
    </TouchableOpacity>
  );
};

export default CalendarDay;