import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { format } from "date-fns";

interface iAppStateSlicer {
  isExist: boolean,
  open: boolean,
  ifCountUrinePopupLiquidState: boolean,
  urineMeasure: boolean,
  calendareDay: string,
  tabBarBadgeJournalScreen: number,
  intervalWhenCloseApp: string,
  stateOfTimerTitleForFirstTimeInApp: boolean,
  cannulationAtNight: {
    value: boolean,
    timeStamp: string,
  },
  dayGoalOfDrinkWater: number,
  scaleLiquidPopup: boolean,
  openModalNightMode: boolean,
  helperForModalTurnOnNightMode: boolean,
}

const initialState:iAppStateSlicer = {
    isExist: false,                        // есть ли юзер в локал сторедж
    open: false,                          // состояние попапа жидкости
    ifCountUrinePopupLiquidState: false, // состояние что бы изменить вид попапа Слитой мочи
    calendareDay: format(new Date(), 'MM/dd/yyyy HH:mm:ss').slice(0,10), // дефолтное состояние календаря, текущий день
    tabBarBadgeJournalScreen: 0,
    intervalWhenCloseApp: '',
    stateOfTimerTitleForFirstTimeInApp: false,
    cannulationAtNight: {
      value: true,
      timeStamp: format(new Date(), 'MM/dd/yyyy HH:mm:ss')
    },
    urineMeasure: false,
    dayGoalOfDrinkWater: 1000,
    scaleLiquidPopup: false,
    openModalNightMode: false,
    helperForModalTurnOnNightMode: false,

}
const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
      changeIsExist: (state, action:PayloadAction<boolean>) => { // главное состояине приложение, 
        state.isExist = action.payload;
      },
      setWhetherCountUrine: (state, action:PayloadAction<boolean>) => {
        state.urineMeasure = action.payload;
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
      },
      switchCannulationAtNightNight: (state, action:PayloadAction<{ value: boolean, timeStamp: string}>) => {
          state.cannulationAtNight = {timeStamp: action.payload.timeStamp, value: action.payload.value}
      },
      setDayGoalOfDrinkWater: (state, action:PayloadAction<number>) => {
        state.dayGoalOfDrinkWater = action.payload;
      },
      changeScalePopup: (state, action:PayloadAction<boolean>) => {
        state.scaleLiquidPopup = action.payload;
      },
      switchNightModeModal: (state, action:PayloadAction<boolean>) => {
        state.openModalNightMode = action.payload;
      },
      setHelperForModalTurnOnNightMode: (state, action:PayloadAction<boolean>) => {
        state.helperForModalTurnOnNightMode = action.payload;
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
    changeStateOfTimerTitleForFirstTimeInApp,
    switchCannulationAtNightNight,
    setWhetherCountUrine,
    setDayGoalOfDrinkWater,
    changeScalePopup,
    switchNightModeModal,
    setHelperForModalTurnOnNightMode
    } = appStateSlice.actions; // экспортируем экшены, что бы использовать

export default appStateSlice.reducer; // импортируем сам редьюсер