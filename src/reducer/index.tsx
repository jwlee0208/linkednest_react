import userSlice from "./userSlice";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
    // userSlice
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; 


