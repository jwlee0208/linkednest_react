import { Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Typography } 
                                    from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { MenuCategory_ }            from "..";
import { axiosInstance }            from "../../../../..";

function MenuCategoryDetail () {

    const navigate      = useNavigate();
    const location      = useLocation();
    const menuCategory  = location.state.menuCategory;  

    const moveToEdit = (menuCategory : MenuCategory_, e: React.MouseEvent<HTMLElement>) => {
        console.log('moveToEdit : ', menuCategory);
        navigate('/admin/menu/category/edit', {state : {menuCategory : menuCategory}})
    }

    const handleToDelete = (categoryId : number, e: React.MouseEvent<HTMLElement>) => {
        axiosInstance({
              method    : 'delete'
            , url       : '/admin/menu/category'
            , params    : {
                categoryId : categoryId
            }
        }).then(res => (
            res.status === 200 ? navigate('/admin/menu/category/list') : alert(`occurred exception : [${res.data.returnCode}]`)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)     
        ))
    }

    return (
        <Box sx={{p : 2}}>
            <Typography variant="h4">Menu Category Detail</Typography>
            <Divider/>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">카테고리 아이디</FormLabel></Grid>
                <Grid item xs={10}>{menuCategory.categoryId}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">카테고리 명</FormLabel></Grid>
                <Grid item xs={10}>{menuCategory.categoryName}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">사용 여부</FormLabel></Grid>
                <Grid item xs={10}>{menuCategory.isActive ? 'Active' : 'Inactive'}</Grid>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(menuCategory as MenuCategory_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(menuCategory.categoryId, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>

        </Box>
    )
}

export default MenuCategoryDetail;