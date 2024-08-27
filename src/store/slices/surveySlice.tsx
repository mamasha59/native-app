import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface surveySlice {
    surveyAnswers: { [key: number]: number | undefined },
}

const initialState: surveySlice = {
    surveyAnswers: {},
}

const surveySlice = createSlice({
    name: 'surveySlice',
    initialState,
    reducers: {
        saveAnswer: (state, action:PayloadAction<{ questionId: number; answerId: number }>) => {
            const { questionId, answerId } = action.payload;
            state.surveyAnswers[questionId] = answerId;
          },
        resetAnswers: (state) => {
            state.surveyAnswers = {};
        },
    }
});

export const { saveAnswer, resetAnswers} = surveySlice.actions;
export default surveySlice.reducer;
