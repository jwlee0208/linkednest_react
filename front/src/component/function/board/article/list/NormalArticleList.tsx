import { Box, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { ArticleListProps } from ".";
import { BoardArticle_ } from "../../../../../store/modules/boardCategory";
import { useState } from "react";


function NormalArticleList({
    boardArticleList
} : ArticleListProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuView = (boardArticle : BoardArticle_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${location.pathname}/${boardArticle.id}`, {state : {boardArticle : boardArticle}});
    }

    const [limit                , setLimit]                 = useState(10);
    const [page                 , setPage]                  = useState(1);
    const offset = (page - 1) * limit;

    let listCnt = boardArticleList.length;
    let pageCnt = Math.ceil(listCnt/10);
 
    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
    };

    return (
        <Box>
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell width={'5%'}>No</TableCell>
                    <TableCell width={'45%'}>Title</TableCell>
                    <TableCell width={'15%'}>작성자</TableCell>
                    <TableCell width={'25%'}>작성일</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                boardArticleList.slice(offset, offset+limit).map((boardArticle, index) => (
                    <TableRow key={`${boardArticle.boardId}_${boardArticle.id}`}>
                        <TableCell>{index + offset + 1}</TableCell>
                        <TableCell><Button onClick={(e) => handleMenuView(boardArticle as BoardArticle_, e)}>{boardArticle.title}</Button></TableCell>
                        <TableCell>{boardArticle.createUserId}</TableCell>
                        <TableCell>
                            <Typography>{boardArticle.createDate}</Typography>                                
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

export default NormalArticleList;