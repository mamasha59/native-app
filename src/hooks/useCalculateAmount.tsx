import { useEffect } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { format } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { iChart, iDairyRecord } from '../types';

import { dateFormat } from '../utils/const';

interface iUseUpdateChart {
    dispatchAction: ActionCreatorWithPayload<iChart>,
    category: keyof iDairyRecord,
}

export const useUpdateChart = ({dispatchAction, category}:iUseUpdateChart) => { //TODO whether we need date
  const currentDate = format(new Date(), dateFormat).slice(0,10);
  const journalData = useAppSelector((state) => state.journal);
  const dispatch = useAppDispatch();

  useEffect(() => {
      const amountOfDrankWaterPerDay = journalData.urineDiary // сложенное кол-во слитой мочи за текущий день
          .filter(item => item.timeStamp.slice(0,10) === currentDate && item[category])
          .map(e => {
            if(category === 'amountOfDrankFluids'){
              return e[category].value;
            }else {
              return e[category];
            }
          })
          .reduce((acc, value) => {
            if (typeof acc === 'number' && typeof value === 'string'){
              return acc + +value.split(' ')[0];
            }else {
              return 0
            }
          },0)
          console.log(amountOfDrankWaterPerDay);
          
      if (amountOfDrankWaterPerDay)
        dispatch(dispatchAction({
          timestamp: currentDate,
          value: +amountOfDrankWaterPerDay,
        })
      );

  }, [journalData.urineDiary.length, currentDate]);
}


// .map(e => e[category])
// .reduce((acc,value) => {
//   if (typeof acc === 'number' && typeof value === 'string'){
//       return acc + +value.split(' ')[0];
//   } else {
//       return 0;
