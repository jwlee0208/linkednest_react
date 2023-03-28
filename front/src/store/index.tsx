import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer  from "../reducer";
import logger       from 'redux-logger';

const store = configureStore({
    reducer : rootReducer,
    devTools : true,
    middleware : getDefaultMiddleware({
      serializableCheck : false
    }).concat([logger]),
});

export type AppDispatch = typeof store.dispatch;
export default store;

