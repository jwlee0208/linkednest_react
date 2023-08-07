import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user";

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
}

const initialState : Share_ = {
    id : 0,
    shareName : "",
    shareType : "",
    introduce : "",
    createUserId : "",
    createDate  : "",
};

const shareSlice = createSlice({
    name        : 'share',
    initialState,
    reducers    : {

    },
    extraReducers : (builder)  =>  {
    } 
});

export default shareSlice;