import { Route, Routes } from "react-router";
import BoardList          from "../../admin/crm/board/BoardList";
import BoardCategoryList  from "../../admin/crm/category/BoardCategoryList";
import ManageUser         from "../../admin/user/ManageUser";
import UserList           from "../../admin/user/UserList";
import Login              from "../../user/Login";
import Index              from "../../admin/Index";
import UserRoleList from "../../admin/role/UserRoleList";
import UserDetail from "../../admin/user/UserDetail";
import EditUser from "../../admin/user/EditUser";
import EditUserProfile from "../../admin/user/EditUserProfile";
import MenuCategoryList from "../../admin/menu/category/MenuCategoryList";
import CreateMenuCategory from "../../admin/menu/category/MergeMenuCategory";
import MenuCategoryDetail from "../../admin/menu/category/MenuCategoryDetail";
import CreateMenu from "../../admin/menu/CreateMenu";
import MenuList from "../../admin/menu/MenuList";
import MenuDetail from "../../admin/menu/MenuDetail";
import MergeMenu from "../../admin/menu/MergeMenu";

type ContentProps = {
    isLogin : boolean;
};

function AdminContent ({
    isLogin
} : ContentProps ) {
    return (
      <Routes>
        <Route path='/admin'                     element={<Index/>}/>
        <Route path='/admin/login'               element={<Login />} />
        <Route path='/admin/board/category/list' element={<BoardCategoryList/>}/>
        <Route path='/admin/board/list'          element={<BoardList/>}/>
        <Route path='/admin/role/userRoleList'   element={<UserRoleList/>}/>
        <Route path='/admin/user/list'           element={<UserList/>}/>
        <Route path='/admin/user/manager'        element={<ManageUser/>}/>
        <Route path='/admin/user/detail'         element={<UserDetail/>}/>
        <Route path='/admin/user/edit'           element={<EditUser/>}/>
        <Route path='/admin/userProfile/edit'    element={<EditUserProfile/>}/>
        <Route path="/admin/menu/category/list"  element={<MenuCategoryList/>}/>
        <Route path="/admin/menu/category/detail" element={<MenuCategoryDetail/>}/>
        <Route path="/admin/menu/category/edit"   element={<CreateMenuCategory/>}/>
        <Route path="/admin/menu/list"            element={<MenuList/>}/>
        <Route path="/admin/menu/detail"          element={<MenuDetail/>}/>
        <Route path="/admin/menu/edit"            element={<MergeMenu/>}/>
      </Routes>
    )
}

export default AdminContent;