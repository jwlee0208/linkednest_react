import { createSlice }  from "@reduxjs/toolkit";
import { ContentList_ } from "./content";
import { RootState }    from "../../reducer";

export interface ContentCategoryList_ extends Array<ContentCategory_>{}
export interface ContentCategory_ {
    id                  : number,
    parentId            : number,
    categoryCode        : string,
    categoryName        : string,
    depth               : number,
    isActive            : string;
    childCategoryList   : ContentCategoryList_,
    contentList         : ContentList_,
}

export const initialState : ContentCategory_ = {
    id                  : 0,
    parentId            : 0,
    categoryCode        : '',
    categoryName        : '',
    depth               : 0,
    isActive            : '',
    childCategoryList   : [],
    contentList         : [],

}

const contentCategorySlice = createSlice ({
    name     : 'contentCategory',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {

    }
});

export const getContentInfo     = (state : RootState) => state.contentCategorySlice;
export default contentCategorySlice;