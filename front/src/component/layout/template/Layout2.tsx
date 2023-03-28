import { useAppSelect }   from "../../../store/index.hooks";
import { getUserInfo }    from "../../../store/modules/user";
import { getLayoutInfo }  from "../../../store/modules/layout";
import { Grid }           from "@mui/material";
import Hidden             from "@mui/material/Hidden";
import Navbar             from "../common/Navbar";
import TopBanner          from "../common/TopBanner";
import Header             from "../common/Header";
import Footer             from "../common/Footer";
import SideArea           from "../common/SideArea";
import Content            from "../common/Content";

function Layout2() {

    console.log("layout2>>");

    const layoutInfo  = useAppSelect(getLayoutInfo);
    const userinfo    = useAppSelect(getUserInfo);
    const isLogin     = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username    = userinfo.username; 

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
          <Hidden smUp>
            <Grid container spacing={1}>
              <Grid component="article" item xs={12}>
                <Content isLogin={isLogin}/>
              </Grid>
            </Grid>  
          </Hidden>
          <Hidden smDown>
            <Grid container spacing={1}>
              <Grid component="aside" item xs={3}>
                <SideArea isLogin={isLogin} username={username} user={userinfo} />
              </Grid>
              <Grid component="article" item xs={9}>
                <Content isLogin={isLogin}/>
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

export default Layout2;