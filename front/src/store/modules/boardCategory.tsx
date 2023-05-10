import { createSlice }  from "@reduxjs/toolkit";
import { RootState }    from "../../reducer";

export interface ContentBoardCategoryInfo_ {
    contentCode         : string;
    boardCategoryList   : BoardCategoryList_;
}
export interface BoardCategoryList_ extends Array<BoardCategory_> {}
export interface BoardCategory_ {
    id                  : number;
    contentId           : number;
    contentCode         : string;
    boardCategoryName   : string;
    boardCategoryKeyword: string;
    boardCategoryCode   : string;
    boardCategoryDesc   : string;
    isActive            : string;
    boardList           : BoardList_;
}
export interface BoardList_ extends Array<Board_> {}
export interface Board_ {
    id              : number;
    boardCategoryId : number;
    boardType       : string;
    boardName       : string;
    boardKeyword    : string;
    boardCode       : string;
    isActive        : string;
    imagePath       : string;
    createDate      : string;
    updateDate      : string;
    boardArticleList: BoardArticleList_
}

export interface BoardArticleList_ extends Array<BoardArticle_> {}
export interface BoardArticle_ {
    id              : number;
    boardId         : number;
    title           : string;
    content         : string;
    contentText     : string;
    imagePath       : string;
    isActive        : string;
    createUserNo    : number;
    createUserId    : string;
    createDate      : string;
}

export const initialState : ContentBoardCategoryInfo_ = {
    contentCode         : '',
    boardCategoryList   : [],
};

const boardCategorySlice = createSlice ({
    name        : 'boardCategory',
    initialState,
    reducers    : {
        setContentBoardCategoryInfo : (state, action) => {
            state.contentCode       = action.payload.contentCode;
            state.boardCategoryList = action.payload.boardCategoryList;
        }
    }
});

export const getContentBoardCategoryInfo = (state : RootState) => state.boardCategorySlice;

export default boardCategorySlice;