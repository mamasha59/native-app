import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    leakageReason: ''
}

const journalDataSlice = createSlice({
    name: 'journalDataSlice',
    initialState,
    reducers: {
        whyLeakageHappened: (state, action:PayloadAction<string>) => {
            state.leakageReason = action.payload
        }
    }
});

export const { whyLeakageHappened } = journalDataSlice.actions;
export default journalDataSlice.reducer;
