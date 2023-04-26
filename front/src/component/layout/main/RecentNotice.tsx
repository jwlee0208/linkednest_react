import { Box, Button, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography }                          from "@mui/material";
import { useAppDispatch, useAppSelect } from "../../../store/index.hooks";
import { getContentInfo }               from "../../../store/modules/content";
import { useState, useEffect } from "react";
import { BoardArticle_, BoardList_ } from "../../../store/modules/boardCategory";
import { axiosInstance } from "../../..";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useLocation, useNavigate } from "react-router";

function RecentNotice() {
    const location = useLocation();
    const navigate = useNavigate();
    const contentInfo = useAppSelect(getContentInfo);
    console.log('contentInfo : ', contentInfo);
    const [boardList, setBoardList] = useState<BoardList_>([{
        id              : 0,
        boardCategoryId : 0,
        boardName       : '',
        boardKeyword    : '',
        boardCode       : '',
        isActive        : '',
        imagePath       : '',
        createDate      : '',
        updateDate      : '',
        boardArticleList: [],        
    }])

    const [value, setValue] = useState('0');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    let contentCode = contentInfo.contentCode;
    if (contentCode === '') {
        let pathArr = location.pathname.split("/");
        if (pathArr[1] !== ''){
          contentCode = pathArr[1];
        }
    }

    let boardListCnt = boardList.length;
    const handleMenuView = (boardCategoryKeyword : string, boardKeyword : string, boardArticle : BoardArticle_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/${contentInfo.contentCode}/${boardCategoryKeyword}/${boardKeyword}/${boardArticle.id}`, {state : {boardArticle : boardArticle}});
    }

    useEffect(() => {
        axiosInstance.post(`/api/board/article/list/${contentCode}/news`)
            .then((res) => setBoardList(res.data))
            .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`) );    
    }, [contentCode]);

    return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
{
    boardList.map((board, index)=>(
        <Tab label={board.boardName} value={index.toString()} key={`${board.id}_tab`} sx={{width : `${100/boardListCnt}%`}}/>
    ))
}            
                </TabList>
            </Box>
{
    boardList.map((board, index)=>(
        <TabPanel value={index.toString()} key={`${board.id}_tabPanel`}>
            <TableContainer key={`${board.id}_tableContainer`}>
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
                        board.boardArticleList !== null ? (
                            board.boardArticleList.map((boardArticle, boardArticleIndex) => (
                                <TableRow key={`${boardArticle.boardId}_${boardArticle.id}`}>
                                <TableCell>{boardArticle.id}</TableCell>
                                <TableCell><Button onClick={(e) => handleMenuView('news', `${board.boardKeyword}`,boardArticle as BoardArticle_, e)}>{boardArticle.title}</Button></TableCell>
                                <TableCell>{boardArticle.createUserId}</TableCell>
                                <TableCell>
                                    <Typography>{boardArticle.createDate}</Typography>                                
                                </TableCell>
                            </TableRow>
                        ))) : (<></>)
                    }                
                    </TableBody>    
                </Table>
            </TableContainer>
        </TabPanel>
    ))
}            
        </TabContext>
        <Tab></Tab>

    </Box>)
}

export default RecentNotice;