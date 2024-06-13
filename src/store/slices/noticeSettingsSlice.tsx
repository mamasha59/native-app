import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    daysInAdvanceWhenShowNoticeOfRemainCaths: 7
}

const noticeSettingsSlice = createSlice({
    name: 'noticeSettingsSlice',
    initialState,
    reducers: {
        setDaysInAdvanceWhenShowNoticeOfRemainCaths: (state, action:PayloadAction<number>) => {
            state.daysInAdvanceWhenShowNoticeOfRemainCaths = action.payload;
        }
    }
});

export const { setDaysInAdvanceWhenShowNoticeOfRemainCaths } = noticeSettingsSlice.actions;
export default noticeSettingsSlice.reducer;
