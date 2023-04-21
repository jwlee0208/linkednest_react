import { Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { BoardArticle_ } from "../../../store/modules/boardCategory";
import { axiosInstance } from "../../..";

function ArticleDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const boardArticle      = location.state.boardArticle;
    const pathArr           = location.pathname.split("/");
    const boardDefaultPath  = `/${pathArr[1]}/${pathArr[2]}/${pathArr[3]}`;

    const moveToEdit = (boardArticle : BoardArticle_, e: React.MouseEvent<HTMLElement>) => {
        console.log('moveToEdit : ', boardArticle);
        navigate(`${boardDefaultPath}/edit/${boardArticle.id}`, {state : {boardArticle : boardArticle}})
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
            <Typography variant="h4">Article Detail</Typography>
            <Divider/>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">게시글 아이디</FormLabel></Grid>
                <Grid item xs={10}>{boardArticle.id}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">제목</FormLabel></Grid>
                <Grid item xs={10}>{boardArticle.title}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">내용</FormLabel></Grid>
                <Grid item xs={10}>{boardArticle.content}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">작성자</FormLabel></Grid>
                <Grid item xs={10}>{boardArticle.createUserNo}</Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ m: 1 }}>
                <Grid item xs={2}><FormLabel id="demo-row-radio-buttons-group-label">작성일자</FormLabel></Grid>
                <Grid item xs={10}>{boardArticle.createDate}</Grid>
            </Grid>

            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <ButtonGroup>
                        <Button variant="outlined" size="large" onClick={(e) =>moveToEdit(boardArticle as BoardArticle_, e)}>Edit</Button>
                        <Button variant="outlined" size="large" onClick={(e) =>handleToDelete(boardArticle.id, e)}>Delete</Button>
                    </ButtonGroup>
                </FormControl>
            </Grid>
        </Box>        
    )
}

export default ArticleDetail;