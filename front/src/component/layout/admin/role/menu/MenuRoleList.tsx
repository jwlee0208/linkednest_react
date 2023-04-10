import { useEffect, useState }      from "react";
import { axiosInstance }            from "../../../../..";
import { MenuRoleList_, MenuRole_ } from ".";
import { Box, Breadcrumbs, Divider, Typography, Link, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Pagination, Button, ButtonGroup } 
                                    from "@mui/material";
import { useNavigate }              from "react-router";

function MenuRoleList() {

    const [menuRoleList, setMenuRoleList] = useState<MenuRoleList_>([{
        id               : 0,
        menuCategoryId   : 0,
        menuCategoryName : '',
        menuId           : 0,
        menuName         : '',
        menuUrl          : '',
        roleId           : 0,
        roleName         : '',
        createUserNo     : 0,
        updateUserNo     : 0,
    }]);

    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = menuRoleList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleMenuRoleView = (menuRole : MenuRole_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/role/menu/detail`, {state : {menuRole : menuRole}});
    }

    const moveToCreate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/role/menu/edit`);
    }

    useEffect(() => {
        axiosInstance({
            method          : 'post'
          , url             : '/admin/role/menu/list'
          , params          : {}
        }).then((res) => {
            console.log('res.data : ', res.data);
            setMenuRoleList(res.data);
        });
    },[]);

    return (
        <Box sx={{width : '100%', p : 3}}>   
            <Typography variant="h3">Menu Role List</Typography>
            <Divider/>
            <ButtonGroup sx={{p:1, float:'right'}}>
                <Button onClick={(e) => moveToCreate(e)}>Create</Button>
            </ButtonGroup>
            <br/>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">
                    Role
                </Link>            
                <Typography color="text.primary">Menu Role List</Typography>
            </Breadcrumbs>
            <TableContainer>
                <Table>   
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>    
                            <TableCell>ID</TableCell>
                            <TableCell>카테고리 명</TableCell>
                            <TableCell>메뉴 명</TableCell>
                            <TableCell>메뉴 URL</TableCell>
                            <TableCell>권한 명</TableCell> 
                            <TableCell>관리</TableCell>                        
                        </TableRow>
                    </TableHead>   
                    <TableBody>      
            {
                menuRoleList.slice(offset, offset+limit).map((menuRole, index) => (
                        <TableRow key={index + offset + 1}>      
                            <TableCell>{index + offset + 1}</TableCell>
                            <TableCell>{menuRole.id}</TableCell>
                            <TableCell>{menuRole.menuCategoryName}</TableCell>
                            <TableCell>{menuRole.menuName}</TableCell>
                            <TableCell>{menuRole.menuUrl}</TableCell>
                            <TableCell>{menuRole.roleName}</TableCell>
                            <TableCell><Button onClick={(e) => handleMenuRoleView(menuRole as MenuRole_, e)}>관리</Button></TableCell>
                        </TableRow>  
                ))
            }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}}/>
        </Box>
    )
}

export default MenuRoleList;