import { useState } from "react";
import { axiosInstance } from "../../../..";
import { useNavigate } from "react-router";
import { useAppSelect } from "../../../../store/index.hooks";
import { getUserInfo } from "../../../../store/modules/user";


export interface MenuCategoryList_ extends Array<MenuCategory_>{}

export interface MenuCategory_ extends ResultInfo_ {
    categoryId   : number,
    categoryName : string,
    isActive     : string,
    createUser   : number,
    updateUser   : number,
}

export interface ResultInfo_ {
    returnCode : number,
    returnMsg : string,
}



