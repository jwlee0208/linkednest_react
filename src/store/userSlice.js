import {configureStore, createSlice} from "@reduxjs/toolkit";
import { Router } from "react-router";

export const userSlice = createSlice({
    name : 'user',
    initialState : {
        name : '',
        id : '',
        isLoading: false,
        isLogin: null,
    },
    reducers: {
        loginUser : (state, action) => {
            state.accessToken = action.payload.token;
            state.id = action.payload.username;
            state.isLogin = true;
        }, 
        cleanUser : (state) => {
            state.accessToken = "";
            state.id = "";
            state.isLogin = false;
        }
    },
});

export const { loginUser, cleanUser } = userSlice.actions;
// export default userSlice.reducer;
export default configureStore ({
    reducer : {
        userSlice : userSlice.reducer
    },
})