import { useEffect, useState } from 'react';

export const useSevenPreviousDays = (day:Date) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    const sevenDays = () => {
      const days = [];
      for (let index = 0; index <= 6; index++) {
        const previousDay = new Date(day);
        previousDay.setDate(day.getDate() - index);

        const dayOfWeek = previousDay.toLocaleDateString('ru-RU', { month:'short', day:'numeric' });
        days.push(dayOfWeek);
      }
      return days.reverse();
    }
    const calculatedWeekDays = sevenDays();
    setWeekDays(calculatedWeekDays);
  }, [day]);

  return weekDays;
};
