import { Text, TouchableOpacity } from "react-native";

import { iDay } from "../../Types/index";
import { daysOfWeek } from "../../utils/date";

type iCalendarDay = {e: iDay}

const CalendarDay = ({e}:iCalendarDay) => {
    const day = new Date();
    const isCurrentDay = day.getDate() === e.dayNumber && day.getMonth() === e.month.index;
    
    const takeData = () => {
      console.log(e);     
    }

  return (
    <TouchableOpacity onPress={takeData} activeOpacity={0.5} className={`px-[14px] py-[5px] mb-[30px] mr-[5px] ${isCurrentDay ? 'bg-main-blue' : 'bg-[#4babc563]'} items-center justify-center rounded-md border border-[#112244b3]`}>
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
