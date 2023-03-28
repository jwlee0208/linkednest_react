import { Route, Routes } from "react-router";
import BoardList          from "../../admin/crm/board/BoardList";
import BoardCategoryList  from "../../admin/crm/category/BoardCategoryList";
import ManageUser         from "../../admin/user/ManageUser";
import UserList           from "../../admin/user/UserList";
import Login              from "../../user/Login";
import Index              from "../../admin/Index";

type ContentProps = {
    isLogin : boolean;
};

function AdminContent ({
    isLogin
} : ContentProps ) {
    return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Index/>}/>
        <Route path='/admin/user/list' element={<UserList/>}/>
        <Route path='/admin/user/manager' element={<ManageUser/>}/>
        <Route path='/admin/board/category/list' element={<BoardCategoryList/>}/>
        <Route path='/admin/board/list' element={<BoardList/>}/>
      </Routes>
    )
}

export default AdminContent;