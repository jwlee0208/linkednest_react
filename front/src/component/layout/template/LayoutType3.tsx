import { useAppSelect }   from "../../../store/index.hooks";
import { getUserInfo }    from "../../../store/modules/user";
import { getLayoutInfo }  from "../../../store/modules/layout";
import { Grid }           from "@mui/material";
import Header             from "../common/Header";
import Footer             from "../common/Footer";
import Navbar             from "../common/Navbar";
import TopBanner          from "../common/TopBanner";
import Content            from "../common/Content";
import RestoreIcon        from '@mui/icons-material/Restore';
import FavoriteIcon       from '@mui/icons-material/Favorite';
import LocationOnIcon     from '@mui/icons-material/LocationOn';
import React              from "react";
import Hidden             from "@mui/material/Hidden";
import BottomNavigation       from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

function LayoutType3() {

    console.log("layout3>>");

    const layoutInfo  = useAppSelect(getLayoutInfo);
    const userinfo    = useAppSelect(getUserInfo);
    const isLogin     = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username    = userinfo.username; 

    const [value, setValue] = React.useState(0);

    return (
        <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <Header isLogin={isLogin} accessToken={accessToken} username={username} user={userinfo}  typeId={layoutInfo.typeId}/>
          </Grid>
          <Grid>
            <TopBanner/>
          </Grid>
          <Grid component="nav">
            <Navbar/>
          </Grid>
          <Grid container spacing={1}>
            <Grid component="article" item xs={12}>
              <Content isLogin={isLogin}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid component="footer">
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

export default LayoutType3;