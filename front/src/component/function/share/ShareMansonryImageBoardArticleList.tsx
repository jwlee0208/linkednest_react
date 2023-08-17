import { Masonry } from "@mui/lab";
import { Box, Divider, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { ShareBoardArticleList_, ShareBoardArticle_ } from "../../../store/modules/share";
import { Item, imagePath } from "./ShareImageBoardArticleList";

type ShareMansonryImageBoardArticleListProps = {
    boardArticleList : ShareBoardArticleList_,
    page : number,
    limit : number,
} 
function ShareMansonryImageBoardArticleList({boardArticleList, page, limit} : ShareMansonryImageBoardArticleListProps) {

    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuView = (boardArticle : ShareBoardArticle_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${location.pathname}/${boardArticle.id}`, {state : {shareBoardArticle : boardArticle}});
    }
  
    const masonryList = (boardArticleList : ShareBoardArticleList_, offset : number, limit : number) => {
        if (boardArticleList.length > 0) {
          return (
            <Masonry columns={3} spacing={1} defaultHeight={450} defaultColumns={4} defaultSpacing={1}>
              {        
                boardArticleList.slice(offset, offset+limit).map((boardArticle) => (
                <Box key={`${boardArticle.id}_box`} onClick={(e) => handleMenuView(boardArticle as ShareBoardArticle_, e)} sx={{cursor:'pointer'}}>
                    <img
                      src={`${imagePath(boardArticle.filePath)}` === 'noImage' ? 'noImage' : `//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format`}
                      srcSet={`${imagePath(boardArticle.filePath)}` === 'noImage' ? 'noImage' : `//jwlee0208.cdn3.cafe24.com${boardArticle.filePath}?width=auto&height=auto&auto=format`}
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
        
    return (
        masonryList(boardArticleList, (page - 1)*limit , limit)
    )
}