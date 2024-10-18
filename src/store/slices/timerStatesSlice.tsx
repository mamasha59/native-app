import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { iTimerPartTime } from "../../types";

interface iTimerStatesSlice {
    startFromCountdown: boolean,
    intervalDifference: number,
    interval: number,
    yellowInterval: number,
    showModalSuccess: boolean,
    partTime: iTimerPartTime,
}

const initialState:iTimerStatesSlice = {
    startFromCountdown: true,
    intervalDifference: 0,
    interval: 14400,
    yellowInterval: 15,
    showModalSuccess: false,
    partTime: {
        firstPartTime: false,
        secondPartTime: false,
        thirdPartTime: false,
    }
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
        setInterval: (state, action:PayloadAction<number>) => {
            state.interval = action.payload;
        },
        setShowModalSuccess: (state, action:PayloadAction<boolean>) => {
            state.showModalSuccess = action.payload;
        },
        changeYellowInterval: (state, action:PayloadAction<number>) => {
            state.yellowInterval = action.payload;
        },
        changePartTimeOfTimer: (state, action:PayloadAction<iTimerPartTime>) => {
            state.partTime = action.payload;
        },
    }
});

export const { 
    whetherStartFromCountdown,
    setIntervalDifference,
    setInterval,
    setShowModalSuccess,
    changeYellowInterval,
    changePartTimeOfTimer
} = timerStatesSlice.actions;
export default timerStatesSlice.reducer;
