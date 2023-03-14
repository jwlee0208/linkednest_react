import { Navigate, Route, Routes } from "react-router";
import Login from "../user/Login";
import Mypage from "../user/Mypage";
import Home from "./Home";

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
        <Route path='/mypage' element={isLogin === true ? <Mypage /> : <Navigate replace to="/login"/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    )
}

export default Content;