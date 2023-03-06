import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer";
import userSlice from "../store/modules/user";

const store = configureStore({
    reducer : rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;

