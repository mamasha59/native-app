import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { iSurveyInputs } from "../../types";

interface surveySlice {
    surveyAnswers: { [key: number]: number | undefined },
    surveyInputs: iSurveyInputs,
}

const initialState: surveySlice = {
    surveyAnswers: {},
    surveyInputs: {
        difficulties: '',
        additional: ''
    }
}

const surveySlice = createSlice({
    name: 'surveySlice',
    initialState,
    reducers: {
        saveAnswer: (state, action:PayloadAction<{ questionId: number; answerId: number }>) => {
            const { questionId, answerId } = action.payload;
            state.surveyAnswers[questionId] = answerId;
        },
        setSurveyInputs: (state, action:PayloadAction<iSurveyInputs>) => {
            state.surveyInputs = action.payload
        },
        resetAnswers: (state) => {
            state.surveyAnswers = {};
        },
    }
});

export const { saveAnswer, resetAnswers, setSurveyInputs} = surveySlice.actions;
export default surveySlice.reducer;
