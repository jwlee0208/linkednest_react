import * as React from 'react';
import { Button, Menu, MenuItem } from "@mui/material";
import { BoardCategory_, Board_ } from "../../../../store/modules/boardCategory";
import { useNavigate } from "react-router";


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
        navigate(`/${contentBoardCategory.contentCode}/board/${board.boardKeyword}`);
    };

    return (
        <>
            <div key={`${contentBoardCategory.boardCategoryKeyword}_1depth`}>
                <Button id={`${contentBoardCategory.boardCategoryKeyword}_button`} 
                        key={`${contentBoardCategory.boardCategoryKeyword}`}
                        aria-controls={open ? `${contentBoardCategory.id}_menu` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                            {contentBoardCategory.boardCategoryName}
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
        </>
    )
}

export default TopMenu;