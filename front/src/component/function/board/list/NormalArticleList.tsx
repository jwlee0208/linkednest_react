import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { BoardArticleList_, BoardArticle_ } from "../../../../store/modules/boardCategory";
import { useLocation, useNavigate } from "react-router";
import { ArticleListProps } from ".";


function NormalArticleList({
    boardArticleList,
    offset,
    limit,
} : ArticleListProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuView = (boardArticle : BoardArticle_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${location.pathname}/${boardArticle.id}`, {state : {boardArticle : boardArticle}});
    }

    return (
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

    )
}

export default NormalArticleList;