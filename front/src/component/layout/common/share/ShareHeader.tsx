import { AppBar, Avatar, Box, Button, ButtonGroup, Container, Divider, Grid, Hidden, IconButton, List, ListItem, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import Header from "../content/headerArea/Header";
import { User, asyncLogout } from "../../../../store/modules/user";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../../store/index.hooks";
import { useState } from "react";
import MenuIcon              from '@mui/icons-material/Menu';
import AdbIcon               from '@mui/icons-material/Adb';

import styled from "@emotion/styled";
import { Logout, Settings } from "@mui/icons-material";

type ShareHeaderProps = {
    isLogin : boolean,
    accessToken : string,
    userId : string,
    user : User
}

function ShareHeader ({
    isLogin, accessToken, userId, user
} : ShareHeaderProps) {
    const settings = [{code: 'mypage', menu : 'My Page', path : `/share/${userId}`}, {code: 'logout', menu : 'Logout', path : '/logout'}];
    const pages    = (isLogin === true) ? [{menu : 'Home', path : `/share/${userId}`}
                                         , {menu : 'My Page', path : `/share/${userId}/mypage`}] 
                                        : [{menu : 'Home', path : `/share/${userId}`}];

    const navigate    = useNavigate();
    const dispatch    = useAppDispatch();
    
    const [anchorElNav, setAnchorElNav]   = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu   = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu  = (param : string, event : React.MouseEvent<HTMLElement>) => {
        // navigate(param);
        window.location.href = param; 
        setAnchorElNav(null);
      };
  
    const handleCloseNavMenu_ = () => {
        setAnchorElNav(null);
    }
  
    const handleCloseUserMenu = (param : string, event : React.MouseEvent) => {
        if (param === '/logout') {
          dispatch(asyncLogout());
          navigate(`/share`);    
        } else {
          navigate(param);
        }
        setAnchorElUser(null);
    };

    const handleCloseUserMenu_ = () => {
        setAnchorElUser(null);
    };

    const LoggedIn = styled(Box)({
        flexGrow: 0, 
        display: 'flex', 
        alignItems: 'center', 
        textAlign: 'left',  
        backgroundColor:'#2c3e50'
      });

      const getUserSettingIcon = (code : string) => {
        switch (code) {
          case 'mypage' : return <ListItemIcon><Avatar/></ListItemIcon>
          case 'logout' : return <ListItemIcon><Logout/></ListItemIcon>  
          default : return ''
        }
      }
  
      const headerBtnArea = () => {
        if (isLogin === true) {
          return (
            <LoggedIn>   
                  <Hidden smDown>
                    <Grid container item xs={12} sx={{width:'100%', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Grid item xs={4}>
                        <Avatar alt={`${user.nickname}`} src="images/avatar/2.jpg" title={user.nickname}/>
                      </Grid>
                      <Grid item xs={8} sx={{fontSize:17, textAlign:'center', pt:1}}>
                        Hello,{user.nickname}
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Hidden smUp>
                    <Divider/>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      <List>
                        <ListItem>
                          <Typography variant="subtitle1" sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>Hello,{user.nickname}</Typography>
                        </ListItem>
                      </List>
                      <Divider />
                      <List>  
                        {settings.map((setting) => (
                          <ListItem key={setting.menu} onClick={(e)=>{handleCloseUserMenu(setting.path, e)}}>
                            {getUserSettingIcon(setting.code)}
                            <Typography textAlign="left">{setting.menu}</Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Box>      
                  </Hidden>
                {/* </IconButton> */}
            </LoggedIn>              
          )
        }
        return (
          <Box sx={{ flexGrow: 0 }}>        
            <ButtonGroup>
              <Button onClick={(e)=>{handleCloseNavMenu(`/portal/signup`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignUp</Button>  
              <Button onClick={(e)=>{handleCloseNavMenu(`/portal/login`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignIn</Button>          
            </ButtonGroup>        
          </Box>      
        )
      }
      const titleArea = () => {
        return (
          <>
            <Hidden smDown>
              <Typography variant="h6" 
                          noWrap 
                          component="a" 
                          href="/share"
                          sx={{mr: 2, display: { xs: 'none', md: 'flex'}, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>
                TEST PROJECT
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant="h5" 
                          noWrap 
                          component="a" 
                          href="/share" 
                          sx={{mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, fontFamily: 'monospace', fontWeight: 500, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none',}}>
                TEST PROJECT
              </Typography>
            </Hidden>
          </>
        )
      }
      const mobileHamburgerMenuArea = () => {
        return (
          <>
            <IconButton size="large" 
                        aria-label="account of current user" 
                        aria-controls="headerMenuAppBarMobile" 
                        aria-haspopup="true" 
                        onClick={handleOpenNavMenu} 
                        color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu id="headerMenuAppBarMobile" 
                  anchorEl={anchorElNav} 
                  anchorOrigin={{vertical: 'bottom', horizontal: 'left',}} 
                  keepMounted
                  transformOrigin={{vertical: 'top',horizontal: 'left',}} 
                  open={Boolean(anchorElNav)} 
                  onClose={handleCloseNavMenu_} 
                  sx={{display: { xs: 'block', md: 'none' }}}>
              <Hidden smUp>{headerBtnArea()}</Hidden>
            </Menu>
          </>
        )
      }

      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
  
      const userAccountArea = () => {
        if (isLogin === true) {
          return (
            <>
              <Box sx={{flexGrow: 1, display: 'flex', flexDirection:'row-reverse' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'headerMenuAppBar' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Hidden smDown>
                      <Typography variant="subtitle1" sx={{pr:1, color:'#ffffff'}}>Hello, {user.nickname}</Typography>
                    </Hidden>
                    <Avatar sx={{ width: 32, height: 32, color:'#2c3e50' }} title={user.nickname}>{user.nickname}</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="headerMenuAppBar"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider/>
                {settings.map((setting) => (
                    <MenuItem key={setting.menu} onClick={(e)=>{handleCloseUserMenu(setting.path, e)}}>
                      {getUserSettingIcon(setting.code)}
                      <Typography textAlign="left">{setting.menu}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </>
          )
        }  
        return (
          <Box sx={{flexGrow: 1, display: 'flex', flexDirection:'row-reverse'  }}>        
            <ButtonGroup>
              <Button onClick={(e)=>{handleCloseNavMenu(`/portal/signup`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignUp</Button>  
              <Button onClick={(e)=>{handleCloseNavMenu(`/portal/login`, e)}} sx={{ my: 2, color: 'white', display: 'block' }}>SignIn</Button>          
            </ButtonGroup>        
          </Box>      
        )
      } 


    return (
        <AppBar id="headerAppBar" position="sticky" color="default" sx={{backgroundColor:'#2c3e50', color:'#ffffff', opacity:0.9}}>
          <Container maxWidth={false}>
            <Toolbar disableGutters variant="dense" sx={{ height: '70px' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                {mobileHamburgerMenuArea()}
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              {titleArea()}
            {userAccountArea()}
          </Toolbar>
        </Container>
      </AppBar>    )
}

export default ShareHeader;