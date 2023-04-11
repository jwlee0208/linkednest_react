import { useLocation, useNavigate }                     from "react-router";
import { useState, useEffect }                          from "react";
import { axiosInstance }                                from "../../../..";
import { User }                                         from "../../../../store/modules/user";
import Table                                            from "@mui/material/Table";
import TableBody                                        from "@mui/material/TableBody";
import TableCell                                        from "@mui/material/TableCell";
import TableContainer                                   from "@mui/material/TableContainer";
import TableHead                                        from "@mui/material/TableHead";
import TableRow                                         from "@mui/material/TableRow";
import { styled }                                       from '@mui/material/styles';
import ArrowForwardIosSharpIcon                         from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps }                 from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, }  from '@mui/material/AccordionSummary';
import MuiAccordionDetails                              from '@mui/material/AccordionDetails';
import {Edit}                                           from '@mui/icons-material'
import { Box, Typography, Divider, Grid
                            , FormLabel, IconButton }   from "@mui/material";
import Parser                                           from 'html-react-parser';

function UserDetail() {
    const navigate  = useNavigate();
    const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
      }));
      
      const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
          {...props}
        />
      ))(({ theme }) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
          marginLeft: theme.spacing(1),
        },
      }));
      
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));
    const location = useLocation();
    const [user, setUser] = useState<User>({
        userNo                  : 0,
        userId                  : '',
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
    })

    console.log('[UserDetail] userNo : ', location.state.userNo);

    const [expanded, setExpanded] = useState<string | false>('panel1');

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
      };

    const goEditUserPage = (event : React.MouseEvent<HTMLElement>) => {
        navigate('/admin/user/edit', {state : {userInfo : user}})
    }; 

    const goEditUserProfilePage = (event : React.MouseEvent<HTMLElement>) => {
        navigate('/admin/userProfile/edit', {state : {userInfo : user}})
    }; 

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
            <Grid container alignItems="center" sx={{ m: 0 }}>
                <Grid item xs={11}>
                    <Typography variant="h5">User Basic Info</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="edit" onClick={(e) => goEditUserPage(e)}>
                        <Edit/>
                    </IconButton>
                </Grid>                        
            </Grid>
            <br/>
            <Grid container key={'userInfoKey'}>
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
                    <Grid item xs={10}>
                        <div dangerouslySetInnerHTML={{__html : Parser(decodeURI(user.introduce).replaceAll('\\"', '"')).toString()}}></div>
                    </Grid>
                </Grid>
            </Grid>
            <br/>
            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')} key={'userProfileKey'}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Grid container alignItems="center" sx={{ m: 0 }}>
                        <Grid item xs={11}>
                            <Typography variant="h5">User Profile Info</Typography>                
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton aria-label="edit" onClick={(e) => goEditUserProfilePage(e)}>
                                <Edit/>
                            </IconButton>
                        </Grid>                        
                    </Grid>
                </AccordionSummary>    
                <AccordionDetails>
                    <Grid container>
                        <Grid container alignItems="center" sx={{ m: 1 }}>
                            <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel></Grid>
                            <Grid item xs={10}>{user.userProfile.sex}</Grid>
                        </Grid>
                        <Grid container alignItems="center" sx={{ m: 1 }}>
                            <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">Birth Date</FormLabel></Grid>
                            <Grid item xs={10}>{user.userProfile.birthday}</Grid>
                        </Grid>
                        <Grid container alignItems="center" sx={{ m: 1 }}>
                            <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">Phone No</FormLabel></Grid>
                            <Grid item xs={10}>{user.userProfile.phoneNo}</Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>    
            <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')} key={'userRoleKeyForBE'}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Grid container alignItems="center" sx={{ m: 0 }}>
                        <Grid item xs={11}>
                            <Typography variant="h5">User Role Info (For Back-End)</Typography> 
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton aria-label="edit">
                                <Edit/>
                            </IconButton>
                        </Grid>                        
                    </Grid>
                </AccordionSummary>    
                <AccordionDetails>
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
                                <TableRow key={`${uri.roleId}-${uri.userRoleAccessPathList}`}>
                                    <TableCell>{uri.roleId}</TableCell>
                                    <TableCell>{uri.roleName}</TableCell>        
                                    <TableCell>
                                        <Table>
                                            <TableBody>
                                            {uri.userRoleAccessPathList.map(urap => (
                                                <TableRow key={`${urap.httpMethod}-${urap.url}`}>
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
                </AccordionDetails>
            </Accordion>


             <Accordion expanded={expanded === 'panel4'} onChange={handleAccordionChange('panel4')} key={'userRoleKeyForFE'}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Grid container alignItems="center" sx={{ m: 0 }}>
                        <Grid item xs={11}>
                            <Typography variant="h5">User Role Info (For Front-End)</Typography> 
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton aria-label="edit">
                                <Edit/>
                            </IconButton>
                        </Grid>                        
                    </Grid>
                </AccordionSummary>    
                <AccordionDetails>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={"20%"}>권한</TableCell>
                                    <TableCell width={"80%"}>
                                        <Table width={"100%"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell width={"25%"}>메뉴 카테고리 명</TableCell>
                                                    <TableCell width={"35%"}>메뉴 명</TableCell>
                                                    <TableCell width={"40%"}>메뉴 URL</TableCell>
                                                </TableRow>       
                                            </TableHead>
                                        </Table>    
                                    </TableCell>    
                                </TableRow>    
                            </TableHead>                        
                            <TableBody>
                        {
                            user.userRoleInfoList.map(userRole => (
                                <TableRow key={`${userRole.roleId}-${userRole.adminMenuCategoryList}`}>
                                    <TableCell width={'20%'}>{userRole.roleName}</TableCell>
                                    <TableCell width={'80%'}>
                                        <Table width={'100%'}>
                                            <TableBody>
{
                                    userRole.adminMenuCategoryList.map(menuCategory => (
                                        <TableRow key={menuCategory.categoryId}>
                                            <TableCell width={'25%'}>{menuCategory.categoryName}</TableCell>        
                                            <TableCell width={'75%'}>
                                                 <Table width={'100%'}>
                                                    <TableBody>
                                                {menuCategory.adminMenuRoleAccessPathList.map(roleAccessPath => (
                                                    <TableRow key={roleAccessPath.id}>
                                                        <TableCell width={'50%'}>{roleAccessPath.name}</TableCell>
                                                        <TableCell width={'50%'}>{roleAccessPath.url}</TableCell>        
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
                                    </TableCell>    
                                </TableRow>

                                ))
                        }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>


        </Box>
    )
}

export default UserDetail;