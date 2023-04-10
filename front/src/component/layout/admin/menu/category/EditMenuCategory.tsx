import { useEffect, useState }      from 'react'
import { useAppSelect }             from '../../../../../store/index.hooks';
import { getUserInfo }              from '../../../../../store/modules/user';
import { axiosInstance }            from '../../../../..';
import { MenuCategory_ }            from '..';
import { Box, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Grid, TextField, Typography, Button } 
                                    from "@mui/material";
import { useNavigate, useLocation } from 'react-router';

function EditMenuCategory () {

    const navigate = useNavigate();
    const userInfo = useAppSelect(getUserInfo);
    const location = useLocation();
    let   editType = 'create';
    if (location.state !== null) {
        editType = 'edit';
    }

    const [menuCategory, setMenuCategory] = useState<MenuCategory_>({
        categoryId      : 0,
        categoryName    : '',
        isActive        : 'false',
        createUser      : 0,
        updateUser      : 0,
        returnCode      : 0,
        returnMsg       : '',
    });
    
    const inputMenuCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMenuCategory({...menuCategory, categoryName : e.target.value});
        console.log(e.target.value);
    }
    
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMenuCategory({...menuCategory, isActive : e.target.value});
        console.log('isActive : ', e.target.value);
    }
    
    const saveMenuCategory = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();        
        setMenuCategory({...menuCategory, createUser : userInfo.userNo});
        menuCategory.createUser = userInfo.userNo;
        createMenuCategory().then((res) => (
            // console.log('res : ', res)  
            navigate('/admin/menu/category/list')
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)  
        ));
    }
    
    async function createMenuCategory () : Promise<MenuCategory_> {
        return await axiosInstance({
            method : "POST",
            url : '/admin/menu/category',
            params : { 
                  createUser    : menuCategory.createUser
                , categoryName  : menuCategory.categoryName
                , isActive      : menuCategory.isActive
            }        
        });    
    }
    
    const updateMenuCategory = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setMenuCategory({...menuCategory, updateUser : userInfo.userNo});
    
        axiosInstance.patch('/admin/menu/category', {
              updateUser    : menuCategory.updateUser
            , categoryId    : menuCategory.categoryId
            , categoryName  : menuCategory.categoryName
            , isActive      : menuCategory.isActive
        })
        .then(res => 
            navigate('/admin/menu/category/list')
        )
        .catch(err => 
            alert(`[${err.code}][${err.response.status}] ${err.message}`)     
        );
    }

    useEffect(()=>{
        if (editType === 'edit') {
            const menuCategoryObj = location.state.menuCategory;
            setMenuCategory({
                ...menuCategory
                , categoryId : menuCategoryObj.categoryId
                , categoryName : menuCategoryObj.categoryName
                , isActive : menuCategoryObj.isActive
                , updateUser : userInfo.userNo
            })    
        } else if (editType === 'create') {
            setMenuCategory({
                ...menuCategory
                , createUser : userInfo.userNo
            })    
        }
    },[]);

    return (
        <Box sx={{p: 3}}>
            <Typography variant='h4'>{editType === 'create' ? 'Create' : 'Edit'} Menu Category</Typography>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="menuCategoryName"  label="Menu Category Name" variant="filled" color="success" onChange={inputMenuCategoryName} value={menuCategory.categoryName} type="text" helperText="Please enter menu category name" autoComplete="off"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Is Active</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleIsActiveChange}
                        value={menuCategory.isActive}
                    >
                        <FormControlLabel value={true}    control={<Radio />} label="Active"  />
                        <FormControlLabel value={false}   control={<Radio />} label="Inactive"/>
                    </RadioGroup>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button variant="outlined" size="large" onClick={(editType === 'create') ? saveMenuCategory : updateMenuCategory}>Save</Button>
                </FormControl>
            </Grid>
        </Box>
    )
}

export default EditMenuCategory;