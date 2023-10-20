import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "./slices/createUserSlice";
import setUserDataFromStorage from "./slices/setUserDataLocalSlice";

export const store = configureStore({
    reducer: {
       user: createUserReducer,
       setUserData: setUserDataFromStorage,
    }
})

export type RootState = ReturnType<typeof store.getState>; // типизация useSelect

export type AppDispatch = typeof store.dispatch; // типизация useDispatch