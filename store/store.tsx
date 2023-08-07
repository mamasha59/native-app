import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "./slices/createUserSlice";

export const store = configureStore({
    reducer: {
       user: createUserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>; // типизация useSelect

export type AppDispatch = typeof store.dispatch; // типизация useDispatch