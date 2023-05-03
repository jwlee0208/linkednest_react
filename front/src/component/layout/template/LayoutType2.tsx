import { useAppSelect }   from "../../../store/index.hooks";
import { getUserInfo }    from "../../../store/modules/user";
import { getLayoutInfo }  from "../../../store/modules/layout";
import { Grid }           from "@mui/material";
import Hidden             from "@mui/material/Hidden";
import Navbar             from "../../common/Navbar";
import TopBanner          from "../../common/topMenuArea/TopBanner";
import Header             from "../../common/headerArea/Header";
import Footer             from "../../common/Footer";
import SideArea           from "../../common/sideArea/SideArea";
import Content            from "../../common/Content";
import RestoreIcon        from '@mui/icons-material/Restore';
import FavoriteIcon       from '@mui/icons-material/Favorite';
import LocationOnIcon     from '@mui/icons-material/LocationOn';
import React              from "react";
import BottomNavigation                 from "@mui/material/BottomNavigation";
import BottomNavigationAction           from "@mui/material/BottomNavigationAction";
import { ContentList_, getContentInfo } from "../../../store/modules/content";

type layoutType2Props = {
  contentList : ContentList_,
}

function LayoutType2({contentList} : layoutType2Props) {

    const layoutInfo  = useAppSelect(getLayoutInfo);
    const userinfo    = useAppSelect(getUserInfo);
    const contentInfo = useAppSelect(getContentInfo);
    const isLogin     = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const userId      = userinfo.userId; 

    const [value, setValue] = React.useState(0);

    // console.log(`layout${layoutInfo.layoutId}>>`);

    return (
        <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <Header isLogin={isLogin} accessToken={accessToken} userId={userId} user={userinfo} contentCode={contentInfo.contentCode} layoutType={layoutInfo.layoutId} contentList={contentList}/>
          </Grid>
          <Grid sx={{display:'none'}}>
            <TopBanner/>
          </Grid>
          <Grid component="nav">
            <Navbar/>
          </Grid>
          <Hidden smUp>
            <Grid container spacing={1}>
              <Grid component="article" item xs={12}>
                <Content isLogin={isLogin}/>
              </Grid>
            </Grid>  
          </Hidden>
          <Hidden smDown>
            <Grid container spacing={1} sx={{pl:20, pr:20}}>
              <Grid component="aside" item xs={3}>
                <SideArea isLogin={isLogin} userId={userId} user={userinfo} />
              </Grid>
              <Grid component="article" item xs={9}>
                <Content isLogin={isLogin}/>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid component="footer" sx={{pt:1}}>
          <Hidden smUp>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>

          </Hidden>
          <Hidden smDown>
            <Footer/>
          </Hidden>
        </Grid>
      </Grid>  
    )
}

export default LayoutType2;