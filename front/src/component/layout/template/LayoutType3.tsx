import { Grid }           from "@mui/material";
import { useAppSelect }   from "../../../store/index.hooks";
import { getUserInfo }    from "../../../store/modules/user";
import { getLayoutInfo }  from "../../../store/modules/layout";
import React              from "react";
import Hidden             from "@mui/material/Hidden";
import { ContentList_, getContentInfo } 
                          from "../../../store/modules/content";
import Header             from "../common/headerArea/Header";
import TopBanner          from "../common/topMenuArea/TopBanner";
import Navbar             from "../common/Navbar";
import Content            from "../common/Content";
import Footer             from "../common/Footer";
import MyBottomNav        from "../common/MyBottomNav";

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

    return (
        <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
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
          <Grid container spacing={1} sx={{pl:20, pr:20}}>
            <Grid component="article" item xs={12}>
              <Content isLogin={isLogin}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid component="footer" sx={{pt:1}}>
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