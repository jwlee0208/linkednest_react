import { Box, Breadcrumbs, Button, ButtonGroup, Divider, FormControl, Grid, Link, Paper, Typography } 
                                    from "@mui/material";
import CalendarMonthIcon            from '@mui/icons-material/CalendarMonth';
import { useLocation, useNavigate } from "react-router";
import { BoardArticle_ }            from "../../../store/modules/boardCategory";
import { axiosInstance }            from "../../..";
import Parser                       from 'html-react-parser';

function ArticleDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const boardArticle          = location.state.boardArticle;
    const pathArr               = location.pathname.split("/");
    const boardDefaultPath      = `/${pathArr[1]}/${pathArr[2]}/${pathArr[3]}`;
    const contentCode           = `${pathArr[1]}`;
    const boardCategoryKeyword  = `${pathArr[2]}`;
    const boardKeyword          = `${pathArr[3]}`;

    const moveToEdit = (boardArticle : BoardArticle_, e: React.MouseEvent<HTMLElement>) => {
        navigate(`${boardDefaultPath}/edit/${boardArticle.id}`, {state : {boardArticle : boardArticle, boardCategoryKeyword : boardCategoryKeyword, boardKeyword : boardKeyword}})
    }

    const handleToDelete = (boardArticleId : number, e: React.MouseEvent<HTMLElement>) => {
        axiosInstance({
              method    : 'delete'
            , url       : `/api/board/article/${boardArticleId}`
        }).then(res => (
            res.status === 200 ? navigate(`${boardDefaultPath}`) : alert(`occurred exception : [${res.data.returnCode}]`)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)     
        ))
    }

    return (
    <Box sx={{p : 2}}>    
        <Typography variant="h4" >Article Detail</Typography>
        <Divider/>
        <Breadcrumbs aria-label="breadcrumb" sx={{pt:2, pb:2}}>
            <Link underline="hover" color="inherit">{contentCode}</Link>            
            <Link underline="hover" color="inherit">{boardCategoryKeyword}</Link>   
            <Link underline="hover" color="inherit">{boardKeyword}</Link>         
            <Typography color="text.primary">view</Typography>
        </Breadcrumbs>           
        <Paper elevation={0} variant="outlined" sx={{p:2}}>    
            <Typography variant="h4">{boardArticle.title}</Typography>    
            <Typography sx={{p:1}} align="left"><CalendarMonthIcon/>&nbsp;Posted by {boardArticle.createUserId}</Typography>
            <hr/>    
            <Typography sx={{p:1}}>
                <div dangerouslySetInnerHTML={{__html : Parser(decodeURI(boardArticle.content).replaceAll('\\"', '"')).toString()}}></div>
            </Typography>
            <Typography sx={{p:1}} align="left">Posted at {boardArticle.createDate}</Typography>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(boardArticle as BoardArticle_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(boardArticle.id, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>
        </Paper> 
    </Box>           
    )
}

export default ArticleDetail;