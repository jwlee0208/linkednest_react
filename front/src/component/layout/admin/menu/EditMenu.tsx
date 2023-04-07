import { useEffect, useState }                          from 'react'
import { useAppSelect }                      from '../../../../store/index.hooks';
import { getUserInfo }                       from '../../../../store/modules/user';
import { Box, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Grid, TextField, Typography, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { axiosInstance } from '../../../..';
import { AdminMenu_, MenuCategoryList_, MenuCategory_ } from '.';
import { useNavigate, useLocation } from 'react-router';

function EditMenu () {

    const navigate = useNavigate();
    const userInfo = useAppSelect(getUserInfo);
    const location = useLocation();
    let   editType = 'create';
    if (location.state !== null) {
        editType = 'edit';
    }

    const [menu, setMenu] = useState<AdminMenu_>({
        id      : 0,
        name    : '', 
        url     : '',
        show  : 'false',
        categoryId : 0,
        categoryName : '',
        createUser : 0,
        updateUser : 0,
     });
    
    const [menuCategoryList, setMenuCategoryList] = useState<MenuCategoryList_>([{
        categoryId   : 0,
        categoryName : '',
        isActive : 'false',
        createUser : 0,
        updateUser : 0,
        returnCode      : 0,
        returnMsg       : '',
    }]);

    const inputMenuName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMenu({...menu, name : e.target.value});
        console.log(e.target.value);
    }

    const inputMenuUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMenu({...menu, url : e.target.value});
        console.log(e.target.value);
    }


    const handleIsShowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMenu({...menu, show : e.target.value});
        console.log('isShow : ', e.target.value);
    }
    
    const saveMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();        
        setMenu({...menu, createUser : userInfo.userNo});
        menu.createUser = userInfo.userNo;
        createMenu().then((res) => (
            // console.log('res : ', res)  
            navigate('/admin/menu/list')
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)  
        ));
    }
    
    async function createMenu () : Promise<AdminMenu_> {
        return await axiosInstance({
            method  : "POST",
            url     : '/admin/menu',
            params  : { 
                  createUser    : menu.createUser
                , categoryId    : menu.categoryId  
                , name          : menu.name
                , url           : menu.url 
                , show          : menu.show
            }        
        });    
    }
    
    const updateMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setMenu({...menu, updateUser : userInfo.userNo});
    
        axiosInstance.patch('/admin/menu', {
              updateUser    : menu.updateUser
            , categoryId    : menu.categoryId
            , id            : menu.id
            , name          : menu.name
            , url           : menu.url
            , show          : menu.show
        })
        .then(res => 
            navigate('/admin/menu/list')
        )
        .catch(err => 
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        );
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setMenu({...menu, categoryId : Number(event.target.value)});
    };

    useEffect(()=>{

        axiosInstance
            .get('/admin/menu/category/list')
                .then((res) => setMenuCategoryList(res.data))
                .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`)  );

        if (editType === 'edit') {
            const menuObj = location.state.menu;
            setMenu({
                ...menu
                , categoryId : menuObj.categoryId
                , categoryName : menuObj.categoryName
                , id : menuObj.id
                , name : menuObj.name
                , url : menuObj.url
                , show : menuObj.show
                , updateUser : userInfo.userNo
            })    
        } else if (editType === 'create') {
            setMenu({
                ...menu
                , createUser : userInfo.userNo
            })    
        }
    },[]);

    return (
        <Box sx={{p: 3}}>
            <Typography variant='h4'>{editType === 'create' ? 'Create' : 'Edit'} Menu</Typography>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="name"  label="Menu Name" variant="filled" color="success" onChange={inputMenuName} value={menu.name} type="text" helperText="Please enter menu name" autoComplete="off"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="url"  label="Menu URL" variant="filled" color="success" onChange={inputMenuUrl} value={menu.url} type="text" helperText="Please enter menu url" autoComplete="off"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Select labelId="menuCategorySelectLabel"
                            id="menuCategory"
                            value={menu.categoryId.toString()}
                            label="Category"
                            onChange={handleCategoryChange}>
                        <MenuItem value={0}>::: 선택 :::</MenuItem>        
                {
                    menuCategoryList.map(mc => (
                        <MenuItem value={mc.categoryId}>{mc.categoryName}</MenuItem>
                    ))
                }
                    </Select>
                </FormControl>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Is Show</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleIsShowChange}
                        value={menu.show}
                    >
                        <FormControlLabel value={true}    control={<Radio />} label="Show"  />
                        <FormControlLabel value={false}   control={<Radio />} label="Action"/>
                    </RadioGroup>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button variant="outlined" size="large" onClick={(editType === 'create') ? saveMenu : updateMenu}>Save</Button>
                </FormControl>
            </Grid>
        </Box>
    )
}

export default EditMenu;