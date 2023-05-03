import React, {useEffect}   from "react";
import { useNavigate }      from "react-router";
import { useAppDispatch, useAppSelect } 
                            from "../../../../store/index.hooks";
import { getLayoutInfo }    from "../../../../store/modules/layout";
import { AdminMenuCategoryList, User, asyncLogout } 
                            from "../../../../store/modules/user";
import { MenuList }         from "@mui/material";
import { Box, Button }      from "@mui/material";
import CategoryMenuRow      from "./CategoryMenuRow";
import { getContentInfo }   from "../../../../store/modules/content";
import Login                from "../../../function/user/Login";

type SideAreaProps = {
    user            : User,
    isLogin         : Boolean,
    userId          : String,
    adminMenuList   : AdminMenuCategoryList
};

function AdminSideArea({
    user,
    isLogin, 
    userId, 
    adminMenuList,
} : SideAreaProps) {

    const navigate      = useNavigate();
    const dispatch      = useAppDispatch();
    const layoutInfo    = useAppSelect(getLayoutInfo);
    const contentInfo   = useAppSelect(getContentInfo);

    useEffect(() => {

    },[]);

    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        dispatch(asyncLogout());
        navigate(`/${contentInfo.contentCode}`);    
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
                                <Box>{userId}님<br />
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
                                    <CategoryMenuRow key={aml.categoryName} menuCategoryId={aml.categoryId} menuCategoryName={aml.categoryName} menusArr={aml.adminMenuRoleAccessPathList} user={user}/>
                                </Box>
                            ))
                            : (
                                <Box key={'menu0'}>
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