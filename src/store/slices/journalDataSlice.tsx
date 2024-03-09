import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { iDairyRecord } from "../../types";

interface iJournal {
    initialCathetherAmount: {
        nelaton?: number ;
        foley?: number;
    },
    urineDiary: iDairyRecord[],
}

const initialState:iJournal = {
    initialCathetherAmount: {
        nelaton: 0,
        foley: 0
    },
    urineDiary: [],
}

const journalDataSlice = createSlice({
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
        }
    }
});

export const { addCatheter, addUrineDiaryRecord } = journalDataSlice.actions;
export default journalDataSlice.reducer;
