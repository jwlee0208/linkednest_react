import { Box, Breadcrumbs, Button, ButtonGroup, Divider, Link, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from 'react';
import { axiosInstance } from "../../..";
import { BoardArticleList_, BoardArticle_, } from "../../../store/modules/boardCategory";
function ArticleList() {

    const location = useLocation();
    const navigate = useNavigate();
    const [boardArticleList, setBoardArticleList] = useState<BoardArticleList_>([{
        id           : 0,
        boardId      : 0,
        title        : '',
        content      : '',
        imagePath    : '',
        isActive     : '',
        createUserNo : 0,
        createDate   : '',    
    }]);

    const [contentCode, setContentCode] = useState<string>('');
    const [boardCategoryKeyword, setBoardCategoryKeyword] = useState<string>('');
    const [boardKeyword, setBoardKeyword] = useState<string>('');

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = boardArticleList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
    };

    const setupBoardArticleList = (boardArticleList_ : BoardArticleList_) => {
        setBoardArticleList(boardArticleList_);
    }

    const handleMenuView = (boardArticle : BoardArticle_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${location.pathname}/${boardArticle.id}`, {state : {boardArticle : boardArticle}});
    }

    const moveToCreate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${location.pathname}/write`);
    }

    useEffect(()=>{
        let contentCode = null;
        let boardKeyword = null;
        let boardCategoryKeyword = null;
        if (location.state !== null) {
            const contentBoardCategory = location.state.contentBoardCategory;
            const board = location.state.board;    
            let isBoardExist = (contentBoardCategory !== null && board !== null);
            if (isBoardExist) {
                contentCode          = contentBoardCategory.contentCode;
                boardCategoryKeyword = contentBoardCategory.boardCategoryKeyword;
                boardKeyword         = board.boardKeyword;
            }
        } else {
            let pathArr = location.pathname.split('/');
            if (pathArr.length === 4) {
                contentCode          = pathArr[1];
                boardCategoryKeyword = pathArr[2];
                boardKeyword         = pathArr[3];
            }
        }   

        setContentCode(contentCode);
        setBoardCategoryKeyword(boardCategoryKeyword);
        setBoardKeyword(boardKeyword);

        console.log(contentCode, boardCategoryKeyword, boardKeyword);
    
        axiosInstance({
            method  : 'post',
            url     : '/api/board/article/list',
            data    : {
                contentCode          : contentCode,
                boardCategoryKeyword : boardCategoryKeyword,
                boardKeyword         : boardKeyword
            },
        }).then(res => (
            setupBoardArticleList(res.data)
        )).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        ));
    }, []);

    return (
        <Box sx={{p:2}}>
            <Typography variant="h4"> List</Typography>
            <Divider/>
            <br/>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">{contentCode}</Link>            
                <Link underline="hover" color="inherit">{boardCategoryKeyword}</Link>            
                <Typography color="text.primary">{boardKeyword}</Typography>
            </Breadcrumbs>

            <ButtonGroup sx={{p:1, float:'right'}}>
                <Button onClick={(e) => moveToCreate(e)}>Create</Button>
            </ButtonGroup>
            <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={'5%'}>No</TableCell>
                        <TableCell width={'45%'}>Title</TableCell>
                        <TableCell width={'25%'}>작성자</TableCell>
                        <TableCell width={'15%'}>작성일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    boardArticleList.slice(offset, offset+limit).map((boardArticle, index) => (
                        <TableRow key={`${boardArticle.boardId}_${boardArticle.id}`}>
                            <TableCell>{index + offset + 1}</TableCell>
                            <TableCell><Button onClick={(e) => handleMenuView(boardArticle as BoardArticle_, e)}>{boardArticle.title}</Button></TableCell>
                            <TableCell>{boardArticle.createUserNo}</TableCell>
                            <TableCell>{boardArticle.createDate}</TableCell>
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

export default ArticleList;