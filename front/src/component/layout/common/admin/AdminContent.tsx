import { Route, Routes }  from "react-router";
import BoardList          from "../../../function/admin/crm/board/BoardList";
import UserList           from "../../../function/admin/user/UserList";
import UserDetail         from "../../../function/admin/user/UserDetail";
import EditUser           from "../../../function/admin/user/EditUser";
import EditUserProfile    from "../../../function/admin/user/EditUserProfile";
import MenuCategoryList   from "../../../function/admin/menu/category/MenuCategoryList";
import EditMenuCategory   from "../../../function/admin/menu/category/EditMenuCategory";
import MenuCategoryDetail from "../../../function/admin/menu/category/MenuCategoryDetail";
import MenuRoleList       from "../../../function/admin/role/menu/MenuRoleList";
import EditMenuRole       from "../../../function/admin/role/menu/EditMenuRole";
import MenuRoleDetail     from "../../../function/admin/role/menu/MenuRoleDetail";
import CategoryRoleList   from "../../../function/admin/role/category/CategoryRoleList";
import EditCategoryRole   from "../../../function/admin/role/category/EditCategoryRole";
import CategoryRoleDetail from "../../../function/admin/role/category/CategoryRoleDetail";
import Index              from "../../../function/admin/Index";
import Login              from "../../../function/user/Login";
import BoardCategoryList  from "../../../function/admin/crm/category/BoardCategoryList";
import RoleList           from "../../../function/admin/role/RoleList";
import RoleDetail         from "../../../function/admin/role/RoleDetail";
import EditRole           from "../../../function/admin/role/EditRole";
import UserRoleList       from "../../../function/admin/role/user/UserRoleList";
import EditUserRole       from "../../../function/admin/role/user/EditUserRole";
import MenuList           from "../../../function/admin/menu/MenuList";
import MenuDetail         from "../../../function/admin/menu/MenuDetail";
import EditMenu           from "../../../function/admin/menu/EditMenu";
import { getReferrer } from "..";

type ContentProps = {
    isLogin : boolean;
};

function AdminContent ({
    isLogin
} : ContentProps ) {
    return (
      <Routes>
        {/* to-do : 추후 동적으로 처리하도록 */}
        <Route path='/admin/index'                element={<Index/>}/>
        <Route path='/admin/login'                element={<Login refer={getReferrer()} isNeedRedirect={false}/>} />
        <Route path='/admin/board/category/list'  element={<BoardCategoryList/>}/>
        <Route path='/admin/board/list'           element={<BoardList/>}/>
        <Route path="/admin/role/list"            element={<RoleList/>}/>
        <Route path="/admin/role/detail"          element={<RoleDetail/>}/>
        <Route path="/admin/role/edit"            element={<EditRole/>}/>
        <Route path='/admin/role/user/list'       element={<UserRoleList/>}/>
        <Route path='/admin/role/user/edit'       element={<EditUserRole/>}/>
        <Route path='/admin/role/menu/list'       element={<MenuRoleList/>}/> 
        <Route path="/admin/role/menu/edit"       element={<EditMenuRole/>}/> 
        <Route path="/admin/role/menu/detail"     element={<MenuRoleDetail/>}/> 
        <Route path='/admin/role/category/list'   element={<CategoryRoleList/>}/> 
        <Route path='/admin/role/category/edit'   element={<EditCategoryRole/>}/> 
        <Route path='/admin/role/category/detail' element={<CategoryRoleDetail/>}/>        
        <Route path='/admin/user/list'            element={<UserList/>}/>
        <Route path='/admin/user/detail'          element={<UserDetail/>}/>
        <Route path='/admin/user/edit'            element={<EditUser/>}/>
        <Route path='/admin/userProfile/edit'     element={<EditUserProfile/>}/>
        <Route path="/admin/menu/category/list"   element={<MenuCategoryList/>}/>
        <Route path="/admin/menu/category/detail" element={<MenuCategoryDetail/>}/>
        <Route path="/admin/menu/category/edit"   element={<EditMenuCategory/>}/>
        <Route path="/admin/menu/list"            element={<MenuList/>}/>
        <Route path="/admin/menu/detail"          element={<MenuDetail/>}/>
        <Route path="/admin/menu/edit"            element={<EditMenu/>}/>
      </Routes>
    )
}

export default AdminContent;