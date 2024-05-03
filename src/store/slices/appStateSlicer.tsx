import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface iAppStateSlicer {
  isExist: boolean,
  open: boolean,
  ifCountUrinePopupLiquidState: boolean,
  calendareDay: string,
  tabBarBadgeJournalScreen: number,
  intervalWhenCloseApp: string,
  stateOfTimerTitleForFirstTimeInApp: boolean,
}

const initialState:iAppStateSlicer = {
    isExist: false, // есть ли юзер в локал сторедж
    open: false,    // состояние попапа жидкости
    ifCountUrinePopupLiquidState: false, // состояние что бы изменить вид попапа Слитой мочи
    calendareDay: new Date().toISOString().slice(0,10), // дефолтное состояние календаря, текущий день
    tabBarBadgeJournalScreen: 0,
    intervalWhenCloseApp: '',
    stateOfTimerTitleForFirstTimeInApp: false,
}
const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
      changeIsExist: (state, action:PayloadAction<boolean>) => { // главное состояине приложение, 
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
      },
      recordIntervalWhenCloseApp: (state, action:PayloadAction<string>) => {
        state.intervalWhenCloseApp = action.payload;
      },
      changeStateOfTimerTitleForFirstTimeInApp: (state, action:PayloadAction<boolean>) => {
        state.stateOfTimerTitleForFirstTimeInApp = action.payload;
      }
    }
})
export const { 
    changeIsExist,
    popupLiquidState,
    ifCountUrineChangeState,
    setCalendareDay,
    addBadgesJournalScreen,
    resetBadges,
    recordIntervalWhenCloseApp,
    changeStateOfTimerTitleForFirstTimeInApp
    } = appStateSlice.actions; // экспортируем экшены, что бы использовать

export default appStateSlice.reducer; // импортируем сам редьюсер