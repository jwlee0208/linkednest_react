import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../reducer";

export interface LayoutInfo {
    typeId : string;
}

const initialState : LayoutInfo = {
    typeId : '',
};

const layoutSlice = createSlice ({
    name     : 'layout',
    initialState,
    reducers : {
        setTypeId : (state, action) => {
            console.log('[setTypeID] action  : ' + JSON.stringify(action));
            state.typeId = action.payload.typeId;
        }        
    },
    extraReducers : (builder) => {
        builder.addCase(setLayoutTypeId.fulfilled, (state, action) => {
            console.log('setLayoutTypeId >> action.payload : ',JSON.stringify(action.payload));
            state.typeId = action.payload.typeId;
        })
    } 
});

export const setLayoutTypeId = createAsyncThunk("SET_TYPE_ID", async (layout : LayoutInfo) => {
    return layout;
});

export const getLayoutInfo = (state : RootState) => state.layoutSlice;

export default layoutSlice;