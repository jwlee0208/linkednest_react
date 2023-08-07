import { Box, Breadcrumbs, Button, ButtonGroup, Divider, FormControl, Grid, Link, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CalendarMonthIcon            from '@mui/icons-material/CalendarMonth';

import Parser                       from 'html-react-parser';
import { ShareBoardArticle_ } from "../../../store/modules/share";
import { axiosInstance } from "../../..";
import { useEffect, useState } from "react";

function ShareBoardArticleDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [shareBoardArticle, setShareBoardArticle] = useState<ShareBoardArticle_> ({
        id              : 0,
        title           : '',
        content         : '',
        createUser      : {
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
            reCaptchaToken          : "",             
            userProfile             : {
                sex         : '',
                phoneNo     : '',
                birthday    : '',
            },        
            returnCode              : 0,   
        },
        createDate      : '',
        filePath        : '',
        originalFilePath: '',
        status          : 0,
        shareBoard      : {
            id                  : 0,
            boardName           : "",
            boardType           : "",
            createUserId        : "",
            createDate          : "",
            modifyUserId        : "",
            modifyDate          : "",
        }, 
    });
    const pathArr           = location.pathname.split("/");
    const shareBoardArticleId = `${pathArr[4]}`;
    const boardDefaultPath  = `/${pathArr[1]}/${pathArr[2]}`;

    const moveToEdit = (shareBoardArticle : ShareBoardArticle_, e: React.MouseEvent<HTMLElement>) => {
        // navigate(`${boardDefaultPath}/edit/${ShareBoardArticle.id}`, {state : {boardArticle : boardArticle, boardCategoryKeyword : boardCategoryKeyword, boardKeyword : boardKeyword}})
    }

    const handleToDelete = (shareBoardArticleId : number, e: React.MouseEvent<HTMLElement>) => {
        axiosInstance({
              method    : 'delete'
            , url       : `/api/share/board/article/${shareBoardArticleId}`
        }).then(res => (
            res.status === 200 ? navigate(`${boardDefaultPath}`) : alert(`occurred exception : [${res.data.returnCode}]`)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)     
        ))
    }

    useEffect(() => {
        if (location.state !== null) {
            setShareBoardArticle(location.state.shareBoardArticle);
        } else {
            axiosInstance.get(`/api/share/board/article/${shareBoardArticleId}`)
            .then((res) => {
                setShareBoardArticle(res.data);
            }).catch((err) => {
                console.log(err);    
            })            
        }
            console.log(`shareBoardArticle : ${shareBoardArticle}`);

    }, []);

    return (
        <Box sx={{p : 2}}>    
        <Typography variant="h4" >Share Article Detail</Typography>
        <Divider/>
{/*         <Breadcrumbs aria-label="breadcrumb" sx={{pt:2, pb:2}}>
            <Link underline="hover" color="inherit">{contentCode}</Link>            
            <Link underline="hover" color="inherit">{boardCategoryKeyword}</Link>   
            <Link underline="hover" color="inherit">{boardKeyword}</Link>         
            <Typography color="text.primary">view</Typography>
        </Breadcrumbs>           
 */}        <Paper elevation={0} variant="outlined" sx={{p:2}}>    
            <Typography variant="h4">{shareBoardArticle.title}</Typography>    
            <Typography sx={{p:1}} align="left"><CalendarMonthIcon/>&nbsp;Posted by {shareBoardArticle.createUser.nickname}</Typography>
            <hr/>    
            <Typography sx={{p:1}}>
                <div dangerouslySetInnerHTML={{__html : shareBoardArticle.content}}></div>
            </Typography>
            <Typography sx={{p:1}} align="left">Posted at {shareBoardArticle.createDate}</Typography>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(shareBoardArticle as ShareBoardArticle_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(shareBoardArticle.id, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>
        </Paper> 
    </Box>           
    )
}

export default ShareBoardArticleDetail;