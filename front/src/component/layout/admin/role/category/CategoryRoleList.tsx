import { useEffect, useState }  from "react";
import { MenuCategoryRoleAccessList_, MenuCategoryRoleAccess_ } 
                                from ".";
import { axiosInstance }        from "../../../../..";
import { Box, Button, ButtonGroup, Divider, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } 
                                from "@mui/material";
import { useNavigate }          from "react-router";

function CategoryRoleList() {

    const [menuCategoryRoleAccessList, setMenuCategoryRoleAccessList] = useState<MenuCategoryRoleAccessList_> ([{
        id                      : 0,
        menuCategoryId          : 0,
        menuCategoryName        : '',
        roleId                  : 0,
        roleName                : '',      
        createUserNo            : 0,
        updateUserNo            : 0,  
    }]);

    const navigate          = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage]   = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = menuCategoryRoleAccessList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const moveToCreate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/role/category/edit`);
    }

    const moveToDetail = (categoryRole : MenuCategoryRoleAccess_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/role/category/detail`, {state : {menuCategoryRoleAccess : categoryRole}});
    }

    useEffect(() => {
        axiosInstance({
            method          : 'get'
          , url             : '/admin/role/category/list'
          , params          : {}
        }).then((res) => {
            // console.log('res.data : ', res.data);
            setMenuCategoryRoleAccessList(res.data);
        });
    },[]);

    return (
        <Box sx={{p:3}}>
            <Typography variant="h4">Category Role List</Typography>
            <Divider/>
            <ButtonGroup sx={{p:1, float:'right'}}>
                <Button onClick={(e) => moveToCreate(e)}>Create</Button>
            </ButtonGroup>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>권한 명</TableCell>
                            <TableCell>카테고리 명</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
{
    menuCategoryRoleAccessList.slice(offset, offset+limit).map((categoryRole, index) => (
                        <TableRow key={`${categoryRole.roleName}-${categoryRole.menuCategoryName}-${offset + 1}`}>
                            <TableCell>{index + offset + 1}</TableCell>
                            <TableCell>{categoryRole.id}</TableCell>                        
                            <TableCell>{categoryRole.roleName}</TableCell>                        
                            <TableCell>{categoryRole.menuCategoryName}</TableCell>
                            <TableCell><Button onClick={(e) => moveToDetail(categoryRole as MenuCategoryRoleAccess_, e)}>관리</Button></TableCell>
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

export default CategoryRoleList;