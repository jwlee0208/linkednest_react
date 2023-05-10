import { Masonry } from "@mui/lab";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { ArticleListProps } from ".";
import { useLocation, useNavigate } from "react-router";
import { BoardArticle_ } from "../../../../store/modules/boardCategory";
import { useEffect, useRef } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const noImage = "http://localhost:9091/images/noImage.jpg";

function MansoryArticleList({
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

  const imagePath = (path : string) => {
    return path !== null && path !== '' ? path : noImage;
  }


  return (
    <Box sx={{ minHeight: 377 }}>
      {
      boardArticleList.length > 0 ? (
        <Masonry columns={5} spacing={4} 
                defaultHeight={450}
                defaultColumns={4}
                defaultSpacing={1}>
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
                <Typography noWrap={true} variant="subtitle2" align="left" sx={{p: 1}}>{boardArticle.contentText}</Typography>
            </Item>
        </Box>
      ))}
      </Masonry>   
      )
        : (<Typography sx={{width: '100%', textAlign:'center', p:10}} variant="body1">There's no article.</Typography>)
      }                
    </Box>
  )
}
export default MansoryArticleList;