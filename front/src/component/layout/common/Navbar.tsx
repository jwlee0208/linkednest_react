import { Box, Button, Fade, Grid, List, ListItem, Typography } from "@mui/material";
import { useState } from 'react';
import { useAppSelect } from "../../../store/index.hooks";
import { BoardCategory_, Board_, getContentBoardCategoryInfo } from "../../../store/modules/boardCategory";

function Navbar () {

    const contentBoardCategoryInfo = useAppSelect(getContentBoardCategoryInfo);
    const boardCategoryCnt = contentBoardCategoryInfo.boardCategoryList.length;

    const moveToPage = (contentBoardCategory : BoardCategory_, board : Board_, e : React.MouseEvent<HTMLElement>) => {
        window.location.href = `/${contentBoardCategory.contentCode}/${contentBoardCategory.boardCategoryKeyword}/${board.boardKeyword}`;
    };

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev)
    }
 
    return (
     <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', height: 50, width: '100%'}}> 
{
    contentBoardCategoryInfo.boardCategoryList.map((boardCategoryObj) => (    
        <Box id="topMenuArea" sx={{width:`${100/boardCategoryCnt}%`, height: 50, textAlign:'center'}} key={`${boardCategoryObj.boardCategoryKeyword}_area`}>
            <div key={`${boardCategoryObj.boardCategoryKeyword}_1depth`} style={{verticalAlign:'bottom'}}>
                <Button id={`${boardCategoryObj.boardCategoryKeyword}_button`} 
                            key={`${boardCategoryObj.boardCategoryKeyword}`}
                            sx={{height: 50, }}
                            // onClick={handleChange}
                            onMouseEnter={handleChange}
                            onMouseLeave={handleChange}>
                    <Typography sx={{fontWeight:'bold'}} key={`${boardCategoryObj.boardCategoryKeyword}_text`}>{boardCategoryObj.boardCategoryName}</Typography>
                </Button> 
            </div>
        </Box>            
    ))
}        
    <Fade in={checked} {...(checked ? { timeout: 1200 } : { timeout: 1200 })}>
        <Box sx={{ width:'100%', position: "absolute", backgroundColor: '#ffffff', opacity:'0.9', top: 125, left: "50%", transform: "translateX(-50%)", zIndex:'80'}}>
            <Grid container item>
{
    contentBoardCategoryInfo.boardCategoryList.map((boardCategoryObj) => (
        <Grid item xs={12/boardCategoryCnt} key={`${boardCategoryObj.boardCategoryCode}_subMenus`}>
            <List>
    {(boardCategoryObj.boardList !==null) ? (
        boardCategoryObj.boardList.map((boardObj) => (
            <ListItem key={`${boardObj.boardCode}_subMenu`} sx={{justifyContent:'center'}}>
                <Button onClick={(e) => moveToPage(boardCategoryObj as BoardCategory_, boardObj as Board_, e)} 
                        sx={{fontWeight:'bold'}}>{boardObj.boardName}</Button>
            </ListItem>
        ))) : (<></>)
    }            
            </List>
        </Grid>    
    ))
}
            </Grid>
        </Box>
    </Fade>

    </Box>    
      );
}


export default Navbar;