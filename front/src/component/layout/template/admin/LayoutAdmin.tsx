import React, {useEffect} from "react";
import { useLocation }    from "react-router";
import { useAppSelect }   from "../../../../store/index.hooks";
import { getUserInfo }    from "../../../../store/modules/user";
import { Grid, Hidden }   from "@mui/material";
import { getLayoutInfo }  from "../../../../store/modules/layout";
import AdminSideArea      from "../../common/admin/AdminSideArea";
import AdminHeader        from "../../common/admin/AdminHeader";
import AdminContent       from "../../common/admin/AdminContent";
import Footer             from "../../common/content/Footer";             
import { getContentInfo } from "../../../../store/modules/content";

function LayoutAdmin() {

    const location    = useLocation();

    const layoutInfo  = useAppSelect(getLayoutInfo);
    const userinfo    = useAppSelect(getUserInfo);
    const isLogin     = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const userId      = userinfo.userId; 
    const adminMenuCategoryList = userinfo.adminMenuCategoryList;
    // const contentInfo = useAppSelect(getContentInfo);

    const isAdminIndexPage = (location.pathname === '/admin' || location.pathname === '/admin/index') ;

    let matchedUrlCnt = 0;
    
// console.log('userinfo.adminMenuCategoryList : ', userinfo.adminMenuCategoryList);

    userinfo.adminMenuCategoryList.map(amcl => 
      amcl.adminMenuRoleAccessPathList.map(rapl => 
        rapl.url === location.pathname)).forEach(r => 
          r.forEach(aa => 
            (aa === true) ? matchedUrlCnt++  : 0)
        );    

    const isInvalidAccess = !isAdminIndexPage && matchedUrlCnt < 1;

    /* if(contentInfo.contentCode === 'admin') {
      if (isInvalidAccess) {
        alert(`can not access this page (${location.pathname})`);
        window.location.href = '/admin';
      }    
    } */

    useEffect(()=>{
      // dispatch(asyncAdminMenuCategoryList());
    },[]);

    // console.log(`layout${layoutInfo.layoutId}>>`);

    return (
      <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <AdminHeader isLogin={isLogin} 
                         accessToken={accessToken} 
                         userId={userId} 
                         user={userinfo}  
                         typeId={layoutInfo.layoutId}/>
          </Grid>
          <Hidden smUp>
            <Grid container spacing={1}>
              <Grid component="article" item xs={12} sx={{border:1}}>
                <AdminContent isLogin={isLogin}/>
              </Grid>
            </Grid>  
          </Hidden>
          <Hidden smDown>
            <Grid container spacing={1}>
              <Grid component="aside" item xs={3}>
                <AdminSideArea isLogin={isLogin} userId={userId} user={userinfo} adminMenuList={adminMenuCategoryList}/>
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