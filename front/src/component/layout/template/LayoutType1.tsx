import { useAppSelect }   from "../../../store/index.hooks";
import { getUserInfo }    from "../../../store/modules/user";
import { getLayoutInfo }  from "../../../store/modules/layout";
import { Grid }           from "@mui/material";
import Header             from "../common/headerArea/Header";
import Navbar             from "../common/Navbar";
import TopBanner          from "../common/topMenuArea/TopBanner";
import Footer             from "../common/Footer";
import SideArea           from "../common/sideArea/SideArea";
import Content            from "../common/Content";
import Hidden             from "@mui/material/Hidden";
import React              from "react";
import { ContentList_, getContentInfo } 
                          from "../../../store/modules/content";
import MyBottomNav        from "../common/MyBottomNav";

type layoutType1Props = {
  contentList : ContentList_,
}
function LayoutType1({contentList} : layoutType1Props) {

    const layoutInfo  = useAppSelect(getLayoutInfo);
    const userinfo    = useAppSelect(getUserInfo);
    const contentInfo = useAppSelect(getContentInfo);
    const isLogin     = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const userId      = userinfo.userId; 

    const backgroundImagePath = contentInfo.backgroundImagePath;

    return (
      <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>

        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <Header isLogin={isLogin} accessToken={accessToken} userId={userId} user={userinfo}  contentCode={contentInfo.contentCode} layoutType={layoutInfo.layoutId} contentList={contentList}/>
          </Grid>
          <Grid sx={{display:'none'}}>
            <TopBanner/>
          </Grid>
          <Grid component="nav">
            <Navbar/>
          </Grid>
          <Hidden smUp>
            <Grid container sx={{backgroundImage : `url(${backgroundImagePath})`}}>
              <Grid component="article" item xs={12}>
                <Content isLogin={isLogin}/>
              </Grid>
            </Grid>  
          </Hidden>
          <Hidden smDown>
            <Grid container sx={{pl:20, pr:20, backgroundImage : `url(${backgroundImagePath})`}}>
              <Grid component="article" item xs={9}>
                <Content isLogin={isLogin}/>
              </Grid>
              <Grid component="aside" item xs={3}>
                <SideArea isLogin={isLogin} userId={userId} user={userinfo}/>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid component="footer">
          <Hidden smUp>
            <MyBottomNav/>
          </Hidden>
          <Hidden smDown>
            <Footer/>
          </Hidden>
        </Grid>
      </Grid>  
    )
}

export default LayoutType1;