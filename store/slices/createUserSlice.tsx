import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

import initialState from '../initialStates';
import { iUser } from "../../Types";

const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        firstDataScreen: (state, action:PayloadAction<Pick<iUser, 'weight' | 'height' | 'sex' | 'age'>>) => {
            const { weight, height, sex, age } = action.payload;
            state.weight = weight;
            state.height = height;
            state.sex = sex;
            state.age = age;
        },
        secondDataScreen: (state, action:PayloadAction<Pick<iUser, 'volume' | 'catheterType' | 'catheterSize'>>) => {
            const { volume, catheterType: catetorType, catheterSize } = action.payload;
            state.volume = volume;
            state.catheterType = catetorType;
            state.catheterSize = catheterSize;
        },
        thirdDataScreen: (state, action:PayloadAction<Pick<iUser, 'interval' | 'useAtNight' | 'urineMeasure'>>) => {
            const { interval, useAtNight, urineMeasure } = action.payload;
            state.interval = interval;
            state.useAtNight = useAtNight;
            state.urineMeasure = urineMeasure;
        },
        changeSex: (state, action:PayloadAction<Pick<iUser,'sex'>>) => {
            const { sex } = action.payload;
            state.sex = sex;
        },
        changeAge: (state, action:PayloadAction<Pick<iUser,'age'>>) => {
            const { age } = action.payload;
            state.age = age;
        },
        changeVolume: (state, action:PayloadAction<Pick<iUser,'volume'>>) => {
            const { volume } = action.payload;
            state.volume = volume;
        },
        changeCatheterType: (state, action:PayloadAction<Pick<iUser,'catheterType'>>) => {
            const { catheterType } = action.payload;
            state.catheterType = catheterType;
        },
        changeCatheterSize: (state, action:PayloadAction<Pick<iUser,'catheterSize'>>) => {
            const { catheterSize } = action.payload;
            state.catheterSize = catheterSize;
        }
    }
})

export const { 
    firstDataScreen,
    secondDataScreen,
    thirdDataScreen,
    changeSex,
    changeAge,
    changeVolume,
    changeCatheterType,
    changeCatheterSize
    } = createUserSlice.actions; // экспортируем экшены, что бы использовать

export default createUserSlice.reducer; // импортируем сам редьюсер