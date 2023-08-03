import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../reducer";

export    interface BannerList_ extends Array<Banner_>{}
export    interface Banner_ {
      id            : number;
      content       : number;
      bannerName    : string;
      bannerDesc    : string;
      mainImageUrl  : string;
      midImageUrl   : string;
      etcImageUrl   : string;
      isActive      : string;
      fromShowDate  : string;
      toShowDate    : string;
}

export interface BannerListInfo_ {
    contentCode : string,
    bannerList  : BannerList_,
}    

const initialState : BannerListInfo_ = {
    contentCode : '',
    bannerList  : [],
};

const bannerSlice = createSlice({
    name        : 'banner',
    initialState,
    reducers    : {
        setBannerList : (state, action) => {
            // console.log('setBannerList : ', action.payload.bannerList);
            state.contentCode   = action.payload.contentCode;
            state.bannerList    = action.payload.bannerList;
        }
    }
});

export const getBannerInfo = (state : RootState) => state.bannerSlice;

export default bannerSlice;
