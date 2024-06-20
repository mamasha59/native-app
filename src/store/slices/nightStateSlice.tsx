import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    cannulationAtNight: true,
    timeSleepStart: 'Выбрать',
    timeSleepEnd: 'Выбрать',
    timeWhenAskToActivate: 'Выбрать',
    morningNotice: true,
    timeOfMorningNotice: 'Выбрать',
    reducingFluidIntakeTimeOfNotice: 2,
    reducingFluidIntake: true,
}

const nightStateSlice = createSlice({
    name: 'nightStateSlice',
    initialState,
    reducers: {
        setWhetherDoCannulationAtNight: (state, action:PayloadAction<boolean>) => {
            state.cannulationAtNight = action.payload
        },
        setTimeSleepStart: (state, action:PayloadAction<string>) => {
            state.timeSleepStart = action.payload;
        },
        setTimeSleepEnd: (state, action:PayloadAction<string>) => {
            state.timeSleepEnd = action.payload
        },
        setTimeWhenAskToActivateNightMode: (state, action:PayloadAction<string>) => {
            state.timeWhenAskToActivate = action.payload
        },
        setMorningNotice: (state, action:PayloadAction<boolean>) => {
            state.morningNotice = action.payload
        },
        setMorningNoticeTime: (state, action:PayloadAction<string>) => {
            state.timeOfMorningNotice = action.payload
        },
        setReducingFluidIntake: (state, action:PayloadAction<boolean>) => {
            state.reducingFluidIntake = action.payload
        },
        setTimeReducingFluidIntakeNotice: (state, action:PayloadAction<number>) => {
            state.reducingFluidIntakeTimeOfNotice = action.payload
        },
    }
});

export const {
    setWhetherDoCannulationAtNight,
    setTimeSleepStart,
    setTimeSleepEnd,
    setTimeWhenAskToActivateNightMode,
    setMorningNotice,
    setReducingFluidIntake,
    setMorningNoticeTime,
    setTimeReducingFluidIntakeNotice
} = nightStateSlice.actions;
export default nightStateSlice.reducer;
