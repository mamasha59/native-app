import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isExist: false, // есть ли юзер в локал сторедж
    open: false, // состояние попапа жидкости
    ifCountUrinePopupLiquidState: false, // состояние что бы изменить вид попапа Слитой мочи
    calendareDay: '',
    tabBarBadgeJournalScreen: 0,
}

const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
      changeIsExist: (state, action:PayloadAction<boolean>) => {
        state.isExist = action.payload;
      },
      popupLiquidState: (state, action:PayloadAction<boolean>) => {
        state.open = action.payload;
      },
      ifCountUrineChangeState: (state, action:PayloadAction<boolean>) => {
        state.ifCountUrinePopupLiquidState = action.payload;
      },
      setCalendareDay: (state, action:PayloadAction<string>) => {
        state.calendareDay = action.payload;
      },
      addBadgesJournalScreen: (state, action:PayloadAction<number>) => {
        if(action.payload > 0) {
          state.tabBarBadgeJournalScreen = action.payload + state.tabBarBadgeJournalScreen;
        }
      },
      resetBadges: (state) => {
        state.tabBarBadgeJournalScreen = 0;
      }
    }
})

export const { 
    changeIsExist,
    popupLiquidState,
    ifCountUrineChangeState,
    setCalendareDay,
    addBadgesJournalScreen,
    resetBadges
    } = appStateSlice.actions; // экспортируем экшены, что бы использовать

export default appStateSlice.reducer; // импортируем сам редьюсер