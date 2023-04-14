import { useState, useEffect } from 'react';
import { UserRoleList_, UserRole_ } from ".";
import { useLocation, useNavigate } from 'react-router';
import { useAppSelect } from '../../../../../store/index.hooks';
import { getUserInfo, userRoleInfoList } from '../../../../../store/modules/user';
import { Box, Button, Checkbox, Chip, Divider, FormControl, FormLabel, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme, Typography } from '@mui/material';
import { axiosInstance } from '../../../../..';
import { RoleList_ } from '..';
import theme from '../../../theme';

function EditUserRole() {
    
    const navigate = useNavigate();
    const userInfo = useAppSelect(getUserInfo);
    const location = useLocation();
    let   editType = 'create';
    if (location.state !== null) {
        editType = 'edit';
    }

    const targetUserId = location.state.userId;

    const [roleId, setRoleId] = useState<number[]>([]);

    interface userRoleInfo_ {
        userId : number,
        roleIds : number[]
    }

    const [userRoleInfo, setUserRoleInfo] = useState<userRoleInfo_>({
        userId  : 0,
        roleIds : []
    })

    const [roleList, setRoleList] = useState<RoleList_> ([{
        roleId   : 0,
        roleName : '',
        roleDesc : '',
    }]);

    const [userRoleInfoList, setUserRoleInfoList] = useState<userRoleInfoList> ([{
        roleId                  : 0,
        roleName                : '',
        userRoleAccessPathList  : [],
        adminMenuCategoryList   : [],    
    }]);

    const saveUserRole = () => {
        setUserRoleInfo({...userRoleInfo, userId : targetUserId, roleIds : roleId});
        axiosInstance.post('/admin/role/user', {
                  userId  : targetUserId
                , roleIds : roleId.join(',')}
        ).then((res) => console.log(res)
        ).catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`));

        
        console.log('roleID : ', roleId);
    }

    const handleRoleSelect = (event: SelectChangeEvent<typeof roleId>) => {
        const { target : { value }, } = event;
/*
        console.log('role : ', event.target.value);
        console.log(roleId.filter(rId => rId === event.target.value.toString()).length > 0);
 */
        let isExist = roleId.filter(rId => rId === Number(event.target.value)).length > 0;
        if (isExist === true) {
            setRoleId(roleId.filter(rId => rId !== Number(event.target.value)));
        } else {
            setRoleId(roleId.concat(Number(event.target.value)));
        }
    }    
    
    const setupRoleId = (userRoleInfoList : userRoleInfoList) => {
        setUserRoleInfoList(userRoleInfoList);        
        userRoleInfoList.map(userRoleInfo => roleId.push(userRoleInfo.roleId));
    }

    useEffect(() => {
        axiosInstance.get(`/admin/user/${targetUserId}`).then((res) => setupRoleId(res.data.userRoleInfoList))
        .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`))

        axiosInstance.get('/admin/role/list')
        .then((res)=> setRoleList(res.data))
        .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`))
    }, []);    
    return (
        <Box sx={{p:3}}>
            <Typography variant="h4">{editType === 'create' ? 'Create' : 'Edit'} User Role</Typography>
            <Divider/>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">아이디</FormLabel></Grid>
                <Grid item xs={10}>{targetUserId}</Grid>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="userRoleSelectLabel">Role</InputLabel>
                    <Select labelId="userRoleSelectLabel"
                            id="userRole"
                            native={true}
                            multiple={true}
                            value={roleId}
                            label="User Role"
                            // sx={{height: 300}}
                            size='medium'
                            onChange={handleRoleSelect}
                            variant='outlined'>                           
                {
                    roleList.map(r => (
                        <option key={r.roleId} value={r.roleId} selected={roleId.filter(rId => (rId === r.roleId)).length > 0}>
                            {r.roleName} {((roleId.filter(rId => (rId === r.roleId)).length) > 0) === true}
                        </option>
                        ))
                }
                    </Select>           
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button variant="outlined" size="large" onClick={saveUserRole}>Save</Button>
                </FormControl>
            </Grid>

        </Box>        
    )
}

export default EditUserRole;