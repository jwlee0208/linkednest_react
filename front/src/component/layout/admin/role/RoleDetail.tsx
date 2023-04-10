import { Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { Role_ }                    from ".";
import { axiosInstance }            from "../../../..";

function RoleDetail() {
    const navigate      = useNavigate();
    const location      = useLocation();
    const role          = location.state.role;  

    const moveToEdit = (role : Role_, e: React.MouseEvent<HTMLElement>) => {
        console.log('moveToEdit : ', role);
        navigate('/admin/role/edit', {state : {role : role}})
    }

    const handleToDelete = (id : number, e: React.MouseEvent<HTMLElement>) => {
        axiosInstance({
              method    : 'delete'
            , url       : '/admin/role'
            , params    : {
                id : id
            }
        }).then(res => (
            res.status === 200 ? navigate('/admin/role/list') : alert(`occurred exception : [${res.data.returnCode}]`)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        ))
    }

    return (
        <Box sx={{p:3}}>
            <Typography variant="h4">Role Detail</Typography>     
            <Divider/>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">권한 아이디</FormLabel></Grid>
                <Grid item xs={10}>{role.roleId}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">권한 명</FormLabel></Grid>
                <Grid item xs={10}>{role.roleName}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">권한 설명</FormLabel></Grid>
                <Grid item xs={10}>{role.roleDesc}</Grid>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(role as Role_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(role.roleId, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>
        </Box>
    )
}

export default RoleDetail;