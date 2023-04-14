import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../reducer";

export interface LayoutInfo {
    layoutId : string;
}

const initialState : LayoutInfo = {
    layoutId : '',
};

const layoutSlice = createSlice ({
    name     : 'layout',
    initialState,
    reducers : {
        setLayoutId : (state, action) => {
            console.log('[setLayoutId] action  : ' + JSON.stringify(action));
            state.layoutId = action.payload.layoutId;
        }        
    },
    extraReducers : (builder) => {
        builder.addCase(setLayoutId.fulfilled, (state, action) => {
            console.log('setLayoutId >> action.payload : ',JSON.stringify(action.payload));
            state.layoutId = action.payload.layoutId;
        })
    } 
});

export const setLayoutId = createAsyncThunk("SET_LAYOUT_ID", async (layout : LayoutInfo) => {
    return layout;
});

export const getLayoutInfo = (state : RootState) => state.layoutSlice;

export default layoutSlice;