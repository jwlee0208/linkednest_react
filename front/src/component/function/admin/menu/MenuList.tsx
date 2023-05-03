import { useEffect, useState }          from "react";
import { AdminMenuList_, AdminMenu_ }   from ".";
import { Box, Button, ButtonGroup, Divider, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } 
                                        from "@mui/material";
import { useNavigate }                  from "react-router";
import { axiosInstance }                from "../../../..";

function MenuList () {

    const navigate = useNavigate();

    const [menuList, setMenuList] = useState<AdminMenuList_>([{
        id              : 0,
        name            : '', 
        url             : '',
        show            : 'false',
        categoryId      : 0,
        categoryName    : '',
        createUser      : 0,
        updateUser      : 0,
    }]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = menuList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
    };

    const handleMenuView = (menu : AdminMenu_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/menu/detail`, {state : {menu : menu}});
    }

    const moveToCreate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/menu/edit`);
    }

    useEffect(() => {
        axiosInstance.get(`/admin/menu/list`)
        .then((res) => {
            setMenuList(res.data);
        });
    },[]);

    return (
        <Box sx={{p:2}}>
            <Typography variant="h4">Menu List</Typography>
            <Divider/>
            <ButtonGroup sx={{p:1, float:'right'}}>
                <Button onClick={(e) => moveToCreate(e)}>Create</Button>
            </ButtonGroup>
            <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={'5%'}>No</TableCell>
                        <TableCell width={'10%'}>메뉴 ID</TableCell>
                        <TableCell width={'15%'}>메뉴 카테고리 명</TableCell>
                        <TableCell width={'20%'}>메뉴 명</TableCell>
                        <TableCell width={'25%'}>메뉴 URL</TableCell>
                        <TableCell width={'15%'}>메뉴 노출 여부</TableCell>
                        <TableCell width={'10%'}>관리</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    menuList.slice(offset, offset+limit).map((m, index) => (
                        <TableRow key={index + offset + 1}>
                            <TableCell>{index + offset + 1}</TableCell>
                            <TableCell>{m.id}</TableCell>
                            <TableCell>{m.categoryName}</TableCell>
                            <TableCell>{m.name}</TableCell>
                            <TableCell>{m.url}</TableCell>
                            <TableCell>{m.show ? 'show' : ''}</TableCell>
                            <TableCell><Button onClick={(e) => handleMenuView(m as AdminMenu_, e)}>관리</Button></TableCell>
                        </TableRow>
                    ))
                }                
                </TableBody>    
            </Table>
            </TableContainer>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}} />
        </Box>    )
}

export default MenuList;