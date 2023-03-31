import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../..";
import { User } from "../../../../store/modules/user";
import { Box, Typography, Divider, Grid, FormLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function UserDetail() {

    const location = useLocation();
    const [user, setUser] = useState<User>({
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
        returnCode              : 0,
    })

    console.log('[UserDetail] userNo : ', location.state.userNo);

    useEffect(() => {
        axiosInstance.get(`/admin/user/${location.state.userId}`)
        .then((res) => {
            setUser(res.data);
        });
    
        console.log('user : ', user);

    },[]);

    return (
        <Box sx={{width : '100%', p : 3}}>
            <Typography variant="h3">User Detail</Typography>
            <Divider/>
            <br/>
            <Typography variant="h5">User Basic Info</Typography>
            <br/>
            <Grid container>
                <Grid container alignItems="center" sx={{ m: 1 }}>
                    <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">User ID</FormLabel></Grid>
                    <Grid item xs={10}>{user.userId}</Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ m: 1 }}>
                    <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">Nick Name</FormLabel></Grid>
                    <Grid item xs={10}>{user.nickname}</Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ m: 1 }}>
                    <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">Email</FormLabel></Grid>
                    <Grid item xs={10}>{user.email}</Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ m: 1 }}>
                    <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">Introduce</FormLabel></Grid>
                    <Grid item xs={10}>{user.introduce}</Grid>
                </Grid>
            </Grid>
            <br/>

            <Typography variant="h5">User Role Info</Typography>
            <br/>
            <TableContainer>
            <Table>
                <TableHead>
                            <TableRow>
                                <TableCell>권한 아이디</TableCell>
                                <TableCell>권한 명</TableCell>
                                <TableCell>메뉴 권한</TableCell>
                            </TableRow>    
                        </TableHead>                        
                        <TableBody>
            {
                user.userRoleInfoList.map(uri => (
                    <TableRow>
                    <TableCell>{uri.roleId}</TableCell>
                    <TableCell>{uri.roleName}</TableCell>        
                    <TableCell>
                        <Table>
                            <TableBody>
                            {uri.userRoleAccessPathList.map(urap => (
                                <TableRow>
                                    <TableCell>{urap.type}</TableCell>
                                    <TableCell>{urap.url}</TableCell>
                                    <TableCell>{urap.httpMethod}</TableCell>
                                </TableRow>
                            ))
                            }

                            </TableBody>
                        </Table>
                    </TableCell>
                    </TableRow>
                ))
            }
                        </TableBody>
            </Table>
            </TableContainer>
            
        </Box>
    )
}

export default UserDetail;