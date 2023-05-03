import { Box, Button, Divider, FormControl, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState }               from "react";
import { MenuRole_}                          from ".";
import { RoleList_ }                         from "..";
import { AdminMenuList_, MenuCategoryList_ } from "../../menu";
import { axiosInstance }                     from "../../../../..";
import { useLocation, useNavigate }          from "react-router";
import { useAppSelect }                      from "../../../../../store/index.hooks";
import { getUserInfo }                       from "../../../../../store/modules/user";

function EditMenuRole() {

    const navigate = useNavigate();
    const userInfo = useAppSelect(getUserInfo);
    const location = useLocation();
    let   editType = 'create';
    if (location.state !== null) {
        editType = 'edit';
    }

    const [roleList, setRoleList] = useState<RoleList_>([{
        roleId : 0,
        roleName : '',
        roleDesc : '',
    }]);

    const [menuRole, setMenuRole] = useState<MenuRole_>({
        id               : 0,
        menuCategoryId   : 0,
        menuCategoryName : '',
        menuId           : 0,
        menuName         : '',
        menuUrl          : '',
        roleId           : 0,
        roleName         : '',    
        createUserNo     : 0,
        updateUserNo     : 0,
    });

    const [menuList, setMenuList] = useState<AdminMenuList_>([{
        id      : 0,
        name    : '', 
        url     : '',
        show  : 'false',
        categoryId : 0,
        categoryName : '',
        createUser : 0,
        updateUser : 0,
    }]);

    const [menuCategoryList, setMenuCategoryList] = useState<MenuCategoryList_>([{
        categoryId   : 0,
        categoryName : '',
        isActive : 'false',
        createUser : 0,
        updateUser : 0,
        adminMenuRoleAccessPathList : [],
        returnCode      : 0,
        returnMsg       : '',
    }]);

    const handleCategoryChange = (event: SelectChangeEvent) => {
        event.preventDefault();
        setMenuRole({...menuRole, menuCategoryId : Number(event.target.value)});
    }

    const handleMenuChange = (event: SelectChangeEvent) => {
        event.preventDefault();
        setMenuRole({...menuRole, menuId : Number(event.target.value)});
    }

    const handleRoleChange = (event: SelectChangeEvent) => {
        event.preventDefault();
        setMenuRole({...menuRole, roleId : Number(event.target.value)});
    }

    const saveMenuRole = (e: React.MouseEvent<HTMLElement>) => {
        setMenuRole({...menuRole, createUserNo : userInfo.userNo});
        createMenuRoleCall().then((res) => (
            navigate('/admin/role/menu/list')
        )).catch((err) => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)  
        ));
    }

    const updateMenuRole = (e: React.MouseEvent<HTMLElement>) => {
        setMenuRole({...menuRole, updateUserNo : userInfo.userNo});
        updateMenuRoleCall().then((res) => (
            navigate('/admin/role/menu/list')
        )).catch((err) => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)  
        ));
    }

    async function createMenuRoleCall () : Promise<MenuRole_> {
        return await axiosInstance({
            method  : 'post',
            url     : '/admin/role/menu',
            params  : {
                  createUserNo   : menuRole.createUserNo
                , roleId         : menuRole.roleId
                , menuCategoryId : menuRole.menuCategoryId
                , menuId         : menuRole.menuId
            }
        });        
    }

    async function updateMenuRoleCall () : Promise<MenuRole_> {
        return await axiosInstance({
            method  : 'patch',
            url     : '/admin/role/menu',
            params  : {
                  id                : menuRole.id
                , createUserNo      : menuRole.createUserNo
                , roleId            : menuRole.roleId
                , menuCategoryId    : menuRole.menuCategoryId
                , menuId            : menuRole.menuId
            }
        });        
    }

    useEffect(() => {

        if (editType === 'edit') {
            const menuRoleObj = location.state.menuRole;
            setMenuRole({
                  ...menuRole
                , id             : menuRoleObj.id
                , menuCategoryId : menuRoleObj.menuCategoryId
                , menuId         : menuRoleObj.menuId
                , roleId         : menuRoleObj.roleId
                , updateUserNo   : userInfo.userNo
            })
        } else if (editType === 'create') {
            setMenuRole({
                ...menuRole
                , createUserNo : userInfo.userNo
            })
        }

        axiosInstance
            .get('/admin/menu/category/list')
                .then((res)  => setMenuCategoryList(res.data))
                .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`)  );

        axiosInstance
            .get('/admin/menu/list')
                .then((res)  => setMenuList(res.data))
                .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`)  );
        
        axiosInstance.get('/admin/role/list')
            .then((res)  => setRoleList(res.data))
            .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`)  );
    }, [])

    return (
        <Box sx={{p:3}}>
            <Typography variant="h4">{editType === 'create' ? 'Create' : 'Edit'} Menu Role</Typography>
            <Divider/>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Select labelId="menuCategorySelectLabel"
                            id="menuCategory"
                            value={menuRole.menuCategoryId.toString()}
                            label="Category"
                            onChange={handleCategoryChange}
                            key="menuCategory">
                        <MenuItem value={0}>::: 선택 :::</MenuItem> 
                {
                    menuCategoryList.map(mc => (
                        <MenuItem key={mc.categoryId} value={mc.categoryId}>{mc.categoryName}</MenuItem>
                    ))
                }
                    </Select>           
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Select labelId="menuSelectLabel"
                            id="menu"
                            value={menuRole.menuId.toString()}
                            label="Menu"
                            onChange={handleMenuChange}
                            key="menu">
                        <MenuItem value={0}>::: 선택 :::</MenuItem> 
                {
                    menuList.filter(m => m.categoryId === menuRole.menuCategoryId)
                            .map(m => (
                        <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                    ))
                }
                    </Select>           
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Select labelId="roleSelectLabel"
                            id="role"
                            value={menuRole.roleId.toString()}
                            label="Role"
                            onChange={handleRoleChange}
                            key="role">
                        <MenuItem value={0}>::: 선택 :::</MenuItem> 
                {
                    roleList.map(r => (
                        <MenuItem key={r.roleId} value={r.roleId}>{r.roleName}</MenuItem>
                    ))
                }
                    </Select>           
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button variant="outlined" size="large" onClick={(editType === 'create') ? saveMenuRole : updateMenuRole}>Save</Button>
                </FormControl>
            </Grid>

        </Box>
    )
}

export default EditMenuRole;