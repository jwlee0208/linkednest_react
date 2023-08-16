import { Masonry }                          from "@mui/lab";
import { Box, Divider, ImageList, ImageListItem, ImageListItemBar, Paper, Typography } 
                                            from "@mui/material";
import { styled }                           from '@mui/material/styles';
import Parser                               from 'html-react-parser';
import { useEffect, useState }              from "react";
import { BottomScrollListener }             from 'react-bottom-scroll-listener';
import { useLocation, useNavigate }         from "react-router";
import { axiosInstance }                    from "../../../../..";
import { BoardArticleList_, BoardArticle_ } from "../../../../../store/modules/boardCategory";
import { htmlTagRegex }                     from "../../../user/signup";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const noImage = `http://${process.env.REACT_APP_API_DOMAIN}/images/noImage.jpg`;

type MansonryArticleListProps = {
  contentCode           : string,
  boardCategoryKeyword  : string,
  boardKeyword          : string,
  alertOnBottom         : boolean,
}

function MansonryArticleList({
    contentCode
  , boardCategoryKeyword
  , boardKeyword
  , alertOnBottom
} : MansonryArticleListProps) {

  const [limit                , setLimit]       = useState(10);
  const [page                 , setPage]        = useState(1);
  const [offset               , setOffset]      = useState<number>(0);    
  const [allowScroll          , setAllowScroll] = useState<boolean>(true);

  const handleContainerOnBottom = () => {
    // console.log('I am at bottom in optional container! ' + Math.round(performance.now()));
    if (alertOnBottom && allowScroll) {
      getArticleList();
    }  
  } 
  
  const getArticleList = () => {
      let calOffset = (page-1) * 10;
      console.log('calOffset : ', calOffset, ', offset : ', offset);
      setOffset(calOffset);
      setPage(page+1);

      let reqBody = JSON.stringify({
        contentCode          : contentCode,
        boardCategoryKeyword : boardCategoryKeyword,
        boardKeyword         : boardKeyword,
        offset               : offset,
        limit                : limit,
      });

      axiosInstance.post('/api/board/article/list', reqBody)
        .then(res => {
          // console.log('boardArticleList >> resData : ', res.data, 'boardArticleList : ', boardArticleList);
          if (res.data !== '' && res.data.length > 0) {
            if (boardArticleList[0].id > 0) {
              res.data.map((newBoardArticle : BoardArticle_) => {
                boardArticleList.push(newBoardArticle);
              })
            } else {
              setBoardArticleList(res.data);
            }
          } else {
            setAllowScroll(false);
          }
          // console.log('boardArticleList >> boardArticleList : ', boardArticleList);
        }).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        ));
  }  

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleMenuView = (boardArticle : BoardArticle_, e : React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      navigate(`${location.pathname}/${boardArticle.id}`, {state : {boardArticle : boardArticle}});
  }

  const imagePath = (path : string) => {
    return path !== null && path !== '' ? path : noImage;
  }

  const imageList = (boardArticleList : BoardArticleList_) => {
    let isExistBoardArticleList = boardArticleList.length > 0 && boardArticleList[0].id > 0;
    if (isExistBoardArticleList === true) {
      return (
        // <ImageList variant="masonry" cols={4} gap={10} key={`${boardCategoryKeyword}_${boardKeyword}_images`}>
        <ImageList variant="masonry" cols={2} gap={100} key={`${boardCategoryKeyword}_${boardKeyword}_images`}>
          {
          boardArticleList.map((boardArticle) => (
            <ImageListItem key={`${boardCategoryKeyword}_${boardKeyword}_${boardArticle.id}_img_list_item`} onClick={(e) => handleMenuView(boardArticle as BoardArticle_, e)} sx={{cursor:'pointer'}}>
              <img
                src={`${imagePath(boardArticle.imagePath)}?w=248&fit=crop&auto=format`}
                srcSet={`${imagePath(boardArticle.imagePath)}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={boardArticle.title}
                loading="lazy"
                key={`${boardCategoryKeyword}_${boardKeyword}_${boardArticle.boardId}_img`}
              />
              <ImageListItemBar position="top" 
                                title={`Title : ${boardArticle.title}`} 
                                sx={{fontWeight:'bold'}}
              />
              <ImageListItemBar position="bottom" 
                                subtitle={Parser(decodeURI(boardArticle.content).replaceAll('\\"', '"')).toString().replace(htmlTagRegex, '')}
                                // sx={{mt:2, pt:1, pl: 1, verticalAlign: 'center', bgcolor:'#efefef', borderRadius:'0.5rem'}} 
              />
            </ImageListItem>
          ))}
        </ImageList>      
      )
    }
    return (<Box><Typography align="center">No Content</Typography></Box>)
  }

  const masonryList = (boardArticleList : BoardArticleList_, offset : number, limit : number) => {
    if (boardArticleList.length > 0) {
      return (
        <Masonry columns={5} spacing={4} defaultHeight={450} defaultColumns={4} defaultSpacing={1}>
          {        
            boardArticleList.slice(offset, offset+limit).map((boardArticle) => (
            <Box key={`${boardArticle.id}_box`} onClick={(e) => handleMenuView(boardArticle as BoardArticle_, e)} sx={{cursor:'pointer'}}>
                <img
                  src={`${imagePath(boardArticle.imagePath)}?width=auto&height=auto&auto=format`}
                  srcSet={`${imagePath(boardArticle.imagePath)}?width=auto&height=auto&auto=format&dpr=2 2x`}
                  alt={boardArticle.title}
                  loading="lazy"
                  style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: 'inline-grid',
                    width: '100%',
                    cursor:'pointer'
                  }}
                />
                <Item key={`${boardArticle.id}_item`} >
                    <Typography noWrap={true} variant="subtitle1" align="left" sx={{p: 1, fontWeight:'bold'}} bgcolor={"InfoBackground"}>{boardArticle.title}</Typography>
                    <Divider/>
                    <Typography noWrap={true} variant="subtitle2" align="left" sx={{p: 1}}>{Parser(decodeURI(boardArticle.content).replaceAll('\\"', '"')).toString()}</Typography>
                </Item>
            </Box>
          ))
        }
        </Masonry>
      )         
    }  

    return (      
      <Typography sx={{width: '100%', textAlign:'center', p:10}} variant="body1">There's no article.</Typography>
    )
  }

  useEffect(() => {
    // getArticleList();
    handleContainerOnBottom();
  }, [boardArticleList]);

  return (
    <Box sx={{ minHeight: 377 }}>
       <BottomScrollListener onBottom={handleContainerOnBottom} debounce={200} debounceOptions={{leading: false}} triggerOnNoScroll={false}>
          <div>
            {imageList(boardArticleList)}  
          </div>
      </BottomScrollListener>              
    </Box>
  )
}
export default MansonryArticleList;