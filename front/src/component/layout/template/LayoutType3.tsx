import { Grid }           from "@mui/material";
import { useAppSelect }   from "../../../store/index.hooks";
import { getUserInfo }    from "../../../store/modules/user";
import { getLayoutInfo }  from "../../../store/modules/layout";
import React              from "react";
import Hidden             from "@mui/material/Hidden";
import { ContentList_, getContentInfo } 
                          from "../../../store/modules/content";
import Header             from "../common/content/headerArea/Header";
import TopBanner          from "../common/topMenuArea/TopBanner";
import Navbar             from "../common/content/Navbar";
import Content            from "../common/content/Content";
import Footer             from "../common/content/Footer";
import MyBottomNav        from "../common/content/MyBottomNav";
import SideFloatingButtons from "../common/content/sideArea/SideFloatingButtons";

type layoutType3Props = {
  contentList : ContentList_,
}

function LayoutType3({contentList} : layoutType3Props) {

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
          <Hidden smDown>
            <Grid sx={{mr:5, ml : 5}}>
              <SideFloatingButtons/>
            </Grid>
          </Hidden>
          <Grid component="header">
            <Header isLogin={isLogin} 
                    accessToken={accessToken} 
                    userId={userId} 
                    user={userinfo} 
                    contentCode={contentInfo.contentCode} 
                    layoutType={layoutInfo.layoutId} 
                    contentList={contentList}/>
          </Grid>
          <Grid sx={{display:'none'}}>
            <TopBanner/>
          </Grid>
          <Grid component="nav">
            <Navbar/>
          </Grid>
          <Grid container sx={{backgroundImage : `url(${backgroundImagePath})`}}>
            <Hidden smDown>
              <Grid component="article" item xs={12} sx={{pl:20, pr:20}}>
                <Content isLogin={isLogin}/>
              </Grid>
            </Hidden>
            <Hidden smUp>
              <Grid component="article" item xs={12} sx={{pl:1, pr:1}}>
                <Content isLogin={isLogin}/>
              </Grid>
            </Hidden>
          </Grid>
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

export default LayoutType3;