import { Grid, Hidden }             from "@mui/material";
import { useAppSelect }             from "../../../../store/index.hooks";
import { getContentInfo }           from "../../../../store/modules/content";
import { getLayoutInfo }            from "../../../../store/modules/layout";
import { getUserInfo }              from "../../../../store/modules/user";
import ShareHeader                  from "../../common/share/ShareHeader";
import ShareSideArea                from "../../common/share/ShareSideArea";
import ShareContent                 from "../../common/share/ShareContent";
import ShareSideFloatingButtons     from "../../common/share/ShareSideFloatingButtons";
import ShareTopBanner               from "../../common/share/ShareTopBanner";
import MyBottomNav                  from "../../common/content/MyBottomNav";
import ShareNavbar                  from "../../common/share/ShareNavbar";
import ShareFooter                  from "../../common/share/ShareFooter";

function LayoutShare () {
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
            <ShareHeader isLogin={isLogin} 
                    accessToken={accessToken} 
                    userId={userId} 
                    user={userinfo}/>
          </Grid>
          <Hidden smDown>
            <Grid sx={{mr:3, ml: 3}}>
              <ShareSideFloatingButtons/>
            </Grid>  
          </Hidden>
          <Grid sx={{display:'none'}}>
            <ShareTopBanner/>
          </Grid>
          <Grid component="nav">
            <ShareNavbar/>
          </Grid>
          <Hidden smUp>
            <Grid container spacing={1} sx={{backgroundImage : `url(${backgroundImagePath})`}}>
              <Grid component="article" item xs={12}>
                <ShareContent/>
              </Grid>
            </Grid>  
          </Hidden>
          <Hidden smDown>
            <Grid container spacing={1} sx={{pl:5, pr:15, backgroundImage : `url(${backgroundImagePath})`}}>
              <Grid component="aside" item xs={3}>
                <ShareSideArea />
              </Grid>
              <Grid component="article" item xs={9}>
                <ShareContent/>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid component="footer">
          <Hidden smUp>
            <MyBottomNav/>
          </Hidden>
          <Hidden smDown>
            <ShareFooter/>
          </Hidden>
        </Grid>
      </Grid>  
    )
}

export default LayoutShare;