import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { iChart, iDairyRecord } from "../../types";

export interface iJournal {
    initialCathetherAmount: {
        nelaton?: number ;
        foley?: number;
    },
    urineDiary: iDairyRecord[],
    urineChart: iChart[],
    drankWaterChart: iChart[],
}

const initialState:iJournal = {
    initialCathetherAmount: {
        nelaton: 0,
        foley: 0
    },
    urineDiary: [],
    urineChart: [
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
    ],
    drankWaterChart: [
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
        {
            timestamp: '',
            value: 0
        },
    ],
}

const journalDataSlice = createSlice({ // TODO обьеденить в одну функцию addChartValueToCurrentDay и addChartValueDrankWaterToCurrentDay
    name: 'journalDataSlice',
    initialState,
    reducers: {
        addCatheter: (state, action: PayloadAction<{ catheterType: 'nelaton' | 'foley'; amount: number }>) => {
            const { catheterType, amount } = action.payload;
            if (catheterType === 'nelaton') {
              state.initialCathetherAmount.nelaton = amount;
            } else if (catheterType === 'foley') {
              state.initialCathetherAmount.foley = amount;
            }
        },
        addUrineDiaryRecord: (state, action: PayloadAction<iDairyRecord>) => {
            state.urineDiary = [action.payload, ...state.urineDiary];
        },
        addChartValueToCurrentDay: (state, action: PayloadAction<iChart>) => {            
            if(action) {
                const foundIndex = state.urineChart.findIndex((e) => new Date(e.timestamp).toDateString() === new Date(action.payload.timestamp).toDateString());
                if (foundIndex !== -1) {
                    state.urineChart[foundIndex] = {
                        timestamp: action.payload.timestamp,
                        value: action.payload.value,
                    };
                } else {
                    state.urineChart.shift();
                    state.urineChart.push({
                        timestamp: action.payload.timestamp,
                        value: action.payload.value,
                    });
                }
            }  
        },
        addChartValueDrankWaterToCurrentDay: (state, action: PayloadAction<iChart>) => {            
            if(action) {
                const foundIndex = state.drankWaterChart.findIndex((e) => new Date(e.timestamp).toDateString() === new Date(action.payload.timestamp).toDateString());
                if (foundIndex !== -1) {
                    state.drankWaterChart[foundIndex] = {
                        timestamp: action.payload.timestamp,
                        value: action.payload.value,
                    };
                } else {
                    state.drankWaterChart.shift();
                    state.drankWaterChart.push({
                        timestamp: action.payload.timestamp,
                        value: action.payload.value,
                    });
                }
            }  
        }
    },

});

export const { addCatheter, addUrineDiaryRecord, addChartValueToCurrentDay, addChartValueDrankWaterToCurrentDay} = journalDataSlice.actions;
export default journalDataSlice.reducer;
