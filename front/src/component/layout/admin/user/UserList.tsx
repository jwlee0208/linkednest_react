import { Box, Typography, Divider, Breadcrumbs, Link } from "@mui/material";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../../..";
import { User } from "../../../../store/modules/user";

function UserList () {

    interface UserList extends Array<User>{};

    const [userList, setUserList] = useState<UserList>([{
        userNo                  : 0,
        userId                : '',
        password                : '',
        nickname                : '',
        email                   : '',
        introduce               : '',
        accessToken             : '',
        refreshToken            : '',
        isLogin                 : false,
        adminMenuCategoryList   : [],
        userRoleInfoList        : [],
        roleInfoList            : [],
        birthday                : '',
        sex                     : '',
        phoneNo                 : '',
        additionalPhoneNo       : '',
        address                 : '',
        detailAddress           : '',
        zipcode                 : 0,
        userProfile             : {
            sex         : '',
            phoneNo     : '',
            birthday    : '',
        },
        returnCode              : 0,
    }]);

    const navigate = useNavigate();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = userList.length;
    let pageCnt = Math.ceil(listCnt/10);

    useEffect(() => {
        axiosInstance({
            method          : 'post'
          , url             : '/admin/user/list'
          , params          : {}
        }).then((res) => {
            setUserList(res.data);
        });
    
        console.log('userList : ', userList);

    },[]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleUserView = (userNo : number, userId : string, e : React.MouseEvent<HTMLElement>) => {
        navigate(`/admin/user/detail`, {state : {userNo : userNo, userId : userId}});
    }

    return (
        <Box sx={{width : '100%', p : 3}}>    
        <Typography variant="h3">User List</Typography>
        <Divider/>
        <br/>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit">User</Link>            
            <Typography color="text.primary">User List</Typography>
        </Breadcrumbs>
        <TableContainer>
            <Table>   
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>    
                        <TableCell>유저 번호</TableCell>
                        <TableCell>유저 아이디</TableCell>
                        <TableCell>유저 닉네임</TableCell>                        
                        <TableCell>이메일</TableCell>
                        <TableCell>상세 보기</TableCell>
                    </TableRow>
                </TableHead>   
                <TableBody>      
        {
            userList.slice(offset, offset+limit).map((user, index) => (

              <TableRow key={user.userNo}>      
                <TableCell>{index + offset + 1}</TableCell>
                <TableCell>{user.userNo}</TableCell>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.nickname}</TableCell>                
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <Button onClick={(e) => handleUserView(user.userNo, user.userId, e)}>관리</Button>
                </TableCell>
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

export default UserList;