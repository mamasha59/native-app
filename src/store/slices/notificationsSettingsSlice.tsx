import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    identifierOfCatheterizationNotice: '',
    identifierOfMorningReminderToDoCatheterization: '',
    identifierOfReducingFluidIntakeBeforeSleep: '',
    identifierOfOneNotificationAtNight: '',

    eveningFluidIntakeNotice: {
        identifierOfEveningFluidIntakeNotice: '',
        state: true,
        time: '',
    },

    noticeOfGoalReminderDuringDay: {
        identifierOfGoalReminderDuringDay: '',
        state: true,
        interval: 2,
    },

    daysInAdvanceWhenShowNoticeOfRemainCaths: 7,
}

const notificationsSettingsSlice = createSlice({
    name: 'notificationsSettingsSlice',
    initialState,
    reducers: {
        setIdentifierOfCatheterizationNotice: (state, action:PayloadAction<string>) => {
            state.identifierOfCatheterizationNotice = action.payload;
        },

        // ======= \\
        setIdentifierOfEveningFluidIntakeNotice: (state, action:PayloadAction<string>) => {
            state.eveningFluidIntakeNotice.identifierOfEveningFluidIntakeNotice = action.payload;
        },
        isEnabledEveningFluidIntakeNotice: (state, action:PayloadAction<boolean>) => {
            state.eveningFluidIntakeNotice.state = action.payload;
        },
        setEveningTimeOfFluidIntakeNotice: (state, action:PayloadAction<string>) => {
            state.eveningFluidIntakeNotice.time = action.payload;
        },

        // ======= \\
        setIdentifierOfGoalReminderDuringDay: (state, action:PayloadAction<string>) => {
            state.noticeOfGoalReminderDuringDay.identifierOfGoalReminderDuringDay = action.payload;
        },
        setIntervalForGoalReminderDuringDay: (state, action:PayloadAction<number>) => {
            state.noticeOfGoalReminderDuringDay.interval = action.payload;
        },
        isEnabledNoticeOfGoalReminderDuringDay: (state, action:PayloadAction<boolean>) => {
            state.noticeOfGoalReminderDuringDay.state = action.payload;
        },
        // ======= \\

        setIdentifierOfMorningReminderToDoCatheterization: (state, action:PayloadAction<string>) => {
            state.identifierOfMorningReminderToDoCatheterization = action.payload;
        },
        setIdentifierOfReducingFluidIntakeBeforeSleep: (state, action:PayloadAction<string>) => {
            state.identifierOfReducingFluidIntakeBeforeSleep = action.payload;
        },
        setIdentifierOfOneNotificationAtNight: (state, action:PayloadAction<string>) => {
            state.identifierOfOneNotificationAtNight = action.payload;
        },
        // up block for Notifications Id
        setDaysInAdvanceWhenShowNoticeOfRemainCaths: (state, action:PayloadAction<number>) => {
            state.daysInAdvanceWhenShowNoticeOfRemainCaths = action.payload;
        },
    }
});

export const { 
    setDaysInAdvanceWhenShowNoticeOfRemainCaths, 
    setEveningTimeOfFluidIntakeNotice,
    setIdentifierOfCatheterizationNotice,
    setIdentifierOfEveningFluidIntakeNotice,
    setIntervalForGoalReminderDuringDay,
    setIdentifierOfMorningReminderToDoCatheterization,
    setIdentifierOfReducingFluidIntakeBeforeSleep,
    setIdentifierOfOneNotificationAtNight,
    isEnabledEveningFluidIntakeNotice,
    isEnabledNoticeOfGoalReminderDuringDay,
    setIdentifierOfGoalReminderDuringDay
} = notificationsSettingsSlice.actions;
export default notificationsSettingsSlice.reducer;
