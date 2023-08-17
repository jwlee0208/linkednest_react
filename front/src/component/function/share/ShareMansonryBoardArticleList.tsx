import { Masonry } from "@mui/lab";
import { Box, Breadcrumbs, Divider, ImageList, ImageListItem, ImageListItemBar, Link, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { useLocation, useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../..";
import { useAppSelect } from "../../../store/index.hooks";
import { ShareBoardArticleList_, ShareBoardArticle_, getShareInfo } from "../../../store/modules/share";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const noImage = `http://${process.env.REACT_APP_API_DOMAIN}/images/noImage.jpg`;

type ShareMansonryBoardArticleListProps = {
  shareBoardId          : string,
  shareBoardCategoryId  : string,
  shareUserId           : string, 
  alertOnBottom         : boolean,
}

function ShareMansonryBoardArticleList({
    shareBoardId
  , shareBoardCategoryId
  , shareUserId
  , alertOnBottom
} : ShareMansonryBoardArticleListProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const shareInfo             = useAppSelect(getShareInfo);
  const pathArr               = location.pathname.split("/");

  const [limit                , setLimit]       = useState(10);
  const [page                 , setPage]        = useState(1);
  const [offset               , setOffset]      = useState<number>(0);    
  const [allowScroll          , setAllowScroll] = useState<boolean>(true); 

  const handleContainerOnBottom = () => {    
    if (alertOnBottom && allowScroll) {
      console.log(`handleContainerOnBottom > page : ${[page]}`);
      getShareBoardArticleList(page);
    }  
  } 
  let reqBody = null;
  const getShareBoardArticleList = async (page  : number) => {
      let calOffset = (page-1) * 10;
      setOffset(calOffset);
      setPage(page+1);

      reqBody = JSON.stringify({
        shareBoardCategoryId : shareBoardCategoryId,
        shareBoardId         : shareBoardId,
        shareUserId          : shareUserId,
        offset               : (page-1) * limit,
        limit                : limit,
      });

      console.log(`calOffset : ${calOffset} , offset : ${offset}, page : ${page}, resBody : ${reqBody},  allowScroll : ${allowScroll}`);

      await axiosInstance.post('/api/share/board/article/list', reqBody)
        .then(res => {
          if (res.data.returnCode === 10000) {
            if (boardArticleList[0].id > 0) {
              res.data.shareBoardArticleList.map((newBoardArticle : ShareBoardArticle_) => {
                boardArticleList.push(newBoardArticle);
              })
            } else {
              setBoardArticleList(res.data.shareBoardArticleList);
            }
          } else {
            setAllowScroll(false);
          }
        }).catch(err => {
          setAllowScroll(false);
          alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        });
  }  

  const [boardArticleList, setBoardArticleList] = useState<ShareBoardArticleList_>([{
    id              : 0,
    title           : '',
    content         : '',
    createUser      : {
      userNo                  : 0,
      userId                  : '',
      password                : '',
      nickname                : '',
      email                   : '',
      introduce               : '',
      accessToken             : '',
      refreshToken            : '',
      isLogin                 : false,
      adminMenuCategoryList   : [],
      userRoleInfoList        : [],
      roleInfoList            : [],
      birthday                : '',
      sex                     : '',
      phoneNo                 : '',
      additionalPhoneNo       : '',
      address                 : '',
      detailAddress           : '',
      zipcode                 : 0,
      reCaptchaToken          : "",             
      userProfile             : {
          sex         : '',
          phoneNo     : '',
          birthday    : '',
      },    
      returnCode              : 0,     
    },
    createDate      : '',
    filePath        : '',
    originalFilePath: '',
    status          : 0,
    shareBoard      : {
      id                  : 0,
      boardName           : "",
      boardType           : "",
      createUserId        : "",
      createDate          : "",
      modifyUserId        : "",
      modifyDate          : "",
    }    
  }]);

  const handleMenuView = (boardArticle : ShareBoardArticle_, e : React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      navigate(`${location.pathname}/${boardArticle.id}`, {state : {shareBoardArticle : boardArticle}});
  }

  const imagePath = (path : string) => {
    return path !== null && path !== '' ? path : noImage;
  }

  const imageList = (boardArticleList : ShareBoardArticleList_) => {
    let isExistBoardArticleList = boardArticleList.length > 0 && boardArticleList[0].id > 0;
    if (isExistBoardArticleList === true) {
      return (
        <ImageList variant="masonry" cols={3} gap={100} key={`${shareBoardCategoryId}_${shareBoardId}_images`}>
          {
          boardArticleList.map((boardArticle) => (
            <ImageListItem key={`${boardArticle.shareBoard.boardName}_${boardArticle.id}_img_list_item`} onClick={(e) => handleMenuView(boardArticle as ShareBoardArticle_, e)} sx={{cursor:'pointer'}}>
{/*               <ImageListItemBar position="top" 
                                title={`Title : ${boardArticle.title}`} 
                                sx={{fontWeight:'bold'}}
              />
 */}
              <img
                src={`${imagePath(boardArticle.filePath)}` === 'noImage' ? 'noImage' : `//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format`}
                srcSet={`${imagePath(boardArticle.filePath)}` === 'noImage' ? 'noImage' : `//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format`}
                alt={boardArticle.title}
                loading="lazy"
                key={`${boardArticle.shareBoard.boardName}_${boardArticle.id}_img`}
              />
              <ImageListItemBar position="bottom"
                                title={`${boardArticle.title}`} 
// title={<div dangerouslySetInnerHTML={{__html : boardArticle.content.substring(0,20)}}></div>} 
                                subtitle={`Posted Date : ${boardArticle.createDate} By : ${boardArticle.createUser.nickname}`}

              />
            </ImageListItem>
          ))}
        </ImageList>      
      )
    }
    return (<Box><Typography align="center">No Content</Typography></Box>)
  }

  const masonryList = (boardArticleList : ShareBoardArticleList_, offset : number, limit : number) => {
    if (boardArticleList.length > 0) {
      return (
        <Masonry columns={5} spacing={4} defaultHeight={450} defaultColumns={4} defaultSpacing={1}>
          {        
            boardArticleList.slice(offset, offset+limit).map((boardArticle) => (
            <Box key={`${boardArticle.id}_box`} onClick={(e) => handleMenuView(boardArticle as ShareBoardArticle_, e)} sx={{cursor:'pointer'}}>
                <img
                  src={`${imagePath(boardArticle.filePath) === 'noImage'} ? 'noImage' : '//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format`}
                  srcSet={`${imagePath(boardArticle.filePath) === 'noImage'} ? 'noImage' : '//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format&dpr=2 2x`}
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
                    {/* <Typography noWrap={true} variant="subtitle2" align="left" sx={{p: 1}}>
                     <div dangerouslySetInnerHTML={{__html : boardArticle.content.substring(0,30)}}></div>
                    </Typography> */}
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
    console.log(`useEffect >> shareBoardId : ${shareBoardId}, offset : ${offset}, page : ${page}`);
    setPage(1);
    if  (allowScroll === true)  {
      handleContainerOnBottom();
    }
  }, [boardArticleList]);

  return (
    <Box sx={{ minHeight: 377, p:2 }}>
            <Typography variant="h4">List</Typography>
            <Divider/>
            <Breadcrumbs aria-label="breadcrumb" sx={{pt:2, pb:2}} separator=">">
                <Link underline="hover" color="inherit">{pathArr[1].toUpperCase()}</Link>            
                <Link underline="hover" color="inherit">{shareInfo.shareName.toUpperCase()}</Link>   
                <Typography color="text.primary">LIST</Typography>
            </Breadcrumbs>           

       <BottomScrollListener onBottom={handleContainerOnBottom} debounce={200} debounceOptions={{leading: false}} triggerOnNoScroll={false}>
          <Box>
            {imageList(boardArticleList)}  
          </Box>
      </BottomScrollListener>              
    </Box>
  )
}
export default ShareMansonryBoardArticleList;