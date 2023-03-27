import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import store from "../../../../store";
import { useAppSelect } from "../../../../store/index.hooks";
import { getLayoutInfo } from "../../../../store/modules/layout";
import userSlice, { AdminMenuCategoryList, User } from "../../../../store/modules/user";
import Login from "../../user/Login";
import { Menu, MenuList, MenuItem, Toolbar, Tooltip, Typography, Paper, ListItemText, ListItemIcon } from "@mui/material";
import { AppBar, Avatar, ButtonGroup, Container, IconButton, Box, Button, FormControl } from "@mui/material";

import { adminMenuCategories, getAdminMenuCategoryInfo } from "../../../../store/modules/adminMenu";

import Divider from '@mui/material/Divider';
import { Cloud } from "@mui/icons-material";
import CategoryMenuRow from "./CategoryMenuRow";
import { randomUUID } from "crypto";


type SideAreaProps = {
    user : User,
    isLogin : Boolean,
    username : String,
    adminMenuList : AdminMenuCategoryList
};

function AdminSideArea({
    user,
    isLogin, 
    username, 
    adminMenuList,
} : SideAreaProps) {

    const navigate      = useNavigate();
    const layoutInfo    = useAppSelect(getLayoutInfo);

    useEffect(() => {

    },[]);

    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        store.dispatch(userSlice.actions.logout(user));
        navigate(`/${layoutInfo.typeId}`);    
    };

    return (
    <>
        <Box component="menu" sx={{ mr: 3, overflow: 'hidden' }} key={0}>
                <Box border={1} borderColor="gray" sx={{ mt: 1, mb: 1 }} key={1}>
                    {
                    isLogin === false ?
                        <Login key={0} />
                        : (
                            <Box sx={{ m: 2 }} key={3}>
                                <Box>{username}님<br />
                                <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                            </Box>
                        )
                    }
                </Box>
                <Box border={1} borderColor="primary.main" bgcolor="" sx={{ minHeight: "200px" }} key={0}>
                    <Box sx={{ m: 1 }} key={4}>
                        <MenuList key={'menuList0'}>
                        {
                        (isLogin === true && adminMenuList !== null) ?    
                            adminMenuList.map(aml => (
                                <Box key={`menu${aml.categoryId}`}>
                                    <CategoryMenuRow key={aml.categoryName} menuCategoryId={aml.categoryId} menuCategoryName={aml.categoryName} menusArr={aml.roleAccessPathList} user={user}/>
                                </Box>
                            ))
                            : (
                                <Box key={'menu2'}>
                                    <CategoryMenuRow key={0} menuCategoryId={0} menuCategoryName={''} menusArr={[]} user={user}/>
                                </Box>
                            )
                        }    
                        </MenuList>
                    </Box>
                </Box>
        </Box>
    </>
    );
}

export default AdminSideArea;