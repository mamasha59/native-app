import { ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { format, getDate, lastDayOfMonth } from "date-fns";

import { iDay, iMonth } from "../../../../types/index";

import { day } from '../../../../utils/date';
import { useAppDispatch } from "../../../../store/hooks";
import { setCalendareDay } from "../../../../store/slices/appStateSlicer";
import CalendarDay from "../CalendarDay/CalendarDay";
import { dateFormat } from "../../../../utils/const";

interface T { 
  value: string;
  index: number;
}

interface iJournalCalendar {
    setSelectedMonth: ({month}:iMonth) => void;
    month: iMonth;
    months: T[];
}

const ListOfCalendarDays = ({setSelectedMonth, month, months}:iJournalCalendar) => {
    const getCurrentMonth = day.getMonth(); // сегоднящний месяц
    
    const scrollViewRef = useRef<ScrollView>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления
    const dispatch = useAppDispatch();

    let daysArray:iDay[] = createArrayOfDays(day.getDate()); // массив дней от начала месяца до сегодня
    
    function createArrayOfDays(numberOfDay: number) {
        const arrayOfDays = [];
        const currentYear = day.getFullYear();
        const findLastDayOfMonth = lastDayOfMonth(new Date(currentYear, month.index + 1, 0));
        const lastDay = getDate(findLastDayOfMonth);

        for (let i = 1; i <= lastDay; i++) {
          const currentDate = new Date(currentYear, getCurrentMonth, i);
          const weekDay = currentDate.getDay();
          
          arrayOfDays.push({
            id: uuidv4(), // генерируем айди
            dayNumber: i,
            weekNumber: weekDay,
            month: month,
            year: currentYear,
          });
        }
        return getCurrentMonth === month.index ? arrayOfDays.slice(0, numberOfDay) : arrayOfDays;
    }

    const onRefresh = () => { // обновление календаря, тяним тапом по календарю
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      scrollViewRef.current?.scrollTo();
      dispatch(setCalendareDay(format(new Date(), dateFormat).slice(0,10))); // всегда сбрасываем тапом календарь на текущий день
      setSelectedMonth({month: months[getCurrentMonth].value, index: getCurrentMonth});
    };

  return (
    <ScrollView
        scrollEnabled={!refreshing}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        snapToStart={true}
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className={`flex-grow-0 overflow-hidden ${refreshing && 'opacity-70'}`}>

        {daysArray.reverse().map((e) => <CalendarDay key={e.dayNumber} e={e}/>)}

    </ScrollView>
  );
};

export default ListOfCalendarDays;
