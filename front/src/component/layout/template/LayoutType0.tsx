
import FavoriteIcon                     from '@mui/icons-material/Favorite';
import LocationOnIcon                   from '@mui/icons-material/LocationOn';
import RestoreIcon                      from '@mui/icons-material/Restore';
import { Grid }                         from "@mui/material";
import BottomNavigation                 from "@mui/material/BottomNavigation";
import BottomNavigationAction           from "@mui/material/BottomNavigationAction";
import Hidden                           from "@mui/material/Hidden";
import React                            from "react";
import { useAppSelect }                 from "../../../store/index.hooks";
import { ContentList_, getContentInfo } from "../../../store/modules/content";
import { getLayoutInfo }                from "../../../store/modules/layout";
import { getUserInfo }                  from "../../../store/modules/user";
import Footer                           from "../common/Footer";
import PortalHeader                     from '../common/headerArea/PortalHeader';
import PortalBanner                     from '../main/banner/PortalBanner';

type layoutType0Props = {
    contentList : ContentList_,
}

function LayoutType0 ({contentList} : layoutType0Props) {

    const layoutInfo  = useAppSelect(getLayoutInfo);
    const userinfo    = useAppSelect(getUserInfo);
    const contentInfo = useAppSelect(getContentInfo);
    const isLogin     = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const userId      = userinfo.userId; 

    const [value, setValue] = React.useState(0);


    return (
        <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <PortalHeader isLogin={isLogin} accessToken={accessToken} userId={userId} user={userinfo}  contentCode={contentInfo.contentCode} layoutType={layoutInfo.layoutId} contentList={contentList}/>
            {/* <Header isLogin={isLogin} accessToken={accessToken} userId={userId} user={userinfo}  contentCode={contentInfo.contentCode} layoutType={layoutInfo.layoutId} contentList={contentList}/> */}
          </Grid>
          <Grid container spacing={1} sx={{pt:10}}>
            <Grid component="article" item xs={12}>
                <PortalBanner contentList={contentList}/>
            </Grid>
          </Grid>
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
              <BottomNavigationAction label="Recents"   icon={<RestoreIcon />} />
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
              <BottomNavigationAction label="Nearby"    icon={<LocationOnIcon />} />
            </BottomNavigation>

          </Hidden>
          <Hidden smDown>
            <Footer/>
          </Hidden>
        </Grid>
      </Grid>  
    )
}

export default LayoutType0;