import React    from "react";
import logo     from './logo.svg';
import Button   from '@mui/material/Button';
import AdbIcon  from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import store    from "../../../../store";

import userSlice, { User }  from "../../../../store/modules/user";
import { useNavigate }      from 'react-router-dom';
import { useAppSelect }     from "../../../../store/index.hooks";
import { getLayoutInfo }    from "../../../../store/modules/layout";
import { axiosInstance }    from "../../../..";
import { AppBar, Avatar, Box, ButtonGroup
       , Container, IconButton, Menu, MenuItem
       , Toolbar, Tooltip, Typography } from "@mui/material";

type HeaderProps = {
    user        : User,
    isLogin     : boolean;
    username    : string;
    accessToken : string;
    typeId      : string;
};

function AdminHeader({
    user,
    isLogin, 
    username, 
    accessToken,
    typeId
} : HeaderProps) {

    const settings    = [{menu : 'My Page', path : `/${typeId}/mypage`}, {menu : 'Logout', path : '/logout'}];
    const layoutInfo  = useAppSelect(getLayoutInfo);
    const navigate    = useNavigate();
 
    const [anchorElNav, setAnchorElNav]   = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (param : string, event : React.MouseEvent<HTMLElement>) => {
        navigate(param);
        setAnchorElNav(null);
    };

    const handleCloseNavMenu_ = () => {
        setAnchorElNav(null);
    }

    const handleCloseUserMenu = (param : string, event : React.MouseEvent) => {
        if (param === '/logout') {
            store.dispatch(userSlice.actions.logout(user));
            navigate(`/${layoutInfo.typeId}`);    
        } else {
            navigate(param);
        }
        setAnchorElUser(null);
    };

    const handleCloseUserMenu_ = () => {
        setAnchorElUser(null);
    };

    const callAdmin = (param : string, event : React.MouseEvent) => {
      event.preventDefault();
      axiosInstance.get(`${param}`);

    }

    return (
        <AppBar position="static">
          <Container maxWidth={false}>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography variant="h6" noWrap component="a" href="/"
              sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
              TEST PROJECT
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5" noWrap component="a" href="" 
              sx={{mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
              TEST PROJECT
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
            {(isLogin === true) ? (
            <Box sx={{ flexGrow: 0 }}>                
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top', horizontal: 'right',}} 
                keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu_}>
                {settings.map((setting) => (
                  <MenuItem key={setting.menu} onClick={(e)=>{handleCloseUserMenu(setting.path, e)}}>
                    <Typography textAlign="center">{setting.menu}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>              
    ) : (
        <Box sx={{ flexGrow: 0 }}>        
          <ButtonGroup>
            <Button onClick={(e)=>{handleCloseNavMenu("/signup", e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignUp</Button>  
            {/* <Button onClick={(e)=>{handleCloseNavMenu(`/${typeId}/login`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignIn</Button>           */}
          </ButtonGroup>        
        </Box>      
    )
  }
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default AdminHeader;