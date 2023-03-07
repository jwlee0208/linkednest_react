import { Route, Routes } from "react-router";
import { useAppSelect } from "../../store/index.hooks";
import { getUserInfo } from "../../store/modules/user";
import Header from "./Header";
import Home from "./Home";
import Login from "../Login";
import Mypage from "../Mypage";
import Footer from "./Footer";

function Layout() {
    const userinfo = useAppSelect(getUserInfo);
    const isLogin = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username = userinfo.username; 

    return (
        <>
        <Header isLogin={isLogin} accessToken={accessToken} username={username} user={userinfo} /><main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
      <Footer/>
      </>  
    )
}

export default Layout;