import { ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import CalendarDay from "../CalendarDay/CalendarDay";
import { iDay, iMonth } from "../../Types/index";

import { day, getCurrentMonth, months } from '../../utils/date';

interface iJournalCalendar {
    setSelectedMonth: ({month}:iMonth) => void;
    month: iMonth;
}

const JournalCalendar = ({setSelectedMonth, month}:iJournalCalendar) => {

    const scrollViewRef = useRef<ScrollView>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления

    const daysArray:iDay[] | undefined = createArrayOfDays(day.getDate()); // массив дней от начала месяца до сегодня

    function createArrayOfDays(numberOfDay: number) {
        const arrayOfDays = [];
        const currentYear = day.getFullYear();
        // Определяем последний день текущего месяца
        const lastDayOfMonth = new Date(currentYear, month.index + 1, 0).getDate();

        for (let i = 1; i <= lastDayOfMonth; i++) {
        const currentDate = new Date(currentYear, getCurrentMonth, i);
        const weekDay = currentDate.getDay();
        
        arrayOfDays.push({
            dayNumber: i,
            weekNumber: weekDay,
            month: month,
            year: currentYear,
        });
        }
        return getCurrentMonth === month.index ? arrayOfDays.slice(0, numberOfDay) : arrayOfDays;
    }

    const onRefresh = useCallback(() => { // обновление календаря, тяним тапом по календарю
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
        scrollViewRef.current?.scrollTo();
        setSelectedMonth({month: months[getCurrentMonth].value, index: getCurrentMonth});
      }, []);

  return (
    <ScrollView
        scrollEnabled={!refreshing}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        snapToStart={true}
        ref={scrollViewRef}
        horizontal={true}
        className={`flex-grow-0 overflow-hidden ${refreshing && 'opacity-70'}`}>

        {daysArray.reverse().map(e => <CalendarDay key={e.dayNumber} e={e}/>)}

    </ScrollView>
  );
};

export default JournalCalendar;
