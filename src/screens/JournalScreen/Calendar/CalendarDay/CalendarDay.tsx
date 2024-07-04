import { Text, TouchableOpacity } from "react-native";

import { setCalendareDay } from "../../../../store/slices/appStateSlicer";
import { useAppDispatch } from "../../../../store/hooks";
import { iDay } from "../../../../types";
import { day, daysOfWeekEng } from "../../../../utils/date";
import { format } from "date-fns";
import { dateFormat } from "../../../../utils/const";

type iCalendarDay = {e: iDay}

const CalendarDay = ({e}:iCalendarDay) => {
  //TODO при смене языка надо менять locales
  const currentDay = format( new Date(e.year, e.month.index, e.dayNumber), dateFormat).slice(0,10);
  
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
