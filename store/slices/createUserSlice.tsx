import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import initialState from '../initialStates';
import { iUser } from "../../Types";

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
        setNameSurnameBirthday: (state, action: PayloadAction<Pick<iUser,'nameSurname' | 'birthday'>>) => {
            Object.assign(state, action.payload);
        }
    }
});

export const { setUserData, changeField, setNameSurnameBirthday } = createUserSlice.actions;
export default createUserSlice.reducer;
