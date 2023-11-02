import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isExist: false,
}

const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
      changeIsExist: (state, action:PayloadAction<boolean>) => {
        state.isExist = action.payload;
      }
    }
})

export const { 
    changeIsExist
    } = appStateSlice.actions; // экспортируем экшены, что бы использовать

export default appStateSlice.reducer; // импортируем сам редьюсер