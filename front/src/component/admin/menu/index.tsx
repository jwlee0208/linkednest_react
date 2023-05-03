import { MenuCategoryRoleAccessList_ } from "../role/category";

export interface MenuCategoryList_ extends Array<MenuCategory_>{}

export interface MenuCategory_ extends ResultInfo_ {
    categoryId   : number,
    categoryName : string,
    isActive     : string,
    createUser   : number,
    updateUser   : number,
    adminMenuRoleAccessPathList : AdminMenuList_,
}

export interface ResultInfo_ {
    returnCode : number,
    returnMsg : string,
}


export interface AdminMenuList_ extends Array<AdminMenu_> {}
export interface AdminMenu_ {
    id              : number;
    name            : string, 
    url             : string,
    show            : string,
    categoryId      : number,
    categoryName    : string,
    createUser      : number,
    updateUser      : number,
}
