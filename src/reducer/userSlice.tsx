import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

/* type UserSliceAction = 
| ReturnType<typeof loginUser>
| ReturnType<typeof cleanUser>
| ReturnType<typeof getUser>;
 */

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
/*         LOGIN_USER : (state, action) => {
            console.log('[userSlice] action.type : ' + action.type + ", " + 'token : ' + action.payload.token +", username : " + action.payload.username + ", payload : " + action.payload);
            state.accessToken = action.payload.token;
            state.username = action.payload.username;
            state.isLogin = true;
        } */
    },
    extraReducers : (builder) => {
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            const resJsonObj = JSON.stringify(action.payload);
            console.log("extraReducer : " + JSON.stringify(state) + ", " + JSON.stringify(action.payload));
            // state.push(JSON.stringify(action.payload));
            // const a = action.payload.token;
            state.accessToken = action.payload.accessToken;
            state.isLogin = action.payload.isLogin;
            state.username = action.payload.username;
            // return {...state, ...action.payload};
        })
    } 
});


export const getUserInfo = (state : RootState) => state.userSlice;

export const asyncLogin = 
    createAsyncThunk("LOGIN_USER", async (user : User) : Promise<User> => {
        console.log('asyncLogin user : ' + user.username + ", " + user.password);
        const res = await axios.post("/login", user);
        console.log('asyncLogin res : ' + JSON.stringify(res.data));
        return res.data;
    }    
);

export default userSlice.reducer;