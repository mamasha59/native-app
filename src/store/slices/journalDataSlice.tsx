import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { iChart, iDairyRecord, iJournal } from "../../types";

const initialState:iJournal = {
    initialCathetherAmount: {
        nelaton: 0,
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
    modalCustomizePdfDocument: false,
    checkBoxAddSurveyInPdf: false,
}

const journalDataSlice = createSlice({ // TODO обьеденить в одну функцию addChartValueToCurrentDay и addChartValueDrankWaterToCurrentDay
    name: 'journalDataSlice',
    initialState,
    reducers: {
        addCatheter: (state, action: PayloadAction<{ amount: number }>) => {
            const { amount } = action.payload;
            state.initialCathetherAmount.nelaton = amount;
        },
        decreaseCatheterAmount: (state, action: PayloadAction<{ amount: number }>) => {
            const { amount } = action.payload;
            if(state.initialCathetherAmount.nelaton && state.initialCathetherAmount.nelaton > 0){
                state.initialCathetherAmount.nelaton = state.initialCathetherAmount.nelaton - amount;
            }
        },
        addUrineDiaryRecord: (state, action: PayloadAction<iDairyRecord>) => { // добавляем запись в журнал
            state.urineDiary = [action.payload, ...state.urineDiary];            
        },
        addChartValueToCurrentDay: (state, action: PayloadAction<iChart>) => {         
            if(action) {
                const foundIndex = state.urineChart.findIndex((e) => e.timestamp === action.payload.timestamp);
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
                const foundIndex = state.drankWaterChart.findIndex((e) => e.timestamp === action.payload.timestamp);
                
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
        },
        handleModalCustomizePdfDocument: (state, action: PayloadAction<boolean>) => {
            state.modalCustomizePdfDocument = action.payload;
        },
        handleCheckBoxAddSurveyInPdf: (state, action:PayloadAction<boolean>) => {
            state.checkBoxAddSurveyInPdf = action.payload;
        }
    },

});

export const { 
    addCatheter,
    addUrineDiaryRecord,
    addChartValueToCurrentDay,
    addChartValueDrankWaterToCurrentDay,
    decreaseCatheterAmount,
    handleModalCustomizePdfDocument,
    handleCheckBoxAddSurveyInPdf
    } = journalDataSlice.actions;
export default journalDataSlice.reducer;
