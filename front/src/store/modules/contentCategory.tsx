import { createSlice } from "@reduxjs/toolkit";
import { ContentCategory_ } from "./content";
import { RootState } from "../../reducer";

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