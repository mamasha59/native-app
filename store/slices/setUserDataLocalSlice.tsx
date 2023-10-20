import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import { iUser } from "../../Types";
import initialState from "../initialStates";

const setUserDataFromStorage = createSlice({
    name: 'setUserFromLocalStorage',
    initialState,
    reducers: {
        setUserData: (state, action:PayloadAction<iUser>) => {
            const { weight, height, sex, age } = action.payload;
            state.weight = weight;
            state.height = height;
            state.sex = sex;
            state.age = age;
        },
    }
})

export const { 
    setUserData,
    } = setUserDataFromStorage.actions; // экспортируем экшены, что бы использовать

export default setUserDataFromStorage.reducer; // импортируем сам редьюсер