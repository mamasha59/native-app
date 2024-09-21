import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    identifierOfCatheterizationNotice: '',
    identifierOfEveningFluidIntakeNotice: '',
    identifierOfGoalReminderIntervalDuringDay: '',
    identifierOfMorningReminderToDoCatheterization: '',
    identifierOfReducingFluidIntakeBeforeSleep: '',

    daysInAdvanceWhenShowNoticeOfRemainCaths: 7,
    eveningNotificationTimeFluidIntake: '',
    goalReminderIntervalDuringDay: 2,
}

const notificationsSettingsSlice = createSlice({
    name: 'notificationsSettingsSlice',
    initialState,
    reducers: {
        setIdentifierOfCatheterizationNotice: (state, action:PayloadAction<string>) => {
            state.identifierOfCatheterizationNotice = action.payload;
        },
        setIdentifierOfEveningFluidIntakeNotice: (state, action:PayloadAction<string>) => {
            state.identifierOfEveningFluidIntakeNotice = action.payload;
        },
        setIdentifierOfGoalReminderIntervalDuringDay: (state, action:PayloadAction<string>) => {
            state.identifierOfGoalReminderIntervalDuringDay = action.payload;
        },
        setIdentifierOfMorningReminderToDoCatheterization: (state, action:PayloadAction<string>) => {
            state.identifierOfMorningReminderToDoCatheterization = action.payload;
        },
        setIdentifierOfReducingFluidIntakeBeforeSleep: (state, action:PayloadAction<string>) => {
            state.identifierOfReducingFluidIntakeBeforeSleep = action.payload;
        },
        // up block for Notifications Id
        setDaysInAdvanceWhenShowNoticeOfRemainCaths: (state, action:PayloadAction<number>) => {
            state.daysInAdvanceWhenShowNoticeOfRemainCaths = action.payload;
        },
        setEveningTimeOfFluidIntakeNotice: (state, action:PayloadAction<string>) => {
            state.eveningNotificationTimeFluidIntake = action.payload;
        },
        setGoalReminderIntervalDuringDay: (state, action:PayloadAction<number>) => {
            state.goalReminderIntervalDuringDay = action.payload;
        },
    }
});

export const { 
    setDaysInAdvanceWhenShowNoticeOfRemainCaths, 
    setEveningTimeOfFluidIntakeNotice,
    setIdentifierOfCatheterizationNotice,
    setIdentifierOfEveningFluidIntakeNotice,
    setGoalReminderIntervalDuringDay,
    setIdentifierOfGoalReminderIntervalDuringDay,
    setIdentifierOfMorningReminderToDoCatheterization,
    setIdentifierOfReducingFluidIntakeBeforeSleep
} = notificationsSettingsSlice.actions;
export default notificationsSettingsSlice.reducer;
