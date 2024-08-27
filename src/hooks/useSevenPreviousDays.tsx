import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';

export const useSevenPreviousDays = (day:Date) => {
  const {setLanguage} = useAppSelector(state => state.appStateSlice);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    const sevenDays = () => {
      const days = [];
      for (let index = 0; index <= 6; index++) {
        const previousDay = new Date(day);
        previousDay.setDate(day.getDate() - index);

        const dayOfWeek = previousDay.toLocaleDateString(setLanguage.id!, { month:'short', day:'numeric' });
        days.push(dayOfWeek);
      }
      return days.reverse();
    }
    if (setLanguage?.id) {
      const calculatedWeekDays = sevenDays();
      setWeekDays(calculatedWeekDays);
    }
  }, [day, setLanguage]);

  return weekDays;
};
