import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../store/hooks';
import { setInterval } from '../store/slices/timerStatesSlice';
import { iTimePicker } from '../types';

interface iNewInterval<Action extends ActionCreatorWithPayload<number>> {
    newInterval: iTimePicker,
    action: Action,
    setShowModalSetInterval: (state:boolean) => void,
    showModalSetInterval: boolean,
}

export const useSetTimeInterval = <Action extends ActionCreatorWithPayload<number>>({newInterval, action, setShowModalSetInterval, showModalSetInterval }: iNewInterval<Action>) => {
    const dispatch = useAppDispatch();

    let convert;
        convert = (newInterval.selectedIndexHour) + '.' + newInterval.selectedIndexMinutes; // так как числа выбираются по индексу, надо прибавить +1 к часам
        const minutesHours = convert.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
        const hours = +minutesHours[0];   // часы
        const minutes = +minutesHours[1] || 0; // минуты
        const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
        dispatch(action(initialTime));

    setShowModalSetInterval(!showModalSetInterval);

    return initialTime; 
}
