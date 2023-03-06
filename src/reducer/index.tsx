import { combineReducers } from "@reduxjs/toolkit";
import store from "../store";
import userSlice from "../store/modules/user";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key : "root",
    storage,
    whitelist : ["userSlice"]
}

const rootReducer = combineReducers({
    userSlice
});

export type RootState = ReturnType<typeof store.getState>;

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);