import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface iTimerStatesSlice {
    startFromCountdown: boolean,
    intervalDifference: number,
    initialStripWhenCloseApp: number,
    interval: number,
    yellowInterval: number,
    showModalSuccess: boolean,
}

const initialState:iTimerStatesSlice = {
    startFromCountdown: true,
    intervalDifference: 0,
    initialStripWhenCloseApp: 0,
    interval: 14400,
    yellowInterval: 15,
    showModalSuccess: false,
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
        setInterval: (state, action:PayloadAction<number>) => {
            state.interval = action.payload;
        },
        setShowModalSuccess: (state, action:PayloadAction<boolean>) => {
            state.showModalSuccess = action.payload;
        },
        changeYellowInterval: (state, action:PayloadAction<number>) => {
            state.yellowInterval = action.payload;
        },
    }
});

export const { 
    whetherStartFromCountdown,
    setIntervalDifference,
    setInitialStripWhenCloseApp,
    setInterval,
    setShowModalSuccess,
    changeYellowInterval
} = timerStatesSlice.actions;
export default timerStatesSlice.reducer;
