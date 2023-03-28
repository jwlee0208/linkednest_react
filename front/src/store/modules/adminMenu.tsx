import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance }    from "../..";
import { RootState }        from "../../reducer";

export interface adminMenuCategories extends Array<adminMenuCategory> {}

export interface adminMenuCategory {
    id           : number;
    categoryName : string;
    menus        : adminMenus;
}

export interface adminMenus extends Array<adminMenu> {}

interface adminMenu {
    id          : number;
    menuName    : string;
    menuUrl     : string;
}

const initialState = {
    adminMenuCategories : [
        {
            id           : 0,
            categoryName : '',
            menus        : [
                {
                    id   : 0,
                    menuName : '',
                    menuUrl  : '',                
                }
            ],
        }
    ]
}

const adminMenuCategorySlice = createSlice ({
    name     : 'adminMenu',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder.addCase(asyncAdminMenuCategoryList.fulfilled, (state, action) => {
            let adminMenuCategoryArray = action.payload as adminMenuCategories; 
            state.adminMenuCategories = adminMenuCategoryArray;
/*             
                adminMenuCategoryArray.map((adminMenuCategoryObj : adminMenuCategory, outerIdx) => {
                let adminMenus = adminMenuCategoryObj.menus as adminMenu[];
                adminMenus.map((adminMenuObj : adminMenu, innerIdx) => {
                    console.log("adminMenuCategoryObj : ", outerIdx, innerIdx,  adminMenuCategoryObj.categoryName, ", menuName : ", adminMenuObj.menuName, ", menuUrl : ", adminMenuObj.menuUrl);
                });
            }); 
*/
        })
    } 
});
 
export const asyncAdminMenuCategoryList = createAsyncThunk("GET_ADMIN_MENU_CATEGORY", async () => {
    const res = await axiosInstance.get("/admin/menu/category/list");
    return res.data;
});

export const getAdminMenuCategoryInfo = (state : RootState) => state.adminMenuCategorySlice;

export default adminMenuCategorySlice;