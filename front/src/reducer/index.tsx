import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import store from "../store";
import storage from "redux-persist/lib/storage";
import userSlice from "../store/modules/user";
import layoutSlice from "../store/modules/layout";

const persistConfig = {
    key : "root",
    storage,
    whitelist : ["userSlice", "layoutSlice"]
}

const rootReducer = combineReducers({
    userSlice : userSlice.reducer, 
    layoutSlice : layoutSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;


export default persistReducer(persistConfig, rootReducer);