import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../reducer'; 
import { axiosInst } from '../..';

export interface User {
    username : string;
    password : string;
    accessToken : string;
    isLogin : boolean;
}

const initialState : User = {
    username : '',
    password : '',
    accessToken : '',
    isLogin : false
};

const userSlice = createSlice ({
    name : 'user',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isLogin = action.payload.isLogin;
            state.username = action.payload.username;
        })
        builder.addCase(asyncLogout.fulfilled, (state, action) => {
            state.accessToken = "";
            state.isLogin = action.payload.isLogin;
            state.username = "";       
        })
    } 
});

export const getUserInfo = (state : RootState) => state.userSlice;

export const asyncLogout = createAsyncThunk("LOGOUT_USER", async (user : User) => {
        const res = await axiosInst.post("/logout", user);
        console.log('asyncLogin res : ' + JSON.stringify(res.data));
        return res.data;
    }    
);

export const asyncLogin = createAsyncThunk("LOGIN_USER", async (user : User) : Promise<User> => {
        console.log('asyncLogin user : ' + user.username + ", " + user.password);
        const res = await axiosInst.post("/login", user);
        console.log('asyncLogin res : ' + JSON.stringify(res.data));
        return res.data;
    }    
);

export default userSlice.reducer;