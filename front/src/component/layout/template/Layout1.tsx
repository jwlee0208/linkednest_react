
import { useAppSelect } from "../../../store/index.hooks";
import { getUserInfo } from "../../../store/modules/user";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SideArea from "../common/SideArea";
import { Grid } from "@mui/material";
import Navbar from "../common/Navbar";
import TopBanner from "../common/TopBanner";
import { getLayoutInfo } from "../../../store/modules/layout";
import Hidden from "@mui/material/Hidden";
import Content from "../common/Content";

/* const Styles = styled('div')(({theme}) => ({
  [theme.breakpoints.down('lg')] : {
    flexShrink:0,
    width : 0,
    display:"none",
    //  justifyContent : 'flex-end'
  }
}));
 */


function Layout1() {
  // const {classes} = SideAreaStyle_();

/*   const theme = useTheme();

  const useStyles = makeStyles(theme => ({
    root : {
      display : 'flex'
    },
    drawerHeader : {
      display:'flex',
      alignItems : 'center',
      padding : theme.spacing(0,1),
      ...theme.mixins.toolbar,
      justifyContent : 'flex-end'
      
    }
  }));    
 */
    console.log("layout1>>");

    const userinfo = useAppSelect(getUserInfo);
    const isLogin = userinfo.isLogin;
    const accessToken = userinfo.accessToken; 
    const username = userinfo.username; 

    const layoutinfo = useAppSelect(getLayoutInfo);

    return (

      <Grid sx={{display:'flex', height:'100vh', flexDirection : 'column'}} xs={12} lg={12} md={12}>
        <Grid sx={{flex:'1'}}>  
          <Grid component="header">
            <Header isLogin={isLogin} accessToken={accessToken} username={username} user={userinfo} typeId={layoutinfo.typeId}/>
          </Grid>
          <Grid>
            <TopBanner/>
          </Grid>
          <Grid component="nav">
            <Navbar/>
          </Grid>
          <Hidden smDown>  
            <Grid container spacing={1} lg={12} md={12}>
                <Grid component="article" item lg={9} md={9} xs={9}>
                  <Content isLogin={isLogin}/>
                </Grid>
                <Grid component="aside" item lg={3} md={3} xs={3}>
                  <SideArea isLogin={isLogin} username={username} user={userinfo} />
                </Grid>
            </Grid>
          </Hidden>
          <Hidden smUp>
                <Grid component="article" item lg={12} md={12} xs>
                  <Content isLogin={isLogin}/>
                </Grid>
          </Hidden>
        </Grid>

        <Grid component="footer">
          <Footer/>
        </Grid>

      </Grid> 

    )
}

export default Layout1;