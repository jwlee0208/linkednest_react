import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../reducer";

export interface Layout_ {
    typeId : string;
}

const initialState : Layout_ = {
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

export const setLayoutTypeId = createAsyncThunk("SET_TYPE_ID", async (layout : Layout_) => {
    return layout;
});

export const getLayoutInfo = (state : RootState) => state.layoutSlice;

export default layoutSlice;