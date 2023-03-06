import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

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
            console.log("extraReducer : " + JSON.stringify(state) + ", " + JSON.stringify(action.payload));
            state.accessToken = action.payload.accessToken;
            state.isLogin = action.payload.isLogin;
            state.username = action.payload.username;
        })
    } 
});

export const getUserInfo = (state : RootState) => state.userSlice;

export const asyncLogin = createAsyncThunk("LOGIN_USER", async (user : User) : Promise<User> => {
        console.log('asyncLogin user : ' + user.username + ", " + user.password);
        const res = await axios.post("/login", user);
        console.log('asyncLogin res : ' + JSON.stringify(res.data));
        return res.data;
    }    
);

export default userSlice.reducer;