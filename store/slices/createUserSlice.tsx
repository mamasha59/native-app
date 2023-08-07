import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { iUser } from "../../Types";

const initialState:iUser = { // пробелы для удобства, экраны по порядку
    weight: 0,
    height: 0,
    sex: '',
    age: 0,
    //
    volume: 0,
    catetorType: '',
    catetorSize: 0,
    //
    amount: 0,
    interval: 0,
    useAtNight: '',
    urineMeasure: 0,
    //
}

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
        secondDataScreen: (state, action:PayloadAction<Pick<iUser, 'volume' | 'catetorType' | 'catetorSize'>>) => {
            const { volume, catetorType, catetorSize } = action.payload;
            state.volume = volume;
            state.catetorType = catetorType;
            state.catetorSize = catetorSize;
        },
        thirdDataScreen: (state, action:PayloadAction<Pick<iUser, 'amount' | 'interval' | 'useAtNight' | 'urineMeasure'>>) => {
            const { amount, interval, useAtNight, urineMeasure } = action.payload;
            state.amount = amount;
            state.interval = interval;
            state.useAtNight = useAtNight;
            state.urineMeasure = urineMeasure;
        },
    }
})

export const { firstDataScreen, secondDataScreen, thirdDataScreen } = createUserSlice.actions; // экспортируем экшены, что бы использовать

export default createUserSlice.reducer; // импортируем сам редьюсер