import { useLocation, useNavigate } from "react-router";
import { useAppSelect } from "../../../../store/index.hooks";
import { getUserInfo } from "../../../../store/modules/user";
import { Role_ } from ".";
import { useState, useEffect } from "react";
import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { axiosInstance } from "../../../..";

function EditRole() {
    const navigate = useNavigate();
    const userInfo = useAppSelect(getUserInfo);
    const location = useLocation();
    let   editType = 'create';
    if (location.state !== null) {
        editType = 'edit';
    }

    const [role, setRole] = useState<Role_>({
        roleId      : 0,
        roleName    : '',
        roleDesc    : '',
    });
    
    const inputRoleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setRole({...role, roleName : e.target.value});
        // console.log(e.target.value);
    }

    const inputRoleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setRole({...role, roleDesc : e.target.value});
        // console.log(e.target.value);
    }

    const saveRole = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();        
        createRole().then((res) => (
            navigate('/admin/role/list')
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)  
        ));
    }

    async function createRole () : Promise<Role_> {
        return await axiosInstance({
            method  : "POST",
            url     : '/admin/role',
            params  : { 
                  roleName : role.roleName
                , roleDesc : role.roleDesc        
            }        
        });    
    }

    const updateRole = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();    
        axiosInstance.patch('/admin/role', {
              roleId        : role.roleId
            , roleName      : role.roleName
            , roleDesc      : role.roleDesc
        })
        .then(res => 
            navigate('/admin/role/list')
        )
        .catch(err => 
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        );
    }

    useEffect(() => {
        if (editType === 'edit') {
            const roleObj = location.state.role;
            setRole({
                ...role
                , roleId        : roleObj.roleId
                , roleName      : roleObj.roleName
                , roleDesc      : roleObj.roleDesc
            })    
        } 
    }, []);

    return (
        <Box sx={{p: 3}}>
            <Typography variant='h4'>{editType === 'create' ? 'Create' : 'Edit'} Role</Typography>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="name"  label="Role Name" variant="filled" color="success" onChange={inputRoleName} value={role.roleName} type="text" helperText="Please enter role name" autoComplete="off"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="url"  label="Role Description" variant="filled" color="success" onChange={inputRoleDesc} value={role.roleDesc} type="text" helperText="Please enter role description" autoComplete="off"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button variant="outlined" size="large" onClick={(editType === 'create') ? saveRole : updateRole}>Save</Button>
                </FormControl>
            </Grid>
        </Box>        
    )

}

export default EditRole;