import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import store from "../../../../store";
import { useAppSelect } from "../../../../store/index.hooks";
import { getLayoutInfo } from "../../../../store/modules/layout";
import userSlice, { User } from "../../../../store/modules/user";
import Login from "../../user/Login";
import { Menu, MenuList, MenuItem, Toolbar, Tooltip, Typography, Paper, ListItemText, ListItemIcon } from "@mui/material";
import { AppBar, Avatar, ButtonGroup, Container, IconButton, Box, Button, FormControl } from "@mui/material";

import { adminMenuCategories, getAdminMenuCategoryInfo } from "../../../../store/modules/adminMenu";
import MenuRow from "./CategoryMenuRow";

import Divider from '@mui/material/Divider';
import { Cloud } from "@mui/icons-material";


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

    const navigate      = useNavigate();
    const layoutInfo    = useAppSelect(getLayoutInfo);
    const adminMenuList = useAppSelect(getAdminMenuCategoryInfo);

    console.log('sideAreaAdmin >>>>>>> adminMenuList : ' + JSON.stringify(adminMenuList));

    useEffect(() => {

    },[adminMenuList]);

    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        store.dispatch(userSlice.actions.logout(user));
        navigate(`/${layoutInfo.typeId}`);    
    };

    return (
    <>
        <Box>

        </Box>
        <Box component="menu" sx={{ mr: 3, overflow: 'hidden' }}>
                <Box border={1} borderColor="gray" sx={{ mt: 1, mb: 1 }}>
                    {isLogin === false ?
                        <Login />
                        : (
                            <Box sx={{ m: 2 }}>
                                <Box>{username}님<br />
                                    <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                            </Box>
                        )}
                </Box>
                <Box border={1} borderColor="primary.main" bgcolor="" sx={{ minHeight: "200px" }}>
                    <Box sx={{ m: 1 }}>
                        <MenuList>
                        {(isLogin === true) ?
                            adminMenuList.adminMenuCategories.map(aml => (
                                <MenuRow menuCategoryId={aml.id} menuCategoryName={aml.categoryName} menusArr={aml.menus} />
                            ))
                            : <></>}
                        </MenuList>
                    </Box>
                </Box>
        </Box>
    </>
    );
}

export default SideAreaAdmin;