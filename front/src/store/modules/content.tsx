import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../..";
import { RootState } from "../../reducer";

export interface ContentList_ extends Array<Content_> {}

export interface Content_ {
    contentId   : number,
    contentName : string,
    contentType : string,
    contentCode : string,
    layoutType  : number,
    status      : string,
    usableLevel : number,
    contentSnsList : ContentSnsList_,
    contentCreator :  ContentCreator_,
}

export interface ContentSns_ {
    contentSnsId : number,
    snsType : string,
    snsUrl : string,
}

export interface ContentCreator_ {
    contentCreatorId : number,
    creatorName : string,
    creatorRights : string,
    creatorImgUrl : string,
}

export interface ContentSnsList_ extends Array<ContentSns_>{}

export const initialState : Content_ = {
    contentId   : 0,
    contentName : '',
    contentType : '',
    contentCode : '',
    layoutType  : 0,
    status      : '',
    usableLevel : 0,
    contentSnsList : [],
    contentCreator : {
        contentCreatorId : 0,
        creatorName      : '',
        creatorRights    : '',
        creatorImgUrl    : '',    
    }
};

const contentSlice = createSlice ({
    name : 'content',
    initialState,
    reducers : {
        setContent : (state, action) => {
            state.contentCode = action.payload.contentCode;
            state.contentId = action.payload.contentId;
            state.contentName = action.payload.contentName;
            state.contentType = action.payload.contentType;
            state.layoutType = action.payload.layoutType;
            state.status = action.payload.status;
            state.usableLevel = action.payload.usableLevel
            state.contentSnsList = action.payload.contentSnsList;
            const contentCreator = action.payload.contentCreator;
            if (contentCreator !== null) {
                state.contentCreator.contentCreatorId = contentCreator.contentCreatorId;
                state.contentCreator.creatorName = contentCreator.creatorName;
                state.contentCreator.creatorRights = contentCreator.creatorRights;
                state.contentCreator.creatorImgUrl = contentCreator.creatorImgUrl;
            }

        }
    },
    extraReducers : (builder) => {
        builder.addCase(asyncGetContent.fulfilled, (state, action) => {
            state.contentCode = action.payload.contentCode;
            state.contentId = action.payload.contentId;
            state.contentName = action.payload.contentName;
            state.contentType = action.payload.contentType;
            state.layoutType = action.payload.layoutType;
            state.status = action.payload.status;
            state.usableLevel = action.payload.usableLevel
            state.contentSnsList = action.payload.contentSnsList;
            const contentCreator = action.payload.contentCreator;
            if (contentCreator !== null) {
                state.contentCreator.contentCreatorId = contentCreator.contentCreatorId;
                state.contentCreator.creatorName = contentCreator.creatorName;
                state.contentCreator.creatorRights = contentCreator.creatorRights;
                state.contentCreator.creatorImgUrl = contentCreator.creatorImgUrl;
            }
        })
    }
});

export const asyncGetContent = createAsyncThunk("GET_CONTENT", async (content : Content_) : Promise<Content_> => {
    const res = await  axiosInstance.get(`/api/content/${content.contentCode}`);
    return res.data;
});

export const getContentInfo     = (state : RootState) => state.contentSlice;
export default contentSlice;