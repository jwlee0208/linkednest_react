import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Image from 'mui-image';
import * as React from 'react';
import { ContentList_ } from '../../../../store/modules/content';
import { User } from '../../../../store/modules/user';


type PortalMenuProps = {
    user        : User,
    isLogin     : boolean;
    userId      : string;
    accessToken : string;
    contentCode : string;
    layoutType  : string;
    contentList : ContentList_;
};

const drawerWidth = 390;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function PortalHeader({
    user,
    isLogin, 
    userId, 
    accessToken,
    contentCode,
    layoutType,
    contentList,
} : PortalMenuProps) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const movePage = (url : string, event : React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    window.location.href = `${url}`;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:'#330000'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Test Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{textAlign:'left', backgroundColor:'#333333'}}>
          <Typography component='div' variant='h4' sx={{color:'azure'}}>Linkednest</Typography>
          <IconButton onClick={handleDrawerClose} sx={{color:'azure'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h5' sx={{fontWeight: 'bold', pl: 2, pt:2, pb:2}}>Contents</Typography>
        <Divider />
        <List>
{
    contentList.map((content) => (
            <ListItem key={content.contentCode} disablePadding>
              <ListItemButton>
                <ListItemText onClick={(e) => movePage(`${content.homepageUrl}`, e)} primary={content.contentName} sx={{width:'50%', fontWeight:'bold'}}/>
                <ListItemIcon sx={{width:'50%'}}>
                    <IconButton href={content.homepageUrl}>
                        <Image src={content.logoImagePath} height={20}/>
                    </IconButton>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>        
    ))
}    
        </List>
        <Divider />
        <List>
            <Typography>&nbsp;&nbsp;&nbsp;To-Do...</Typography>
        </List>
      </Drawer>
    </Box>
  );
}
export default PortalHeader;