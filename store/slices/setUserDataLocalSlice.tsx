import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import { iUser } from "../../Types";
import initialState from "../initialStates";

const setUserDataFromStorage = createSlice({
    name: 'setUserFromLocalStorage',
    initialState,
    reducers: {
        setUserData: (state, action:PayloadAction<iUser>) => {
        return {
            ...state,
            ...action.payload
        };
        },
    }
})

export const { 
    setUserData,
    } = setUserDataFromStorage.actions; // экспортируем экшены, что бы использовать

export default setUserDataFromStorage.reducer; // импортируем сам редьюсер