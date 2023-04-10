import { useLocation, useNavigate } from "react-router";
import { useAppSelect }             from "../../../../../store/index.hooks";
import { getUserInfo }              from "../../../../../store/modules/user";
import { useEffect, useState }      from "react";
import { MenuCategoryRoleAccess_ }  from ".";
import { RoleList_ }                from "..";
import { axiosInstance }            from "../../../../..";
import { MenuCategoryList_ }        from "../../menu";
import { Box, Button, Divider, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Typography } 
                                    from "@mui/material";

function EditCategoryRole() {
    
    const navigate = useNavigate();
    const userInfo = useAppSelect(getUserInfo);
    const location = useLocation();
    let   editType = 'create';
    if (location.state !== null) {
        editType = 'edit';
    }

    const [roleList, setRoleList] = useState<RoleList_>([{
        roleId      : 0,
        roleName    : '',
        roleDesc    : '',
    }]);

    const [menuCategoryList, setMenuCategoryList] = useState<MenuCategoryList_>([{
        categoryId      : 0,
        categoryName    : '',
        isActive        : 'false',
        createUser      : 0,
        updateUser      : 0,
        returnCode      : 0,
        returnMsg       : '',
    }]);

    const [menuCategoryRoleAccess , setMenuCategoryRoleAccess] = useState<MenuCategoryRoleAccess_>({
        id                      : 0,
        menuCategoryId          : 0,
        menuCategoryName        : '',
        roleId                  : 0,
        roleName                : '',
        createUserNo            : 0,
        updateUserNo            : 0,       
    });

    const handleCategoryChange = (event: SelectChangeEvent) => {
        event.preventDefault();
        setMenuCategoryRoleAccess({...menuCategoryRoleAccess, menuCategoryId : Number(event.target.value)});
    }

    const handleRoleChange = (event: SelectChangeEvent) => {
        event.preventDefault();
        setMenuCategoryRoleAccess({...menuCategoryRoleAccess, roleId : Number(event.target.value)});
    }

    const saveMenuRole = (e: React.MouseEvent<HTMLElement>) => {
        setMenuCategoryRoleAccess({...menuCategoryRoleAccess, createUserNo : userInfo.userNo});
        createMenuCategoryRoleAccessCall()
        .then((res) => (
            navigate('/admin/role/category/list')
        )).catch((err) => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)
        ));
    }    

    const updateMenuRole = (e: React.MouseEvent<HTMLElement>) => {
        setMenuCategoryRoleAccess({...menuCategoryRoleAccess, updateUserNo : userInfo.userNo});
        updateMenuCategoryRoleAccessCall()
        .then((res) => (
            navigate('/admin/role/category/list')
        )).catch((err) => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)
        ));
    }    
    
    async function createMenuCategoryRoleAccessCall () : Promise<MenuCategoryRoleAccess_> {
        return await axiosInstance({
            method  : 'post',
            url     : '/admin/role/category',
            params  : {
                  roleId         : menuCategoryRoleAccess.roleId
                , menuCategoryId : menuCategoryRoleAccess.menuCategoryId
                , createUserNo   : menuCategoryRoleAccess.createUserNo
            }    
        });
    }

    async function updateMenuCategoryRoleAccessCall () : Promise<MenuCategoryRoleAccess_> {
        return await axiosInstance({
            method  : 'patch',
            url     : '/admin/role/category',
            params  : {
                  id             : menuCategoryRoleAccess.id
                , roleId         : menuCategoryRoleAccess.roleId
                , menuCategoryId : menuCategoryRoleAccess.menuCategoryId
                , updateUserNo   : menuCategoryRoleAccess.updateUserNo    
            }    
        });
    }

    useEffect(() => {
        if (editType === 'edit') {
            const menuCategoryRoleAccessObj = location.state.menuCategoryRoleAccess;
            setMenuCategoryRoleAccess({
                  ...menuCategoryRoleAccess
                , id                : menuCategoryRoleAccessObj.id
                , menuCategoryId    : menuCategoryRoleAccessObj.menuCategoryId
                , menuCategoryName  : menuCategoryRoleAccessObj.menuCategoryName
                , roleId            : menuCategoryRoleAccessObj.roleId
                , roleName          : menuCategoryRoleAccessObj.roleName
                , updateUserNo      : userInfo.userNo
            })
        } else if (editType === 'create') {
            setMenuCategoryRoleAccess({
                ...menuCategoryRoleAccess
                , createUserNo : userInfo.userNo
            })
        }

        axiosInstance.get('/admin/menu/category/list')
            .then((res)  => setMenuCategoryList(res.data))
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
                            value={menuCategoryRoleAccess.menuCategoryId.toString()}
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
                    <Select labelId="roleSelectLabel"
                            id="role"
                            value={menuCategoryRoleAccess.roleId.toString()}
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

export default EditCategoryRole;