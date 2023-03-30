import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../..';

function UserRoleList() {

    const [userRoleList, setUserRoleList] = useState<UserRoleList>([{
        roleId : 0,
        roleName : '',
        userNo : 0,
        userId : '',
    }]);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = userRoleList.length;
    let pageCnt = Math.ceil(listCnt/10);
    // if (listCnt % 10 > 0)  pageCnt = pageCnt+1;

    interface UserRoleList extends Array<UserRole>{}
    interface UserRole {
        roleId : number,
        roleName : string,
        userNo : number,
        userId : string,
    }

    const handleDeleteUserRole = (roleId : number, userNo : number, event : React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        console.log('[delete] roleId : ', roleId, 'userNo : ', userNo);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };
    
    useEffect(() => {
        axiosInstance({
            method          : 'post'
          , url             : '/admin/userRole/list'
          , params          : {}
        }).then((res) => {
            setUserRoleList(res.data);
        });
    
        console.log('userRoleList : ', userRoleList);

    },[]);

    return (
    <>    
        <TableContainer>
            <Table>   
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>    
                        <TableCell>권한 아이디</TableCell>
                        <TableCell>권한 명</TableCell>
                        <TableCell>유저 번호</TableCell>
                        <TableCell>유저 아이디</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>   
                <TableBody>      
        {
            userRoleList.slice(offset, offset+limit).map((userRole, index) => (

              <TableRow>      
                <TableCell>{index}</TableCell>
                <TableCell>{userRole.roleId}</TableCell>
                <TableCell>{userRole.roleName}</TableCell>
                <TableCell>{userRole.userNo}</TableCell>
                <TableCell>{userRole.userId}</TableCell>
                <TableCell>
                    <Button onClick={(e) => handleDeleteUserRole(userRole.roleId, userRole.userNo, e)} >Delete</Button>
                </TableCell>
              </TableRow>  
            ))
        }
                </TableBody>
            </Table>
        </TableContainer>
        <Pagination count={pageCnt} shape="rounded" onChange={handleChange}/>
</>
    )
}

export default UserRoleList;