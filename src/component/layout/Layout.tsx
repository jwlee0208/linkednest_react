import { Navigate, Route, Routes } from "react-router";
import { useAppSelect } from "../../store/index.hooks";
import { getUserInfo } from "../../store/modules/user";
import Header from "./Header";
import Home from "./Home";
import Login from "../Login";
import Mypage from "../Mypage";
import Footer from "./Footer";
import SideArea from "./SideArea";
import { Grid } from "@mui/material";
import Navbar from "./Navbar";
import TopBanner from "./TopBanner";

function Layout() {
    const userinfo = useAppSelect(getUserInfo);
    const isLogin = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username = userinfo.username; 

    return (
        <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <Header isLogin={isLogin} accessToken={accessToken} username={username} user={userinfo} />
          </Grid>
          <Grid>
            <TopBanner/>
          </Grid>
          <Grid component="nav">
            <Navbar/>
          </Grid>
          <Grid container spacing={1}>
              <Grid component="article" item xs={8}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/mypage' element={isLogin === true ? <Mypage /> : <Navigate replace to="/login"/>} />
                  <Route path='/login' element={<Login />} />
                </Routes>
            </Grid>
            <Grid component="aside" item xs={4}>
              <SideArea isLogin={isLogin} username={username} user={userinfo} />
            </Grid>
          </Grid>
        </Grid>
        <Grid component="footer">
          <Footer/>
        </Grid>
      </Grid>  
    )
}

export default Layout;