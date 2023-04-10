import { useEffect, useState }  from "react";
import { axiosInstance }        from "../../../..";
import { RoleList_, Role_ }     from ".";
import { useNavigate }          from "react-router";
import { Box, Button, ButtonGroup, Divider, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

function RoleList() {

    const [roleList, setRoleList] = useState<RoleList_>([{
        roleId   : 0,
        roleName : '',
        roleDesc : '',
    }]);

    const navigate          = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage]   = useState(1);
    const offset            = (page - 1) * limit;

    let listCnt = roleList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const moveToCreate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/role/edit`);
    }

    const moveToRoleDetail = (role : Role_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/admin/role/detail`, {state : {role : role}});
    }

    useEffect(()=>{
        axiosInstance.get('/admin/role/list')
            .then((res) => setRoleList(res.data))
            .catch(err => (
                    alert(`[${err.code}][${err.response.status}] ${err.message}`) 
            )   
    );

    }, [])

    return (
        <Box sx={{p:3}}>
            <Typography variant="h4">Role List</Typography>
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
                            <TableCell>권한 설명</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
{
    roleList.slice(offset, offset+limit).map((role, index) => (
                        <TableRow key={`${role.roleId}`}>
                            <TableCell>{index + offset + 1}</TableCell>
                            <TableCell>{role.roleId}</TableCell>
                            <TableCell>{role.roleName}</TableCell>
                            <TableCell>{role.roleDesc}</TableCell>
                            <TableCell><Button onClick={(e) => moveToRoleDetail(role as Role_, e)}>관리</Button></TableCell>
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

export default RoleList;