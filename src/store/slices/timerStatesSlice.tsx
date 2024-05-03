import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    startFromCountdown: true,
    intervalDifference: 0,
    initialStripWhenCloseApp: 0,
    interval: 0,
}

const timerStatesSlice = createSlice({
    name: 'timerStatesSlice',
    initialState,
    reducers: {
        whetherStartFromCountdown : (state, action:PayloadAction<boolean>) => {
            state.startFromCountdown = action.payload;
        },
        setIntervalDifference: (state, action) => {
            state.intervalDifference = action.payload;
        },
        setInitialStripWhenCloseApp: (state, action) => {
            state.initialStripWhenCloseApp = action.payload;
        },
        setInterval: (state, action) => {
            state.interval = action.payload;
        }
    }
});

export const { whetherStartFromCountdown, setIntervalDifference, setInitialStripWhenCloseApp, setInterval } = timerStatesSlice.actions;
export default timerStatesSlice.reducer;
