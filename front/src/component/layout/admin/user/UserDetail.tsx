import { useLocation }                                  from "react-router";
import { useState, useEffect }                          from "react";
import { axiosInstance }                                from "../../../..";
import { User }                                         from "../../../../store/modules/user";
import { Box, Typography, Divider, Grid, FormLabel }    from "@mui/material";
import Table                                            from "@mui/material/Table";
import TableBody                                        from "@mui/material/TableBody";
import TableCell                                        from "@mui/material/TableCell";
import TableContainer                                   from "@mui/material/TableContainer";
import TableHead                                        from "@mui/material/TableHead";
import TableRow                                         from "@mui/material/TableRow";
import AccordionDetails                                 from "@mui/material/AccordionDetails";
import Accordion                                        from "@mui/material/Accordion";
import AccordionSummary                                 from "@mui/material/AccordionSummary";
import { styled }                                       from '@mui/material/styles';
import ArrowForwardIosSharpIcon                         from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps }                 from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, }  from '@mui/material/AccordionSummary';
import MuiAccordionDetails                              from '@mui/material/AccordionDetails';

function UserDetail() {
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

    const [expanded, setExpanded] = useState<string | false>('panel1');

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
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
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography variant="h5">User Role Info</Typography>                
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
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default UserDetail;