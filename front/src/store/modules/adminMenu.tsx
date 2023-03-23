import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../..";
import { RootState } from "../../reducer";

interface adminMenuCategoryArr {
    data : Array<adminMenuCategory>;
}

export interface adminMenuCategory {
    id           : number;
    categoryName : string;
    menus        : Array<adminMenu>;
}

interface adminMenu {
    id       : number;
    menuName : string;
    menuUrl  : string;
}

const initialState : adminMenuCategory = {
    id           : 0,
    categoryName : '',
    menus        : [],
};

const adminMenuCategorySlice = createSlice ({
    name     : 'layout',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(asyncAdminMenuCategoryList.fulfilled, (state, action) => {
            console.log('asyncAdminMenuCategoryList >> action.payload : ',new Array(action.payload));
            let adminMenuCategoryArr = new Array(action.payload);
            // to-do : 배열 parsing 후 state 값에 적재 요망
                // console.log('>>>>>>>>>>>>>>>>> a : ' + adminMenuCategoryArr[0][0].categoryName);        

/*             adminMenuCategoryArr.map((adminMenuCategory) => {
                console.log('>>>>>>>>>>>>>>>>> ' + adminMenuCategory);
                state.categoryName = adminMenuCategory.categoryName;
                state.id = adminMenuCategory.id;
                state.menus = adminMenuCategory.menus;    
            }); */
        })
    } 
});
 
export const asyncAdminMenuCategoryList = createAsyncThunk("GET_ADMIN_MENU_CATEGORY", async () : Promise<adminMenuCategory> => {
    const res = await axiosInstance.get("/admin/menu/category/list");
    return res.data;
});

export const getAdminMenuCategoryInfo = (state : RootState) => state.adminMenuCategorySlice;

export default adminMenuCategorySlice;