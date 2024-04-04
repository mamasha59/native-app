import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";

import { iDay } from "../../../types/index";
import { daysOfWeek } from "../../../utils/date";
import { useAppDispatch } from "../../../store/hooks";
import { setCalendareDay } from "../../../store/slices/appStateSlicer";

type iCalendarDay = {e: iDay}

const CalendarDay = ({e}:iCalendarDay) => {
  //TODO выделять выбранный день
    const [selectedDateId, setSelectedDateId] = useState<string>('');
    const dispatch = useAppDispatch();

    const day = new Date();
    let isCurrentDay = day.getDate() === e.dayNumber && day.getMonth() === e.month.index;
    
    const selectDate = (id:string) => {
      setSelectedDateId((prev) => prev = id);
      const calendareDay = new Date(e.year, e.month.index, e.dayNumber).toISOString().slice(0,10);
      dispatch(setCalendareDay(calendareDay));
    }    
  return (
    <TouchableOpacity
      onPress={() => selectDate(e.id)}
      activeOpacity={0.5}
      className={`${e.id === selectedDateId || isCurrentDay ? 'bg-main-blue' : 'bg-[#4babc563]'} px-[14px] py-[5px] mb-[20px] mr-[5px] items-center justify-center rounded-md border border-[#112244b3]`}>
        <Text
          style={{ fontFamily: `${e.id === selectedDateId || isCurrentDay ? 'geometria-bold' : 'geometria-regular'}` }}
          className={`${e.id === selectedDateId || isCurrentDay ? 'color-[#ffff]' : 'color-[#000000]'}  text-[10px]`}>
            {daysOfWeek[e.weekNumber].short}
        </Text>
        <Text
          style={{ fontFamily: `${e.id === selectedDateId || isCurrentDay ? 'geometria-bold' : 'geometria-regular'}` }}
          className={`${e.id === selectedDateId || isCurrentDay ? 'color-[#ffff]' : 'color-[#000000]'} font-normal text-xl`}>
            {e.dayNumber}
        </Text>
    </TouchableOpacity>
  );
};

export default CalendarDay;
