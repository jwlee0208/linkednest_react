import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./user";
import { RootState } from "../../reducer";
import { axiosInstance } from "../..";

export interface ShareBoardArticleList_ extends Array<ShareBoardArticle_>{}

export interface ShareBoardArticle_ {
    id              : number;
    title           : string;
    content         : string;
    createUser      : User;
    createDate      : string;
    filePath        : string;
    originalFilePath: string;
    status          : number;
    shareBoard      : ShareBoard_;
}

export interface ShareBoardList_ extends Array<ShareBoard_> {}

export interface ShareBoard_ {
    id                  : number;
    boardName           : string;
    boardType           : string;
    createUserId        : string;
    createDate          : string;
    modifyUserId        : string;
    modifyDate          : string;
}

export interface ShareBoardCategory_  {
    id                  : number;
    boardCategoryName   : string;
    createUserId        : string;
    createDate          : string;
    share               : Share_;
    shareBoardList      : ShareBoardList_;
}

export interface ShareBoardCategoryList_ extends Array<ShareBoardCategory_> {}

export interface Share_ {
    id              : number;
    shareName       : string;
    shareType       : string;
    introduce       : string;
    createUserId    : string;
    createDate      : string;
    shareBoardCategoryList : ShareBoardCategoryList_; 
    returnCode      : number;
    returnMsg       : string; 
}

const initialState : Share_ = {
    id              : 0,
    shareName       : "",
    shareType       : "",
    introduce       : "",
    createUserId    : "",
    createDate      : "",
    shareBoardCategoryList : [],
    returnCode      : 0,
    returnMsg       : "" 
};

const shareSlice = createSlice({
    name        : 'share',
    initialState,
    reducers    : {
        setShareInfo : (state, action) => {
            if  (action.payload.returnCode === 10000) {
                state.id = action.payload.id;
                state.introduce = action.payload.introduce;
                state.shareName = action.payload.shareName;
                state.shareType = action.payload.shareType;
                state.shareBoardCategoryList = action.payload.shareBoardCategoryList;
            }
        }
    },
    extraReducers : (builder)  =>  {
        builder.addCase(asyncShare.fulfilled, (state, action) => {
            if  (action.payload.returnCode === 10000) {
                state.id = action.payload.id;
                state.introduce = action.payload.introduce;
                state.shareName = action.payload.shareName;
                state.shareType = action.payload.shareType;
                state.shareBoardCategoryList = action.payload.shareBoardCategoryList;
            }
        });
    }
});

export const asyncShare = createAsyncThunk("SHARE", async (shareUserId : String) : Promise<Share_> => {
    const res = await axiosInstance.get(`/api/share/${shareUserId}`);
    return res.data;
}); 

export const getShareInfo = (state : RootState) => state.shareSlice;

export default shareSlice;