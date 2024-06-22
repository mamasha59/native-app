import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";

import { iDay } from "../../../types/index";
import { day, daysOfWeekEng } from "../../../utils/date";
import { useAppDispatch } from "../../../store/hooks";
import { setCalendareDay } from "../../../store/slices/appStateSlicer";

type iCalendarDay = {e: iDay}

const CalendarDay = ({e}:iCalendarDay) => {
  //TODO при смене языка надо менять locales
  const currentDay = new Date(e.year, e.month.index, e.dayNumber).toLocaleDateString('en-US', {year:'numeric', month: '2-digit', day: '2-digit'});

  const dispatch = useAppDispatch();

  let isCurrentDay = day.getDate() === e.dayNumber && day.getMonth() === e.month.index;

  const selectDate = () => {
    dispatch(setCalendareDay(currentDay));
  }

  return (
    <TouchableOpacity
      onPress={() => selectDate()}
      activeOpacity={0.5}
      className={`${isCurrentDay ? 'bg-main-blue' : 'bg-[#4babc563]'} px-[14px] py-[5px] mb-[20px] mr-[5px] items-center justify-center rounded-md`}>
        <Text
          style={{ fontFamily: `${isCurrentDay ? 'geometria-bold' : 'geometria-regular'}` }}
          className={`${isCurrentDay ? 'color-[#ffff]' : 'color-[#000000]'}  text-[10px]`}>
            {daysOfWeekEng[e.weekNumber].short}
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
