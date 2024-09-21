import createUserReducer from "./slices/createUserSlice";
import appStateSlicer from "./slices/appStateSlicer";
import journalDataSlice from "./slices/journalDataSlice";
import timerStatesSlice from "./slices/timerStatesSlice";
import nightStateSlice from "./slices/nightStateSlice";
import notificationsSettingsSlice from "./slices/notificationsSettingsSlice";
import surveySlice from "./slices/surveySlice";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,  } from 'redux-persist';
import consumablesSlice from "./slices/consumablesSlice";

const persistConfig = { // config persist
    key: 'root',
    storage: AsyncStorage,
  };

const persistedReducer = persistReducer(persistConfig, combineReducers({
    user: createUserReducer,
    appStateSlice: appStateSlicer,
    journal: journalDataSlice,
    timerStates: timerStatesSlice,
    nightOnBoarding: nightStateSlice,
    notificationsSettingsSlice: notificationsSettingsSlice,
    surveySlice: surveySlice,
    consumablesSlice: consumablesSlice,
}));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>; // типизация useSelect

export type AppDispatch = typeof store.dispatch; // типизация useDispatch