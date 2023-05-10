import { Grid }                 from "@mui/material";
import Hidden                   from "@mui/material/Hidden";
import React                    from "react";
import { useLocation }          from 'react-router';
import { useAppSelect }         from "../../../store/index.hooks";
import { ContentList_, getContentInfo } 
                                from "../../../store/modules/content";
import { ContentCategoryList_, ContentCategory_ }
                                from "../../../store/modules/contentCategory";
import { getLayoutInfo }        from "../../../store/modules/layout";
import { getUserInfo }          from "../../../store/modules/user";
import Footer                   from "../common/Footer";
import PortalContent            from '../common/PortalContent';
import PortalHeader             from '../common/headerArea/PortalHeader';
import MyBottomNav              from '../common/MyBottomNav';

type layoutType0Props = {
    contentList         : ContentList_,
    contentCategoryList : ContentCategoryList_,
}

function LayoutType0 ({contentList, contentCategoryList} : layoutType0Props) {

    const layoutInfo  = useAppSelect(getLayoutInfo);
    const userinfo    = useAppSelect(getUserInfo);
    const contentInfo = useAppSelect(getContentInfo);
    const isLogin     = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const userId      = userinfo.userId; 

    const location = useLocation();
    let contentCategoryInfo = null;
    if (location.state !== null) {
        contentCategoryInfo = location.state.contentCategory as ContentCategory_;
    }  
    
    return (
        <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <PortalHeader isLogin={isLogin} 
                          accessToken={accessToken} 
                          userId={userId} 
                          user={userinfo}  
                          contentCode={contentInfo.contentCode} 
                          layoutType={layoutInfo.layoutId} 
                          contentList={contentList} 
                          contentCategoryList={contentCategoryList}/>
          </Grid>
          <Grid container spacing={1} sx={{pt:10}}>
            <Grid component="article" item xs={12}>
                <PortalContent isLogin={isLogin} contentList={contentList} contentCategory={contentCategoryInfo as ContentCategory_}/>            </Grid>
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

export default LayoutType0;