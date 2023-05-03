import { useLocation, useNavigate } from "react-router";
import { AdminMenu_ }               from ".";
import { axiosInstance }            from "../../../..";
import { Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Typography } from "@mui/material";

function MenuDetail () {
    const navigate      = useNavigate();
    const location      = useLocation();
    const menu          = location.state.menu;  

    const moveToEdit = (menu : AdminMenu_, e: React.MouseEvent<HTMLElement>) => {
        navigate('/admin/menu/edit', {state : {menu : menu}})
    }

    const handleToDelete = (menuId : number, e: React.MouseEvent<HTMLElement>) => {
        axiosInstance({
              method    : 'delete'
            , url       : '/admin/menu'
            , params    : {
                id : menuId
            }
        }).then(res => (
            res.status === 200 ? navigate('/admin/menu/list') : alert(`occurred exception : [${res.data.returnCode}]`)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)     
        ))
    }

    return (
        <Box sx={{p : 2}}>
            <Typography variant="h4">Menu Detail</Typography>
            <Divider/>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">카테고리 아이디</FormLabel></Grid>
                <Grid item xs={10}>{menu.id}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">카테고리 명</FormLabel></Grid>
                <Grid item xs={10}>{menu.categoryName}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">메뉴 명</FormLabel></Grid>
                <Grid item xs={10}>{menu.name}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">메뉴 URL</FormLabel></Grid>
                <Grid item xs={10}>{menu.url}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">메뉴 영역 노출 여부</FormLabel></Grid>
                <Grid item xs={10}>{menu.show ? 'Show' : 'Action'}</Grid>
            </Grid>

            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(menu as AdminMenu_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(menu.id, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>
        </Box>
    )
}

export default MenuDetail;