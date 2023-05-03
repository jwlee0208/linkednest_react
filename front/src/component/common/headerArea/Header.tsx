import React, { useEffect }   from "react";
import { useNavigate }        from 'react-router-dom';
import { User, asyncLogout }  from "../../../store/modules/user";
import Button              from '@mui/material/Button';
import AdbIcon             from '@mui/icons-material/Adb';
import MenuIcon            from '@mui/icons-material/Menu';
import FormControl         from "@mui/material/FormControl";
import { Typography, AppBar, Avatar, IconButton, ButtonGroup, Box, Container, Menu
       , MenuItem, Toolbar, Tooltip } 
                           from "@mui/material";
import { ContentList_ }    from "../../../store/modules/content";
import SelectBoxForContent from "./SelectBoxForContent";
import { useAppDispatch }  from "../../../store/index.hooks";

type HeaderProps = {
    user        : User,
    isLogin     : boolean;
    userId      : string;
    accessToken : string;
    contentCode : string;
    layoutType  : string;
    contentList : ContentList_;
};

function Header({
    user,
    isLogin, 
    userId, 
    accessToken,
    contentCode,
    layoutType,
    contentList,
} : HeaderProps) {

    const settings = [{menu : 'My Page', path : `/${contentCode}/mypage`}, {menu : 'Logout', path : '/logout'}];
    const pages    = (isLogin === true) ? [{menu : 'Home', path : `/${contentCode}`}
                                         , {menu : 'My Page', path : `/${contentCode}/mypage`}] 
                                        : [{menu : 'Home', path : `/${contentCode}`}];
    
    const navigate    = useNavigate();
    const dispatch    = useAppDispatch();
    
    const [anchorElNav, setAnchorElNav]   = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenNavMenu   = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleOpenUserMenu  = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu  = (param : string, event : React.MouseEvent<HTMLElement>) => {
      navigate(param);
      setAnchorElNav(null);
    };

    const handleCloseNavMenu_ = () => {
      setAnchorElNav(null);
    }

    const handleCloseUserMenu = (param : string, event : React.MouseEvent) => {
        if (param === '/logout') {
          dispatch(asyncLogout());
          navigate(`/${contentCode}`);    
        } else {
          navigate(param);
        }
        setAnchorElUser(null);
    };

    const handleCloseUserMenu_ = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
     }, [])

    return (
        <AppBar position="sticky" color="default">
          <Container maxWidth={false}>
          <Toolbar disableGutters variant="dense" sx={{ height: '70px' }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6" noWrap component="a" href="/"
              sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
              TEST PROJECT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} keepMounted
                transformOrigin={{vertical: 'top',horizontal: 'left',}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu_} sx={{display: { xs: 'block', md: 'none' },}}>
                {pages.map((page) => (
                  <MenuItem key={page.menu} onClick={(e) => {handleCloseNavMenu(page.path, e)}}>
                    <Typography textAlign="center" sx={{color:'WindowText'}}>{page.menu}</Typography>
                  </MenuItem>
                ))}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <SelectBoxForContent contentCode={contentCode} contentList={contentList}/>
            </FormControl>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5" noWrap component="a" href="" 
              sx={{mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
              TEST PROJECT
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <SelectBoxForContent contentCode={contentCode} contentList={contentList}/>
            </FormControl>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page.menu} 
                        onClick={(e)=>{handleCloseNavMenu(page.path, e)}} 
                        sx={{ my: 2, color: 'WindowText', display: 'block' }}>
                  {page.menu}
                </Button>
              ))}
            </Box>
            {(isLogin === true) ? (
            <Box sx={{ flexGrow: 0 }}>                
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: '45px' }} 
                    id="menu-appbar" 
                    anchorEl={anchorElUser} 
                    anchorOrigin={{vertical: 'top', horizontal: 'right',}} 
                    keepMounted 
                    transformOrigin={{vertical: 'top', horizontal: 'right',}} 
                    open={Boolean(anchorElUser)} 
                    onClose={handleCloseUserMenu_}>
                {settings.map((setting) => (
                  <MenuItem key={setting.menu} 
                            onClick={(e)=>{handleCloseUserMenu(setting.path, e)}}>
                    <Typography textAlign="center">{setting.menu}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>              
    ) : (
        <Box sx={{ flexGrow: 0 }}>        
          <ButtonGroup>
            <Button onClick={(e)=>{handleCloseNavMenu(`/${contentCode}/signup`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignUp</Button>  
            {
              layoutType === '3' ? (
                <Button onClick={(e)=>{handleCloseNavMenu(`/${contentCode}/login`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignIn</Button>          
              ) : (<></>)
            }
          </ButtonGroup>        
        </Box>      
    )
  }
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Header;