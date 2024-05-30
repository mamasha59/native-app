import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import initialState from '../initialStates';
import { iUser } from "../../types";

const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<Partial<iUser>>) => {
            Object.assign(state, action.payload);
        },
        changeField: (state, action: PayloadAction<{ field: keyof iUser; value: string } | undefined>) => {
            if (action.payload) state[action.payload.field] = action.payload.value;
        },
    }
});

export const { setUserData, changeField } = createUserSlice.actions;
export default createUserSlice.reducer;
