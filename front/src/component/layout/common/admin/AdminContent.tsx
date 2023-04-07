import { Route, Routes }  from "react-router";
import BoardList          from "../../admin/crm/board/BoardList";
import BoardCategoryList  from "../../admin/crm/category/BoardCategoryList";
import UserList           from "../../admin/user/UserList";
import Login              from "../../user/Login";
import Index              from "../../admin/Index";
import UserRoleList       from "../../admin/role/user/UserRoleList";
import UserDetail         from "../../admin/user/UserDetail";
import EditUser           from "../../admin/user/EditUser";
import EditUserProfile    from "../../admin/user/EditUserProfile";
import MenuCategoryList   from "../../admin/menu/category/MenuCategoryList";
import EditMenuCategory   from "../../admin/menu/category/EditMenuCategory";
import MenuCategoryDetail from "../../admin/menu/category/MenuCategoryDetail";
import MenuList           from "../../admin/menu/MenuList";
import MenuDetail         from "../../admin/menu/MenuDetail";
import EditMenu           from "../../admin/menu/EditMenu";
import MenuRoleList       from "../../admin/role/menu/MenuRoleList";
import EditMenuRole       from "../../admin/role/menu/EditMenuRole";
import MenuRoleDetail     from "../../admin/role/menu/MenuRoleDetail";

type ContentProps = {
    isLogin : boolean;
};

function AdminContent ({
    isLogin
} : ContentProps ) {
    return (
      <Routes>
        <Route path='/admin'                      element={<Index/>}/>
        <Route path='/admin/login'                element={<Login/>} />
        <Route path='/admin/board/category/list'  element={<BoardCategoryList/>}/>
        <Route path='/admin/board/list'           element={<BoardList/>}/>
        <Route path='/admin/role/user/list'       element={<UserRoleList/>}/>
        <Route path='/admin/role/menu/list'       element={<MenuRoleList/>}/> 
        <Route path="/admin/role/menu/edit"       element={<EditMenuRole/>}/> 
        <Route path="/admin/role/menu/detail"     element={<MenuRoleDetail/>}/> 
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