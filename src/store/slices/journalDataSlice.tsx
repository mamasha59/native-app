import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface iJournal {
    leakageReason: string;
    initialCathetherAmount: {
        nelaton?: number ;
        foley?: number;
    }
}

const initialState:iJournal = {
    leakageReason: '',
    initialCathetherAmount: {
        nelaton: 0,
        foley: 0
    }
}

const journalDataSlice = createSlice({
    name: 'journalDataSlice',
    initialState,
    reducers: {
        whyLeakageHappened: (state, action:PayloadAction<string>) => {
            state.leakageReason = action.payload;
        },
        addCatheter: (state, action: PayloadAction<{ catheterType: 'nelaton' | 'foley'; amount: number }>) => {
            const { catheterType, amount } = action.payload;
            if (catheterType === 'nelaton') {
              state.initialCathetherAmount.nelaton = amount;
            } else if (catheterType === 'foley') {
              state.initialCathetherAmount.foley = amount;
            }
          },
    }
});

export const { whyLeakageHappened, addCatheter } = journalDataSlice.actions;
export default journalDataSlice.reducer;
