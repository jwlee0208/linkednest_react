import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState }             from '../../reducer'; 
import { axiosInstance }         from '../..'; 
import {encode as base64_encode} from 'base-64';
import {decode as base64_decode} from 'base-64';
import { type } from 'os';
import { MenuCategoryList_ } from '../../component/layout/admin/menu';

export interface UserProfile {
    sex         : string;
    phoneNo     : string;
    birthday    : string;
}

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
    adminMenuCategoryList   : MenuCategoryList_;
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
    adminMenuRoleAccessPathList  : Array<AdminMenu>,
}

export interface AdminMenus extends Array<AdminMenu>{}

export interface AdminMenu {
    id      : number;
    name    : string, 
    url     : string,
    isShow  : boolean,
}


export interface User {
    userNo                  : number,
    userId                  : string;
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
    birthday                : string;
    sex                     : string;
    phoneNo                 : string;
    additionalPhoneNo       : string;
    address                 : string;
    detailAddress           : string;
    zipcode                 : number;
    userProfile             : UserProfile;
    returnCode              : number;
}

export const initialState : User = {
    userNo                  : 0,
    userId                  : '',
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
    birthday                : '',
    sex                     : '',
    phoneNo                 : '',
    additionalPhoneNo       : '',
    address                 : '',
    detailAddress           : '',
    zipcode                 : 0,
    userProfile             : {
        sex         : '',
        phoneNo     : '',
        birthday    : '',
    },
    returnCode              : 0,
};

const userSlice = createSlice ({
    name     : 'user',
    initialState,
    reducers : {
        logout : (state, action) => {
            state.userNo                  = 0;
            state.userId                  = '';
            state.password                = '';
            state.nickname                = '';
            state.email                   = '';
            state.introduce               = '';
            state.accessToken             = '';
            state.refreshToken            = '';
            state.isLogin                 = false;
            state.adminMenuCategoryList   = [];
            state.userRoleInfoList        = [];
            state.roleInfoList            = [];
            state.birthday                = '';
            state.sex                     = '';
            state.phoneNo                 = '';
            state.additionalPhoneNo       = '';
            state.address                 = '';
            state.detailAddress           = '';
            state.zipcode                 = 0;
            state.returnCode              = 0;
        }, 
        initUserState : (state, action) => {
            state.userNo                  = 0;
            state.userId                  = '';
            state.password                = '';
            state.nickname                = '';
            state.email                   = '';
            state.introduce               = '';
            state.accessToken             = '';
            state.refreshToken            = '';
            state.isLogin                 = false;
            state.adminMenuCategoryList   = [];
            state.userRoleInfoList        = [];
            state.roleInfoList            = [];
            state.birthday                = '';
            state.sex                     = '';
            state.phoneNo                 = '';
            state.additionalPhoneNo       = '';
            state.address                 = '';
            state.detailAddress           = '';
            state.zipcode                 = 0;
            state.returnCode              = 0;
        },
        updateAccessToken : (state, action) => {
            state.accessToken             = action.payload.accessToken; 
            state.refreshToken            = action.payload.refreshToken;   
        }
    },
    extraReducers : (builder) => {
        builder.addCase(asyncSignUp.fulfilled, (state, action) => {
            state.isLogin = (action.payload.returnCode === 10000) ? true : false;
            if (action.payload.returnCode === 10000) {
                state.userNo    = action.payload.userNo;
                state.userId    = base64_decode(action.payload.userId);
                state.email     = action.payload.email;
                state.nickname  = action.payload.nickname;        
            } else {
                alert(`Signup Failure : [err : ${action.payload.returnCode}]`);
                window.location.reload();
            }  
        })
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            console.log(`action.payload.returnCode : ${action.payload.returnCode}`);
            if (action.payload.returnCode === 10000) {
                state.userNo                = action.payload.userNo;
                state.accessToken           = action.payload.accessToken;
                state.refreshToken          = action.payload.refreshToken;
                state.isLogin               = action.payload.isLogin;
                state.userId                = action.payload.userId;
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