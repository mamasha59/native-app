import { useEffect, useState } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { iChart, iDairyRecord } from '../types';

import { format } from 'date-fns';
import { dateFormat } from '../utils/const';

interface iuseUpdateChart {
    dispatchAction: ActionCreatorWithPayload<iChart>,
    category: keyof iDairyRecord,
}

export const useUpdateChart = ({dispatchAction, category}:iuseUpdateChart) => {
  const [currentDate, setCurrentDate] = useState(format(new Date(), dateFormat).slice(0,10));
  const journalData = useAppSelector((state) => state.journal);
  const dispatch = useAppDispatch();

  useEffect(() => {
      const amountOfDrankWaterPerDay = journalData.urineDiary // сложенное кол-во слитой мочи за текущий день
          .filter(item => item.timeStamp.slice(0,10) === currentDate && item[category])
          .map(e => e[category])
          .reduce((acc,value) => {
              if (typeof acc === 'number' && typeof value === 'number'){
                  return acc + value;
              } else {
                  return 0;
              }
          },0);
  
      if (amountOfDrankWaterPerDay)
          dispatch(dispatchAction({
              timestamp: currentDate,
              value: +amountOfDrankWaterPerDay,
          })
      );
      // Обновляем currentDate каждый день в полночь
      const now = new Date();
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const timeUntilMidnight = nextDay.getTime() - now.getTime();
      
      const timeoutId = setTimeout(() => setCurrentDate(nextDay.toISOString().slice(0,10)), timeUntilMidnight);
     
      return () => clearTimeout(timeoutId); // Очищаем таймер при размонтировании компонента

  }, [journalData.urineDiary.length, currentDate]);
}
