import { TabContext, TabList, TabPanel }    from "@mui/lab";
import { Box, Button, Divider, Grid, Tab, Typography } 
                                            from "@mui/material";
import { useEffect, useState }              from "react";
import { useLocation, useNavigate }         from "react-router";
import { useAppSelect }                     from "../../../store/index.hooks";
import { getContentInfo }                   from "../../../store/modules/content";
import { axiosInstance }                    from "../../..";
import { BoardArticle_, BoardList_, Board_ } from "../../../store/modules/boardCategory";

function RecentNotice() {
    const location      = useLocation();
    const navigate      = useNavigate();
    const contentInfo   = useAppSelect(getContentInfo);

    const [value    , setValue]     = useState('0');
    const [boardList, setBoardList] = useState<BoardList_>([{
        id              : 0,
        boardCategoryId : 0,
        boardType       : '',
        boardName       : '',
        boardKeyword    : '',
        boardCode       : '',
        isActive        : '',
        imagePath       : '',
        createDate      : '',
        updateDate      : '',
        boardArticleList: [],        
    }])

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

    const noticeArticleList = (board : Board_) => {
        let boardArticleList = board.boardArticleList;
        if (boardArticleList != null) {
            return (
                <>
                    <Grid container item key={`${board.id}_grid`} sx={{p:1, backgroundColor:"#efefef"}}>
                    <Grid item xs={8}>
                        <Typography sx={{fontWeight:'bold'}}>Title</Typography>    
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{fontWeight:'bold'}}>Writer</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography sx={{fontWeight:'bold'}}>Date</Typography>
                    </Grid>
                    </Grid>
                    <Divider/>
            {
                boardArticleList.map((boardArticle, boardArticleIndex) => (
                        <Grid container item key={`${boardArticle.boardId}_${boardArticle.id}`} sx={{pt:1, pb:1, borderBottom:1, borderBottomColor:'#efefef'}}>
                            <Grid item xs={8}>
                                <Button onClick={(e) => handleMenuView('news', `${board.boardKeyword}`,boardArticle as BoardArticle_, e)}>{boardArticle.title}</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{boardArticle.createUserId}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{boardArticle.createDate}</Typography>
                            </Grid>
                        </Grid>
                            
                ))
            }    
                </>
            )
        }
        return  (<Typography sx={{width: '100%', textAlign:'center', p:10}} variant="body1">There's no article.</Typography>)
    }

    useEffect(() => {
        axiosInstance.post(`/api/board/article/list/${contentCode}/news`)
            .then((res) => setBoardList(res.data))
            .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`) );    
    }, [contentCode]);

    return (
    <Box sx={{ width: '100%', typography: 'body1', p: 2 }}>
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
                {noticeArticleList(board)}                
            </TabPanel>
        ))
    }            
        </TabContext>
    </Box>)
}

export default RecentNotice;