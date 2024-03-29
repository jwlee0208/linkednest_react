export interface MenuRoleList_ extends Array<MenuRole_> {}

export interface MenuRole_ {
    id               : number,
    menuCategoryId   : number,
    menuCategoryName : string,
    menuId           : number,
    menuName         : string,
    menuUrl          : string,
    roleId           : number,
    roleName         : string,
    createUserNo     : number,
    updateUserNo     : number,
}

