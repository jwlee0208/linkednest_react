import { Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Typography } 
                                    from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { MenuRole_ }                from ".";
import { axiosInstance }            from "../../../..";

function MenuRoleDetail() {
    const navigate  = useNavigate();
    const location  = useLocation();
    const menuRole  = location.state.menuRole;  

    const moveToEdit = (menuRole : MenuRole_, e: React.MouseEvent<HTMLElement>) => {
        // console.log('moveToEdit : ', menuRole);
        navigate('/admin/role/menu/edit', {state : {menuRole : menuRole}})
    }

    const handleToDelete = (id : number, e: React.MouseEvent<HTMLElement>) => {
        axiosInstance({
              method    : 'delete'
            , url       : '/admin/role/menu'
            , params    : {
                id : id
            }
        }).then(res => (
            res.status === 200 ? navigate('/admin/role/menu/list') : alert(`occurred exception : [${res.data.returnCode}]`)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        ))
    }

    return (
        <Box sx={{p:3}}>
            <Typography variant="h4">Menu Role Detail</Typography>
            <Divider/>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">카테고리 명</FormLabel></Grid>
                <Grid item xs={10}>{menuRole.menuCategoryName}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">메뉴 명</FormLabel></Grid>
                <Grid item xs={10}>{menuRole.menuName}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">권한 명</FormLabel></Grid>
                <Grid item xs={10}>{menuRole.roleName}</Grid>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(menuRole as MenuRole_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(menuRole.id, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>


        </Box>
    )
}

export default MenuRoleDetail;