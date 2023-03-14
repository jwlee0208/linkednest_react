import { Navigate, Route, Routes, useParams } from "react-router";
import { useAppSelect } from "../../../store/index.hooks";
import { getUserInfo } from "../../../store/modules/user";
import Header from "../common/Header";
import Home from "../common/Home";
import Login from "../user/Login";
import Mypage from "../user/Mypage";
import Footer from "../common/Footer";
import { Grid } from "@mui/material";
import Navbar from "../common/Navbar";
import TopBanner from "../common/TopBanner";
import { getLayoutInfo } from "../../../store/modules/layout";
import Content from "../common/Content";

function Layout3() {

    console.log("layout3>>");

    const userinfo = useAppSelect(getUserInfo);
    const isLogin = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username = userinfo.username; 

    const layoutinfo = useAppSelect(getLayoutInfo);

    return (
        <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <Header isLogin={isLogin} accessToken={accessToken} username={username} user={userinfo}  typeId={layoutinfo.typeId}/>
          </Grid>
          <Grid>
            <TopBanner/>
          </Grid>
          <Grid component="nav">
            <Navbar/>
          </Grid>
          <Grid container spacing={1}>
            <Grid component="article" item xs={12}>
              <Content isLogin={isLogin}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid component="footer">
          <Footer/>
        </Grid>
      </Grid>  
    )
}

export default Layout3;