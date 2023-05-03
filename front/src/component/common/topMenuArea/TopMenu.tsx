import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import * as React from 'react';
import { useNavigate } from "react-router";
import { BoardCategory_, Board_ } from "../../../store/modules/boardCategory";


type  TopMenuProps = {
    contentBoardCategory : BoardCategory_
}
function TopMenu({contentBoardCategory} : TopMenuProps) {

    const navigate    = useNavigate();
 
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();  
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const moveToPage = (contentBoardCategory : BoardCategory_, board : Board_, e : React.MouseEvent<HTMLElement>) => {
        // navigate(`/${contentBoardCategory.contentCode}/${contentBoardCategory.boardCategoryKeyword}/${board.boardKeyword}`, {state : {contentBoardCategory : contentBoardCategory, board : board}});
        window.location.href = `/${contentBoardCategory.contentCode}/${contentBoardCategory.boardCategoryKeyword}/${board.boardKeyword}`;
    };

    return (
        <Box id="topMenuArea" sx={{height: 50, textAlign:'center'}} key={`${contentBoardCategory.boardCategoryKeyword}_area`}>
            <div key={`${contentBoardCategory.boardCategoryKeyword}_1depth`} style={{verticalAlign:'bottom'}}>
                <Button id={`${contentBoardCategory.boardCategoryKeyword}_button`} 
                        key={`${contentBoardCategory.boardCategoryKeyword}`}
                        aria-controls={open ? `${contentBoardCategory.id}_menu` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        sx={{height: 50}}
                        onClick={handleClick}>
                            <Typography sx={{fontWeight:'bold'}} key={`${contentBoardCategory.boardCategoryKeyword}_text`}>{contentBoardCategory.boardCategoryName}</Typography>
                </Button> 
                {
                    (contentBoardCategory.boardList !== null) ? (
                        <Menu id={`${contentBoardCategory.boardCategoryKeyword}_menu`}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': `${contentBoardCategory.boardCategoryKeyword}_button`,}}
                        key={`${contentBoardCategory.boardCategoryKeyword}_menu`}
                >
                        {   (contentBoardCategory.boardList !== null) ? 
                            contentBoardCategory.boardList.map((board) => (
                                [
                                <MenuItem onClick={(e) => moveToPage(contentBoardCategory as BoardCategory_, board as Board_, e)} key={board.boardCode}>{board.boardName}</MenuItem>
                                ]
                                )) : <></>
                        }    
                    </Menu>
                    ) : (<></>)
                }
            </div>    
        </Box>
    )
}

export default TopMenu;