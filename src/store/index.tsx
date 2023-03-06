import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../store/modules/user";

const store = configureStore({
    reducer : {
        userSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

