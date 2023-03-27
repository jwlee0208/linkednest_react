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

function LayoutAdmin() {

    console.log("layoutAdmin>>");

    const userinfo = useAppSelect(getUserInfo);
    const isLogin = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username = userinfo.username; 

    const layoutInfo = useAppSelect(getLayoutInfo);

    const dispatch = useAppDispatch();

    useEffect(()=>{
      dispatch(asyncAdminMenuCategoryList());
    },[]);

    const adminMenuCategoryInfo = useAppSelect(getAdminMenuCategoryInfo);

    console.log('adminMenuCategoryInfo : ' + JSON.stringify(adminMenuCategoryInfo));

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
                <AdminSideArea isLogin={isLogin} username={username} user={userinfo} adminMenuList={adminMenuCategoryInfo.adminMenuCategories}/>
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