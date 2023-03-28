import React, {useEffect, useState} from "react";
import { useAppDispatch, useAppSelect } from "../../../../store/index.hooks";
import { getUserInfo } from "../../../../store/modules/user";
import Footer from "../../common/Footer";
import { Grid, Hidden } from "@mui/material";
import Navbar from "../../common/Navbar";
import { getLayoutInfo } from "../../../../store/modules/layout";
import AdminSideArea from "../../common/admin/AdminSideArea";
import { adminMenuCategories, asyncAdminMenuCategoryList, getAdminMenuCategoryInfo } from "../../../../store/modules/adminMenu";
import AdminHeader from "../../common/admin/AdminHeader";
import AdminContent from "../../common/admin/AdminContent";
import { useLocation } from "react-router";

function LayoutAdmin() {

    console.log("layoutAdmin>>");

    const userinfo = useAppSelect(getUserInfo);
    const isLogin = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username = userinfo.username; 

    const layoutInfo = useAppSelect(getLayoutInfo);

    const location = useLocation();

    const isAdminIndexPage = (location.pathname === '/admin' || location.pathname === '/admin/index') ;

    let matchedUrlCnt = 0;
    
    userinfo.adminMenuCategoryList.map(amcl => 
      amcl.roleAccessPathList.map(rapl => 
        rapl.url === location.pathname)).forEach(r=>
          r.forEach(aa => 
            (aa === true) ? matchedUrlCnt++  : 0)
        );

    const isInvalidAccess = !isAdminIndexPage && matchedUrlCnt < 1;
    if (isInvalidAccess) {
      alert(`can not access this page (${location.pathname})`);
      window.location.href = '/admin';
    }    


    useEffect(()=>{
      // dispatch(asyncAdminMenuCategoryList());
    },[]);

    const adminMenuCategoryList = userinfo.adminMenuCategoryList;
    return (
      <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <AdminHeader isLogin={isLogin} accessToken={accessToken} 
                        username={username} 
                        user={userinfo}  
                        typeId={layoutInfo.typeId}/>
          </Grid>
          <Hidden smUp>
            <Grid container spacing={1}>
              <Grid component="article" item xs={12}>
                <AdminContent isLogin={isLogin}/>
              </Grid>
            </Grid>  
          </Hidden>
          <Hidden smDown>
            <Grid container spacing={1}>
              <Grid component="aside" item xs={3}>
                <AdminSideArea isLogin={isLogin} username={username} user={userinfo} adminMenuList={adminMenuCategoryList}/>
              </Grid>
              <Grid component="article" item xs={9}>
                <AdminContent isLogin={isLogin}/>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid component="footer">
          <Footer/>
        </Grid>
      </Grid>  
    )
}

export default LayoutAdmin;