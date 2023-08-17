import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ShareBoardCategory_ } from "../../../../store/modules/share";

type ShareBoardCategoryMenuRowProps = {
    userId  : string;
    shareBoardCategory : ShareBoardCategory_;
}

function ShareBoardCategoryMenuRow ({
    userId,
    shareBoardCategory,
} : ShareBoardCategoryMenuRowProps) {
    const navigate      = useNavigate();

    const [open, setOpen] = useState(true);
    const handleClick = () => {
      setOpen(!open);
    };

    const handleToClickShareBoard = (categoryId : string, boardId : string, boardType : string, e : React.MouseEvent) => {
        e.preventDefault();
        if (boardType === '0') {
            navigate(`/share/${userId}/${categoryId}/${boardId}`
            , {state : {shareBoardType       : boardType
                      , shareBoardCategoryId : categoryId
                      , shareBoardId         : boardId
                      , shareUserId          : userId}});
        } else {
            window.location.href=`/share/${userId}/${categoryId}/${boardId}`;
        }
    }

    const handleToClickShareCategoryBoard = (categoryId : string, e : React.MouseEvent) => {
        e.preventDefault();
        navigate(`/share/${userId}/${categoryId}`);
    }

    return (
        <List key={'cat_'+shareBoardCategory.id}>    
            <ListItemButton onClick={handleClick}>
                <ListItemText onClick={(e) => handleToClickShareCategoryBoard(`${shareBoardCategory.id}`, e)}>
                    <Typography variant="h6" sx={{fontWeight:'bold'}}>{shareBoardCategory.boardCategoryName}</Typography>
                </ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider/>
            <Collapse in={open} timeout={'auto'} unmountOnExit>                            
                <List key={'catBoard_'+shareBoardCategory.id}>
                {
                    shareBoardCategory.shareBoardList.map(sb => (
                    <ListItemButton onClick={(e) => handleToClickShareBoard(`${shareBoardCategory.id}`, `${sb.id}`, `${sb.boardType}`, e)} key={'shareBoard_'+sb.id}>
                        <Typography variant="subtitle1">{sb.boardName}</Typography>
                    </ListItemButton>        
                    ))
                }
                </List> 
            </Collapse>
        </List>       
    )
}

export default ShareBoardCategoryMenuRow;