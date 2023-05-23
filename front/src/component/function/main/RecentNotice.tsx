import { TabContext, TabList, TabPanel }    from "@mui/lab";
import { Box, Button, Divider, Grid, Hidden, Paper, Tab, Typography, styled } 
                                            from "@mui/material";
import { useEffect, useState }              from "react";
import { useLocation, useNavigate }         from "react-router";
import { useAppSelect }                     from "../../../store/index.hooks";
import { getContentInfo }                   from "../../../store/modules/content";
import { axiosInstance }                    from "../../..";
import { BoardArticle_, BoardList_, Board_ } from "../../../store/modules/boardCategory";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  }));

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
    }]);

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

    const getBoardArticleList = (board : Board_) => {
        let boardArticleList = board.boardArticleList;
        if (boardArticleList !== null) {
            return (
                boardArticleList.map((boardArticle, boardArticleIndex) => (
                    <Grid container item xs={12} key={`${boardArticle.boardId}_${boardArticle.id}`} sx={{pt:1, pb:1, borderBottom:1, borderBottomColor:'#efefef', opacity:2}}>
                        <Hidden smDown>
                            <Grid item xs={8}>
                                <Typography sx={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', cursor:'pointer', pl:1, pr:1}} 
                                            onClick={(e) => handleMenuView('news', `${board.boardKeyword}`,boardArticle as BoardArticle_, e)}>
                                    {boardArticle.title}    
                                </Typography>    
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{boardArticle.createUserId}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>{boardArticle.createDate}</Typography>
                            </Grid>
                        </Hidden>
                        <Hidden smUp>
                            <Grid item xs={12}>
                                <Typography sx={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', cursor:'pointer', pl:1, pr:1}} 
                                            onClick={(e) => handleMenuView('news', `${board.boardKeyword}`,boardArticle as BoardArticle_, e)}>
                                    {boardArticle.title}    
                                </Typography>    
                            </Grid>

                        </Hidden>
                    </Grid>     
                ))
            )    
        }
    }

    const noticeArticleList = (board : Board_) => {
        let boardArticleList = board.boardArticleList;
        if (boardArticleList != null) {
            return (
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
                <StyledPaper sx={{
                    my: 1,
                    mx: 'auto',
                    p: 2,
                    flexGrow: 1 
                  }}>
                    <Hidden smDown>
                        <Grid container key={`${board.id}_grid`} sx={{p:1, backgroundColor:"#efefef"}}>
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
                    </Hidden>
                    <Hidden smUp>
                        <Grid container key={`${board.id}_grid`} sx={{p:1, backgroundColor:"#efefef"}}>
                            <Grid item xs={12}>
                                <Typography sx={{fontWeight:'bold'}}>Title</Typography>    
                            </Grid>
                        </Grid>                        
                    </Hidden>

                    <Divider/>
                    { getBoardArticleList(board) }    
                </StyledPaper>
                </Box>    
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