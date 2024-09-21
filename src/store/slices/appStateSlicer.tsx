import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { format } from "date-fns";

import { dateFormat } from "../../utils/const";
import { iLanguage, iUnits } from "../../types";

interface iAppStateSlicer {
  units: iUnits,
  robotText: string,
  setLanguage: iLanguage,
  isExist: boolean,
  open: boolean,
  ifCountUrinePopupLiquidState: boolean,
  urineMeasure: boolean,
  calendarDay: string,
  tabBarBadgeJournalScreen: number,
  stateOfTimerTitleForFirstTimeInApp: boolean,
  cannulationAtNight: {
    value: boolean,
    timeStamp: string,
  },
  dayGoalOfDrinkWater: number,
  scaleLiquidPopup: boolean,
  openModalNightMode: boolean,
  helperForModalTurnOnNightMode: boolean,
  doubleButtonProfileScreenClickable: {
    leftButton: boolean,
    rightButton: boolean,
  },
}

const initialState:iAppStateSlicer = {
    units: {
      title: 'ml',
      id: 'ml'
    },
    robotText:'',
    setLanguage: {
      id: '',
      title: '',
      selected: false,
      icon: '',
    },
    isExist: false,                        // есть ли юзер в локал сторедж
    open: false,                          // состояние попапа жидкости
    ifCountUrinePopupLiquidState: false, // состояние что бы изменить вид попапа Слитой мочи
    calendarDay: format(new Date(), dateFormat).slice(0,10), // дефолтное состояние календаря, текущий день
    tabBarBadgeJournalScreen: 0,
    stateOfTimerTitleForFirstTimeInApp: false,
    cannulationAtNight: {
      value: false,
      timeStamp: format(new Date(), dateFormat)
    },
    urineMeasure: false,
    dayGoalOfDrinkWater: 1500,
    scaleLiquidPopup: false,
    openModalNightMode: false,
    helperForModalTurnOnNightMode: false,
    doubleButtonProfileScreenClickable: {
      leftButton: false,
      rightButton: true,
    },
}

const appStateSlice = createSlice({
    name: 'appStateSlice',
    initialState,
    reducers: {
      switchUnits: (state, action:PayloadAction<iUnits>) => {
        state.units = action.payload;
      },
      activateRobotSpeech: (state, action:PayloadAction<string>) => {
        state.robotText = action.payload;
      },
      setLanguage: (state, action:PayloadAction<iLanguage>) => {
        if (action.payload.id)
        state.setLanguage = action.payload;
      },
      changeIsExist: (state, action:PayloadAction<boolean>) => { // главное состояние приложение, 
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
      setCalendarDay: (state, action:PayloadAction<string>) => {
        state.calendarDay = action.payload;
      },
      addBadgesJournalScreen: (state, action:PayloadAction<number>) => {
        if(action.payload > 0) {
          state.tabBarBadgeJournalScreen = action.payload + state.tabBarBadgeJournalScreen;
        }
      },
      resetBadges: (state) => {
        state.tabBarBadgeJournalScreen = 0;
      },
      changeStateOfTimerTitleForFirstTimeInApp: (state, action:PayloadAction<boolean>) => {
        state.stateOfTimerTitleForFirstTimeInApp = action.payload;
      },
      switchCannulationAtNightMode: (state, action:PayloadAction<{ value: boolean, timeStamp: string}>) => {
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
      },
      switchCheckedButtonProfileScreen: (state, action:PayloadAction<{leftButton:boolean, rightButton:boolean}>) => {
        state.doubleButtonProfileScreenClickable = {
          leftButton: action.payload.leftButton,
          rightButton: action.payload.rightButton
        };
      }
    }
})
export const {
    switchUnits,
    activateRobotSpeech,
    setLanguage,
    changeIsExist,
    popupLiquidState,
    ifCountUrineChangeState,
    setCalendarDay,
    addBadgesJournalScreen,
    resetBadges,
    changeStateOfTimerTitleForFirstTimeInApp,
    switchCannulationAtNightMode,
    setWhetherCountUrine,
    setDayGoalOfDrinkWater,
    changeScalePopup,
    switchNightModeModal,
    setHelperForModalTurnOnNightMode,
    switchCheckedButtonProfileScreen
    } = appStateSlice.actions; // экспортируем экшены, что бы использовать

export default appStateSlice.reducer; // импортируем сам редьюсер