import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../reducer'; 
import { axiosInstance } from '../..'; 

export interface User {
    username : string;
    password : string;
    nickname : string;
    email : string;
    accessToken : string;
    refreshToken : string;
    isLogin : boolean;
    returnCode : number;
}

const initialState : User = {
    username : '',
    password : '',
    nickname : '',
    email : '',
    accessToken : '',
    refreshToken : '',
    isLogin : false,
    returnCode : 0,
};

const userSlice = createSlice ({
    name : 'user',
    initialState,
    reducers : {
        logout : (state, action) => {
            console.log('[setTypeID] action  : ' + JSON.stringify(action));
            state.accessToken = '';
            state.refreshToken = '';
            state.email = '';
            state.isLogin = false;
            state.nickname = '';
            state.password = '';
        }, 
    },
    extraReducers : (builder) => {
        builder.addCase(asyncSignUp.fulfilled, (state, action) => {
            console.log("[asyncLogin] action : ", action);
            state.isLogin = (action.payload.returnCode === 10000) ? true : false;
            if (action.payload.returnCode === 10000) {
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.nickname = action.payload.nickname;        
            }   
        })
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLogin = action.payload.isLogin;
            state.username = action.payload.username;
        })
        builder.addCase(asyncGetUser.fulfilled, (state, action) => {
console.log("[asyncGetUser] return payload : " + JSON.stringify(action.payload));
        })
    } 
});

export const getUserInfo = (state : RootState) => state.userSlice;

export const asyncLogout = createAsyncThunk("LOGOUT_USER", async (user : User) => {
        const res = await axiosInstance.post("/logout", user);
        console.log('[asyncLogout] res : ' + JSON.stringify(res.data));
        return res.data;
    }    
);

export const asyncLogin = createAsyncThunk("LOGIN_USER", async (user : User) : Promise<User> => {
        console.log('[asyncLogin] user : ' + user.username + ", " + user.password);
        const res = await axiosInstance.post("/login", user);
        console.log('[asyncLogin] res : ' + JSON.stringify(res.data));
        return res.data;
    }    
);

export const asyncSignUp = createAsyncThunk("SIGN_UP", async (user : User) : Promise<User> => {
        console.log('[asyncSignUp] user : ' + JSON.stringify(user));
        const res = await axiosInstance.post("/user", user);
        console.log('[asyncSignUp] res : ' + JSON.stringify(res.data));
        return res.data;
    }    
);

export const asyncGetUser = createAsyncThunk("GET_USER", async () : Promise<User> => {
    const res = await axiosInstance.get("user/test01");
    return res.data;
});

/* export const reIssueToken = (refreshToken : string) => {
    const res = axiosInstance.post("/user/reIssueToken", {refreshToken : reIssueToken});
    return res;
} */

export default userSlice;