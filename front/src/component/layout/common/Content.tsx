import { Navigate, Route, Routes } from "react-router";
import Login  from "../user/Login";
import Mypage from "../user/Mypage";
import SignUp from "../user/SignUp";
import Home   from "./Home";

type ContentProps = {
    isLogin : boolean;
};

function Content ({
    isLogin
} : ContentProps ) {
    return (
      <Routes>
        <Route path='/' element={<Home bannerHeight="480px"/>} />
        <Route path='/:typeId' element={<Home bannerHeight="480px"/>} />
        <Route path='/:typeId/mypage' element={isLogin === true ? <Mypage /> : <Navigate replace to="/login"/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    )
}

export default Content;