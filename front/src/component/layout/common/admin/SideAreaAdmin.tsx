import React, {useEffect} from "react";
import { Box, Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router";
import store from "../../../../store";
import { useAppSelect } from "../../../../store/index.hooks";
// import { adminMenuCategory, getAdminMenuCategoryInfo } from "../../../../store/modules/adminMenu";
import { getLayoutInfo } from "../../../../store/modules/layout";
import userSlice, { User } from "../../../../store/modules/user";
import Login from "../../user/Login";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, ButtonGroup, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { adminMenuCategories, getAdminMenuCategoryInfo } from "../../../../store/modules/adminMenu";
import MenuRow from "./CategoryMenuRow";


type SideAreaProps = {
    user : User,
    isLogin : Boolean,
    username : String,
};

function SideAreaAdmin({
    user,
    isLogin, 
    username, 
} : SideAreaProps) {

    const navigate = useNavigate();
    const layoutInfo = useAppSelect(getLayoutInfo);

    let adminMenuList = useAppSelect(getAdminMenuCategoryInfo);
    console.log('sideAreaAdmin >>>>>>> adminMenuList : ' + JSON.stringify(adminMenuList));

    useEffect(() => {


    },[]);

//     const adminMenuList = useAppSelect(getAdminMenuCategoryInfo);


    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        store.dispatch(userSlice.actions.logout(user));
        navigate(`/${layoutInfo.typeId}`);    
    };
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleCloseNavMenu = (param : string, event : React.MouseEvent<HTMLElement>) => {
        navigate(param);
        setAnchorElNav(null);
    };
    
    return (
        <Box component="menu" sx={{mr:3, overflow: 'hidden'}}>
            <Box border={1} borderColor="gray" sx={{mt:1, mb:1}}>
                {isLogin === false ? 
                    <Login/> 
                    : (
                        <Box sx={{ m: 2 }}>
                            <Box>{username}님<br/>
                            <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                        </Box>    
                    )
                }  
            </Box>
            <Box border={1} borderColor="primary.main" bgcolor="gray" sx={{minHeight:"200px"}}>
                <Box sx={{ m: 1 }}>
                    {
                        adminMenuList.adminMenuCategories.map(aml => (<MenuRow menuCategoryId={aml.id} menuCategoryName={aml.categoryName} menusArr={aml.menus}/>))
                            // (<MenuRow menuCategoryId={aml.id} menuCategoryName={aml.categoryName} menusArr={aml.menus}/>)
                        
                    }
                </Box>
            </Box>    
            <Box border={1} borderColor="primary.main" bgcolor="gray" sx={{mt:1, mb:1, minHeight:"200px"}}>
                <Box sx={{ m: 1 }}>
                    Area3
                </Box>
            </Box>  
        </Box>
    );
}

export default SideAreaAdmin;