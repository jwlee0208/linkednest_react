/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Breadcrumbs, Button, ButtonGroup, Divider, Link, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../../..";
import { useAppSelect } from "../../../store/index.hooks";
import { BoardArticleList_, getContentBoardCategoryInfo } from "../../../store/modules/boardCategory";
import { getUserInfo } from "../../../store/modules/user";
import MansoryArticleList from "./list/MansoryArticleList";
import NormalArticleList from "./list/NormalArticleList";


function ArticleList() {

    let [boardType, setBoardType] = useState<string>('');
    const [boardTitle, setBoardTitle] = useState<string>('');

    const userInfo = useAppSelect(getUserInfo);
    const boardCategoryInfo = useAppSelect(getContentBoardCategoryInfo);

    const location = useLocation();
    const navigate = useNavigate();

    let [contentCode            , setContentCode]           = useState<string>('');
    let [boardCategoryKeyword   , setBoardCategoryKeyword]  = useState<string>('');
    let [boardKeyword           , setBoardKeyword]          = useState<string>('');

    let pathArr = location.pathname.split('/');
    if (pathArr.length === 4) {
        contentCode          = pathArr[1];
        boardCategoryKeyword = pathArr[2];
        boardKeyword         = pathArr[3];
    }

    const [boardArticleList, setBoardArticleList] = useState<BoardArticleList_>([{
        id           : 0,
        boardId      : 0,
        title        : '',
        content      : '',
        contentText  : '',
        imagePath    : '',
        isActive     : '',
        createUserNo : 0,
        createUserId : '',
        createDate   : '',    
    }]);

    const [limit                , setLimit]                 = useState(10);
    const [page                 , setPage]                  = useState(1);
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

    const moveToCreate = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${location.pathname}/write`);
    }

    const createButton = () => {
        switch (userInfo.isLogin) {
            case true : return (
                <ButtonGroup sx={{p:1, float:'right'}}>
                    <Button onClick={(e) => moveToCreate(e)}>Create</Button>
                </ButtonGroup>
            )
            default : return (<></>)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const boardTypeStr = () => {
        let filteredBoardCategory = boardCategoryInfo.boardCategoryList.filter((boardCategoryObj) => (boardCategoryObj.boardCategoryKeyword === boardCategoryKeyword));
        if (filteredBoardCategory.length > 0) {
            let boardListObj = filteredBoardCategory[0].boardList;
            let filteredBoardInfo = boardListObj.filter((boardObj) => (boardObj.boardKeyword === boardKeyword));
            if (filteredBoardInfo.length > 0) {
                setBoardTitle(filteredBoardInfo[0].boardName);
                setBoardType(filteredBoardInfo[0].boardType);
console.log('boardType : ', boardType);
                return boardType;
            }
        } 
        return '';
    }

    const articleList = () => {
        console.log('articleList >> boardType : ', boardType);

        if (boardType === 'image') {
            return (
                <MansoryArticleList boardArticleList={boardArticleList} offset={offset} limit={limit} />
            )
        }   
        return (
            <NormalArticleList boardArticleList={boardArticleList} offset={offset} limit={limit} />
        )    
    }

    useEffect(()=>{
        if (location.state !== null) {
            const contentBoardCategory = location.state.contentBoardCategory;
            const board = location.state.board;  

            setBoardType(board.boardType);

            let isBoardExist = (contentBoardCategory !== null && board !== null);
            if (isBoardExist) {
                setContentCode(contentBoardCategory.contentCode);
                setBoardCategoryKeyword(contentBoardCategory.boardCategoryKeyword);
                setBoardKeyword(board.boardKeyword);
            }
        }
        else {
            let pathArr = location.pathname.split('/');
            if (pathArr.length === 4) {
                setContentCode(pathArr[1]);
                setBoardCategoryKeyword(pathArr[2]);
                setBoardKeyword(pathArr[3]);
            }
        }   
    
        axiosInstance.post('/api/board/article/list',
            JSON.stringify({
                contentCode          : contentCode,
                boardCategoryKeyword : boardCategoryKeyword,
                boardKeyword         : boardKeyword
            })
        ).then(res => {
            boardTypeStr();
            setupBoardArticleList(res.data)
        }).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        ));
        // ResizeObserver loop limit exceeded 에러 관련
        window.addEventListener('error', e => { 
            if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
              const resizeObserverErrDiv = document.getElementById(
                'webpack-dev-server-client-overlay-div'
              )
              const resizeObserverErr = document.getElementById(
                'webpack-dev-server-client-overlay'
              )
              if (resizeObserverErr) {
                resizeObserverErr.setAttribute('style', 'display: none');
              }
              if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute('style', 'display: none');
              }
            }
        })        
        // [End] ResizeObserver loop limit exceeded 에러 관련
    }, [contentCode, boardCategoryKeyword, boardKeyword, boardType, boardCategoryInfo]);

    return (
        <Box sx={{p:2}}>
            <Typography variant="h4">{boardTitle !== null ? boardTitle : 'List'}</Typography>
            <Divider/>
            <br/>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">{contentCode}</Link>            
                <Link underline="hover" color="inherit">{boardCategoryKeyword}</Link>            
                <Typography color="text.primary">{boardKeyword}</Typography>
            </Breadcrumbs>
            {createButton()}
            <Box sx={{pt:2, pb:2}}>
                {                    
                articleList()
                }
            </Box>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}} />
        </Box>    
    )
}

export default ArticleList;