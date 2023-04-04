import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../../..";
import { Box, Button, Divider, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { MenuCategoryList_, MenuCategory_ } from "..";

function MenuCategoryList () {

    const navigate = useNavigate();

    const [menuCategoryList, setMenuCategoryList] = useState<MenuCategoryList_>([{
        categoryId   : 0,
        categoryName : '',
        isActive : 'false',
        createUser : 0,
        updateUser : 0,
        returnCode      : 0,
        returnMsg       : '',
    }]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = menuCategoryList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleMenuCategoryView = (menuCategory : MenuCategory_, e : React.MouseEvent<HTMLElement>) => {
        navigate(`/admin/menu/category/detail`, {state : {menuCategory : menuCategory}});
    }

    useEffect(() => {
        axiosInstance.get(`/admin/menu/category/list`)
        .then((res) => {
            setMenuCategoryList(res.data);
        });
    },[]);

    return (
        <Box sx={{p:2}}>
            <Typography variant="h4">Menu Category List</Typography>
            <Divider/>
            <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={'10%'}>카테고리 아이디</TableCell>
                        <TableCell width={'60%'}>카테고리 명</TableCell>
                        <TableCell width={'20%'}>사용 여부</TableCell>
                        <TableCell width={'10%'}>관리</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    menuCategoryList.slice(offset, offset+limit).map((m, index) => (
                        <TableRow key={index + offset + 1}>
                            <TableCell>{m.categoryId}</TableCell>
                            <TableCell>{m.categoryName}</TableCell>
                            <TableCell>{m.isActive ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell><Button onClick={(e) => handleMenuCategoryView(m as MenuCategory_, e)}>관리</Button></TableCell>
                        </TableRow>
                    ))
                }                
                </TableBody>    
            </Table>
            </TableContainer>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}} />
        </Box>
    )
}

export default MenuCategoryList;