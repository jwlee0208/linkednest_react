import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination, Breadcrumbs, Typography, Link, Divider } 
                                        from '@mui/material';
import { Box }                          from '@mui/system';
import React, { useEffect, useState }   from 'react';
import { axiosInstance }                from '../../../../..';
import { UserRoleList_, UserRole_ } from '.';
import { useNavigate } from 'react-router';

function UserRoleList() {

    const [userRoleList, setUserRoleList] = useState<UserRoleList_>([{
        roleId      : 0,
        roleName    : '',
        userNo      : 0,
        userId      : '',
    }]);

    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage]   = useState(1);
    const offset            = (page - 1) * limit;

    let listCnt = userRoleList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleEditUserRole = (roleId : number, userId : String, event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log('[delete] roleId : ', roleId, 'userId : ', userId);
        navigate('/admin/role/user/edit', {state : {userId : userId, roleId : roleId}});
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };
    
    useEffect(() => {
        axiosInstance({
            method          : 'post'
          , url             : '/admin/role/user/list'
          , params          : {}
        }).then((res) => {
            setUserRoleList(res.data);
        });
    
        console.log('userRoleList : ', userRoleList);

    },[]);

    return (
    <Box sx={{width : '100%', p : 3}}>   
        <Typography variant="h3">User Role List</Typography>
        <Divider/>
        <br/>

        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">
                Role
            </Link>            
            <Typography color="text.primary">User Role List</Typography>
        </Breadcrumbs>
        <TableContainer>
            <Table>   
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>    
                        <TableCell>권한 아이디</TableCell>
                        <TableCell>권한 명</TableCell>
                        <TableCell>유저 번호</TableCell>
                        <TableCell>유저 아이디</TableCell>
                        <TableCell>관리</TableCell>
                    </TableRow>
                </TableHead>   
                <TableBody>      
        {
            userRoleList.slice(offset, offset+limit).map((userRole, index) => (
              <TableRow key={`${userRole.userNo}-${userRole.roleId}`}>      
                <TableCell>{index + offset + 1}</TableCell>
                <TableCell>{userRole.roleId}</TableCell>
                <TableCell>{userRole.roleName}</TableCell>
                <TableCell>{userRole.userNo}</TableCell>
                <TableCell>{userRole.userId}</TableCell>
                <TableCell>
                    <Button onClick={(e) => handleEditUserRole(userRole.roleId, userRole.userId, e)} >관리</Button>
                </TableCell>
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

export default UserRoleList;