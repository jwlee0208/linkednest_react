import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState }             from '../../reducer'; 
import { axiosInstance }         from '../..'; 
import {encode as base64_encode} from 'base-64';
import {decode as base64_decode} from 'base-64';

export interface RoleInfoList extends Array<RoleInfo>{}
export interface RoleInfo {
    roleId      : number;
    roleName    : string;
    roleDesc    : string;
}

export interface userRoleInfoList extends Array<UserRole>{}
export interface UserRole {
    roleId                  : number;
    roleName                : string;
    userRoleAccessPathList  : UserRoleAccessPathList;
}

export interface UserRoleAccessPathList extends Array<UserRoleAccessPath>{}

export interface UserRoleAccessPath {
    roleAccessPathId    : number;
    url                 : string;
    type                : string;
    httpMethod          : string;
}

export interface AdminMenuCategoryList extends Array<AdminMenuCategory>{}

export interface AdminMenuCategory {
    categoryId          : number,
    categoryName        : string,
    roleAccessPathList  : Array<RoleAccessPath>,
}

export interface RoleAccessPaths extends Array<RoleAccessPath>{}

export interface RoleAccessPath {
    id      : number;
    name    : string, 
    url     : string,
}

export interface User {
    username                : string;
    password                : string;
    nickname                : string;
    email                   : string;
    introduce               : string;
    accessToken             : string;
    refreshToken            : string;
    isLogin                 : boolean;
    adminMenuCategoryList   : AdminMenuCategoryList;
    userRoleInfoList        : userRoleInfoList;
    roleInfoList            : RoleInfoList;
    returnCode              : number;
}

const initialState : User = {
    username                : '',
    password                : '',
    nickname                : '',
    email                   : '',
    introduce               : '',
    accessToken             : '',
    refreshToken            : '',
    isLogin                 : false,
    adminMenuCategoryList   : [],
    userRoleInfoList        : [],
    roleInfoList            : [],
    returnCode              : 0,
};

const userSlice = createSlice ({
    name     : 'user',
    initialState,
    reducers : {
        logout : (state, action) => {
            state.accessToken           = '';
            state.refreshToken          = '';
            state.email                 = '';
            state.isLogin               = false;
            state.nickname              = '';
            state.password              = '';
            state.adminMenuCategoryList = [];
            state.userRoleInfoList      = [];
            state.roleInfoList          = [];
        }, 
    },
    extraReducers : (builder) => {
        builder.addCase(asyncSignUp.fulfilled, (state, action) => {
            state.isLogin = (action.payload.returnCode === 10000) ? true : false;
            if (action.payload.returnCode === 10000) {
                state.username  = action.payload.username;
                state.email     = action.payload.email;
                state.nickname  = action.payload.nickname;        
            }   
        })
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            console.log(`action.payload.returnCode : ${action.payload.returnCode}`);
            if (action.payload.returnCode === 10000) {
                state.accessToken           = action.payload.accessToken;
                state.refreshToken          = action.payload.refreshToken;
                state.isLogin               = action.payload.isLogin;
                state.username              = action.payload.username;
                state.email                 = action.payload.email;
                state.nickname              = action.payload.nickname;
                state.introduce             = action.payload.introduce;
                state.adminMenuCategoryList = action.payload.adminMenuCategoryList;
                state.userRoleInfoList      = action.payload.userRoleInfoList;
                state.roleInfoList          = action.payload.roleInfoList;    
            } else {
                alert(`Login Failure : [err : ${action.payload.returnCode}]`);
                window.location.href='/';
            }
        })
        builder.addCase(asyncGetUser.fulfilled, (state, action) => {
            console.log("[asyncGetUser] return payload : " + JSON.stringify(action.payload));
        })
        builder.addCase(asyncUserUpdate.fulfilled, (state, action) => {
            state.introduce = action.payload.introduce;        
        })
    } 
});

export const getUserInfo     = (state : RootState) => state.userSlice;
export const asyncLogin      = createAsyncThunk("LOGIN_USER", async (user : User) : Promise<User> => {
        const res = await axiosInstance.post("/login", user);
        res.data.refreshToken = res.headers.refresh_token;
        return res.data;
    }    
);

export const asyncSignUp     = createAsyncThunk("SIGN_UP", async (user : User) : Promise<User> => {
        const res = await axiosInstance.post("/user", user);
        return res.data;
    }    
);

export const asyncUserUpdate = createAsyncThunk("USER_UPDATE", async (user : User) : Promise<User> => {
        const res = await axiosInstance.put("/user", user);
        return res.data;
    }    
);

export const asyncGetUser    = createAsyncThunk("GET_USER", async () : Promise<User> => {
    const res = await axiosInstance.get("user/test01");
    return res.data;
});

export default userSlice;