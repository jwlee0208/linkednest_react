import React from "react";
import { useNavigate }     from 'react-router-dom';
import { useAppSelect }    from "../../../store/index.hooks";
import { getLayoutInfo }   from "../../../store/modules/layout";
import { axiosInstance }   from "../../..";
import userSlice, { User } from "../../../store/modules/user";
import store               from "../../../store";
import logo                from './logo.svg';

import Button              from '@mui/material/Button';
import Link                from '@mui/material/Link';
import AdbIcon             from '@mui/icons-material/Adb';
import MenuIcon            from '@mui/icons-material/Menu';
import FormControl         from "@mui/material/FormControl";
import InputLabel          from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography, AppBar, Avatar, IconButton
       , ButtonGroup, Box, Container, Menu
       , MenuItem, Toolbar, Tooltip } from "@mui/material";

type HeaderProps = {
    user        : User,
    isLogin     : boolean;
    username    : string;
    accessToken : string;
    typeId      : string;
};

function Header({
    user,
    isLogin, 
    username, 
    accessToken,
    typeId
} : HeaderProps) {

    const settings = [{menu : 'My Page', path : `/${typeId}/mypage`}, {menu : 'Logout', path : '/logout'}];
    const pages    = (isLogin === true) ? [{menu : 'Home', path : '/'}
                                         , {menu : 'My Page', path : `/${typeId}/mypage`}] 
                                        : [{menu : 'Home', path : '/'}];
    
    const layoutInfo  = useAppSelect(getLayoutInfo);
    const navigate    = useNavigate();
 
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

    const handleMoveType = (e : SelectChangeEvent) => {
        e.preventDefault();
        const typeIdVal = e.target.value;
        navigate(`/${typeIdVal}`);
    }

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
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} keepMounted
                transformOrigin={{vertical: 'top',horizontal: 'left',}} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu_} sx={{display: { xs: 'block', md: 'none' },}}>
                {pages.map((page) => (
                  <MenuItem key={page.menu} onClick={(e) => {handleCloseNavMenu(page.path, e)}}>
                    <Typography textAlign="center">{page.menu}</Typography>
                  </MenuItem>
                ))}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Type List</InputLabel>
                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" label="Type List" onChange={handleMoveType} defaultValue="1" value={typeId}>
                  <MenuItem value={"type1"}>type1</MenuItem>
                  <MenuItem value={"type2"}>type2</MenuItem>
                  <MenuItem value={"type3"}>type3</MenuItem>
                </Select>
            </FormControl>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5" noWrap component="a" href="" 
              sx={{mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
              TEST PROJECT
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Type List</InputLabel>
                <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" label="Type List" onChange={handleMoveType} defaultValue="1" value={typeId}>
                  <MenuItem value={"type1"}>type1</MenuItem>
                  <MenuItem value={"type2"}>type2</MenuItem>
                  <MenuItem value={"type3"}>type3</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page.menu} onClick={(e)=>{handleCloseNavMenu(page.path, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>
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
            <Button onClick={(e)=>{handleCloseNavMenu(`/${typeId}/signup`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignUp</Button>  
            {
              typeId === 'type3' ? (
                <Button onClick={(e)=>{handleCloseNavMenu(`/${typeId}/login`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignIn</Button>          
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