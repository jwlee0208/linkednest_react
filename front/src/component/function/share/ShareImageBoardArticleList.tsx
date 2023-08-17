import { Box, Breadcrumbs, Divider, ImageList, ImageListItem, ImageListItemBar, Link, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../../..";
import { useAppSelect } from "../../../store/index.hooks";
import { ShareBoardArticleList_, ShareBoardArticle_, getShareInfo } from "../../../store/modules/share";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const noImage = `http://${process.env.REACT_APP_API_DOMAIN}/images/noImage.jpg`;

type ShareImageBoardArticleListProps = {
  shareBoardId          : string,
  shareBoardCategoryId  : string,
  shareUserId           : string, 
  alertOnBottom         : boolean,
  boardType             : string,
}

export const imagePath = (path : string) => {
  return path !== null && path !== '' ? path : noImage;
}

function ShareImageBoardArticleList({
    shareBoardId
  , shareBoardCategoryId
  , shareUserId
  , alertOnBottom
  , boardType
} : ShareImageBoardArticleListProps) {
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
      let calOffset = (page-1) * limit;
      setOffset(calOffset);
      setPage(page+1);

      reqBody = JSON.stringify({
        shareBoardCategoryId : shareBoardCategoryId,
        shareBoardId         : shareBoardId,
        shareUserId          : shareUserId,
        offset               : calOffset,
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

  const getBoardType = () => {
    switch (boardType) {
      case 'masonry' : return boardType;
      case 'quilted' : return boardType;
      case 'woven'   : return boardType;
      default : return 'standard' 
    }
  }

  const imageList = (boardArticleList : ShareBoardArticleList_) => {
    let isExistBoardArticleList = boardArticleList.length > 0 && boardArticleList[0].id > 0;
    if (isExistBoardArticleList === true) {
      return (
        <ImageList variant={getBoardType()} cols={3} gap={30} key={`${shareBoardCategoryId}_${shareBoardId}_images`}>
          {
          boardArticleList.map((boardArticle) => (
            <ImageListItem key={`${boardArticle.shareBoard.boardName}_${boardArticle.id}_img_list_item`} onClick={(e) => handleMenuView(boardArticle as ShareBoardArticle_, e)} sx={{cursor:'pointer'}}>
              <img
                src={`${imagePath(boardArticle.filePath)}` === 'noImage' ? 'noImage' : `//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format`}
                srcSet={`${imagePath(boardArticle.filePath)}` === 'noImage' ? 'noImage' : `//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format`}
                alt={boardArticle.title}
                loading="lazy"
                key={`${boardArticle.shareBoard.boardName}_${boardArticle.id}_img`}
              />
              <ImageListItemBar position="bottom"
                                tabIndex={boardArticle.id}
                                title={`${boardArticle.title}`}
                                sx={{marginBottom:5, textAlign:'center', fontWeight:'bold'}} 
              />
              <ImageListItemBar position="bottom"
                                subtitle={`Posted By ${boardArticle.createUser.nickname} At ${boardArticle.createDate} `}
                                sx={{textAlign:'right'}}
              />
            </ImageListItem>
          ))}
        </ImageList>      
      )
    }
    return (<Box><Typography align="center">No Content</Typography></Box>)
  }


  useEffect(() => {
    console.log(`useEffect >> shareBoardId : ${shareBoardId}, offset : ${offset}, page : ${page},  allowScroll : ${allowScroll}`);
    setPage(1);
    if (allowScroll === true) {
      handleContainerOnBottom();
    }
  }, [boardArticleList,  shareUserId, shareBoardCategoryId, shareBoardId]);

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
export default ShareImageBoardArticleList;