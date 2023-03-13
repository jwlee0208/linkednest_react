import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../reducer";

export interface Layout_ {
    typeId : string;
}

const initialState : Layout_ = {
    typeId : '',
};

const layoutSlice = createSlice ({
    name : 'layout',
    initialState,
    reducers : {
        setTypeId : (state, action) => {
            console.log('[setTypeID] action  : ' + JSON.stringify(action));
            state.typeId = action.payload.typeId;
        }        
    },
    extraReducers : {
    } 
});

export const getLayoutInfo = (state : RootState) => state.layoutSlice;

export default layoutSlice;