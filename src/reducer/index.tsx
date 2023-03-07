import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import store from "../store";
import storage from "redux-persist/lib/storage";
import userSlice from "../store/modules/user";

const persistConfig = {
    key : "root",
    storage,
    whitelist : ["userSlice"]
}

const rootReducer = combineReducers({
    userSlice
});

export type RootState = ReturnType<typeof store.getState>;

export default persistReducer(persistConfig, rootReducer);