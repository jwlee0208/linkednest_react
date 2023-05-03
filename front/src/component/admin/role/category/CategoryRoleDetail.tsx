import { useLocation, useNavigate } from "react-router";
import { MenuCategoryRoleAccess_ } from ".";
import { axiosInstance } from "../../../..";
import { Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Typography } from "@mui/material";

function CategoryRoleDetail() {
    const navigate      = useNavigate();
    const location      = useLocation();
    const menuCategoryRoleAccess = location.state.menuCategoryRoleAccess;

    const moveToEdit = (menuCategoryRoleAccess : MenuCategoryRoleAccess_, e: React.MouseEvent<HTMLElement>) => {
        // console.log('moveToEdit : ', menuCategoryRoleAccess);
        navigate('/admin/role/category/edit', {state : {menuCategoryRoleAccess : menuCategoryRoleAccess}})
    }

    const handleToDelete = (id : number, e: React.MouseEvent<HTMLElement>) => {
        axiosInstance({
              method    : 'delete'
            , url       : '/admin/role/category'
            , params    : {
                id : id
            }
        }).then(res => (
            res.status === 200 ? navigate('/admin/role/category/list') : alert(`occurred exception : [${res.data.returnCode}]`)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        ))
    }

    return (
        <Box sx={{p:3}}>
            <Typography variant="h4">Category Role Detail</Typography>
            <Divider/>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">아이디</FormLabel></Grid>
                <Grid item xs={10}>{menuCategoryRoleAccess.id}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">카테고리 아이디</FormLabel></Grid>
                <Grid item xs={10}>{menuCategoryRoleAccess.menuCategoryId}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">카테고리 명</FormLabel></Grid>
                <Grid item xs={10}>{menuCategoryRoleAccess.menuCategoryName}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">권한 아이디</FormLabel></Grid>
                <Grid item xs={10}>{menuCategoryRoleAccess.roleId}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">권한 명</FormLabel></Grid>
                <Grid item xs={10}>{menuCategoryRoleAccess.roleName}</Grid>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(menuCategoryRoleAccess as MenuCategoryRoleAccess_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(menuCategoryRoleAccess.id, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>
        </Box>
    )
}

export default CategoryRoleDetail;