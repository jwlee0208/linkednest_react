import { UserRoleAccessPathList } from "../../../../store/modules/user";
import { MenuCategoryList_ } from "../menu";

export interface RoleList_ extends Array<Role_> {}
export interface Role_ {
    roleId : number,
    roleName : string,
    roleDesc : string,
}

export interface userRoleInfoList extends Array<UserRole>{}
export interface UserRole {
    roleId                  : number;
    roleName                : string;
    userRoleAccessPathList  : UserRoleAccessPathList;
    adminMenuCategoryList   : MenuCategoryList_;
}