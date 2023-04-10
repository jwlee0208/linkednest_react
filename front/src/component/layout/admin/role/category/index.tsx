export interface MenuCategoryRoleAccessList_ extends Array<MenuCategoryRoleAccess_>{}
export interface MenuCategoryRoleAccess_ {
    id                      : number;
    menuCategoryId          : number;
    menuCategoryName        : string;
    roleId                  : number;
    roleName                : string;
    createUserNo            : number;
    updateUserNo            : number;
}
