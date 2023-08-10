import { persistReducer }       from "redux-persist";
import { combineReducers }      from "@reduxjs/toolkit";
import store                    from "../store";
import storage                  from "redux-persist/lib/storage";
import userSlice                from "../store/modules/user";
import layoutSlice              from "../store/modules/layout";
import adminMenuCategorySlice   from "../store/modules/adminMenu";
import contentSlice from "../store/modules/content";
import bannerSlice from "../store/modules/banner";
import boardCategorySlice from "../store/modules/boardCategory";
import contentCategorySlice from "../store/modules/contentCategory";
import shareSlice from "../store/modules/share";

const persistConfig = {
    key       : "root",
    storage,
    whitelist : ["userSlice", "layoutSlice", "adminMenuCategorySlice"]
}

const rootReducer = combineReducers({
    userSlice               : userSlice.reducer, 
    layoutSlice             : layoutSlice.reducer,
    contentSlice            : contentSlice.reducer,
    contentCategorySlice    : contentCategorySlice.reducer,
    adminMenuCategorySlice  : adminMenuCategorySlice.reducer,
    bannerSlice             : bannerSlice.reducer,
    boardCategorySlice      : boardCategorySlice.reducer,
    shareSlice              : shareSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default persistReducer(persistConfig, rootReducer);