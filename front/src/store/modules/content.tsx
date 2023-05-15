import { createAsyncThunk, createSlice }    from "@reduxjs/toolkit";
import { axiosInstance }                    from "../..";
import { RootState }                        from "../../reducer";

export interface ContentList_ extends Array<Content_> {}

export interface Content_ {
    contentId   : number,
    contentName : string,
    contentType : string,
    contentCode : string,
    contentDesc : string,
    layoutType  : number,
    status      : string,
    usableLevel : number,
    contentSnsList : ContentSnsList_,
    contentCreator :  ContentCreator_,
    homepageUrl    : string,
    imagePath      : string,
    logoImagePath  : string,
    backgroundImagePath : string,
}

export interface ContentSns_ {
    contentSnsId : number,
    snsType      : string,
    snsUrl       : string,
}

export interface ContentCreator_ {
    contentCreatorId    : number,
    creatorName         : string,
    creatorRights       : string,
    creatorImgUrl       : string,
}


export interface ContentSnsList_ extends Array<ContentSns_>{}

export const initialState : Content_ = {
    contentId   : 0,
    contentName : '',
    contentType : '',
    contentCode : '',
    contentDesc : '',
    layoutType  : 0,
    status      : '',
    usableLevel : 0,
    contentSnsList : [],
    contentCreator : {
        contentCreatorId : 0,
        creatorName      : '',
        creatorRights    : '',
        creatorImgUrl    : '',    
    },
    homepageUrl    : '',
    imagePath      : '',
    logoImagePath  : '',
    backgroundImagePath : '',
};

const contentSlice = createSlice ({
    name     : 'content',
    initialState,
    reducers : {
        setContent : (state, action) => {
            state.contentCode    = action.payload.contentCode;
            state.contentId      = action.payload.contentId;
            state.contentName    = action.payload.contentName;
            state.contentType    = action.payload.contentType;
            state.layoutType     = action.payload.layoutType;
            state.status         = action.payload.status;
            state.usableLevel    = action.payload.usableLevel
            state.contentSnsList = action.payload.contentSnsList;
            state.imagePath      = action.payload.imagePath;
            state.logoImagePath  = action.payload.logoImagePath;
            state.backgroundImagePath  = action.payload.backgroundImagePath;
            state.homepageUrl    = action.payload.homepageUrl;
            state.contentDesc    = action.payload.contentDesc;
            const contentCreator = action.payload.contentCreator;
            if (contentCreator !== null) {
                state.contentCreator.contentCreatorId   = contentCreator.contentCreatorId;
                state.contentCreator.creatorName        = contentCreator.creatorName;
                state.contentCreator.creatorRights      = contentCreator.creatorRights;
                state.contentCreator.creatorImgUrl      = contentCreator.creatorImgUrl;
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(asyncGetContent.fulfilled, (state, action) => {
            state.contentCode    = action.payload.contentCode;
            state.contentId      = action.payload.contentId;
            state.contentName    = action.payload.contentName;
            state.contentType    = action.payload.contentType;
            state.layoutType     = action.payload.layoutType;
            state.status         = action.payload.status;
            state.usableLevel    = action.payload.usableLevel
            state.contentSnsList = action.payload.contentSnsList;
            state.imagePath      = action.payload.imagePath;
            state.logoImagePath  = action.payload.logoImagePath;
            state.backgroundImagePath  = action.payload.backgroundImagePath;
            state.homepageUrl    = action.payload.homepageUrl;
            state.contentDesc    = action.payload.contentDesc;
            const contentCreator = action.payload.contentCreator;
            if (contentCreator !== null) {
                state.contentCreator.contentCreatorId   = contentCreator.contentCreatorId;
                state.contentCreator.creatorName        = contentCreator.creatorName;
                state.contentCreator.creatorRights      = contentCreator.creatorRights;
                state.contentCreator.creatorImgUrl      = contentCreator.creatorImgUrl;
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