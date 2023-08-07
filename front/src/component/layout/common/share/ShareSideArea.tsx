import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { ShareBoardCategoryList_ } from "../../../../store/modules/share";
import { axiosInstance } from "../../../..";
import { useLocation } from "react-router";

function ShareSideArea() {
    const location      = useLocation();
    const pathArr       = location.pathname.split("/");
    const shareUserId   = pathArr[2];

    const [shareBoardCategoryList, setShareBoardCategoryList] = useState<ShareBoardCategoryList_>([{
        id                  : 0,
        boardCategoryName   : '',
        createUserId        : '',
        createDate          : '',
        share               : {
            id              : 0,
            shareName       : '',
            shareType       : '',
            introduce       : '',
            createUserId    : '',
            createDate      : '',
        },
        shareBoardList      : [{
            id                  : 0,
            boardName           : '',
            boardType           : '',
            createUserId        : '',
            createDate          : '',
            modifyUserId        : '',
            modifyDate          : '',
        }]
    }]);

    useEffect(() => {
        axiosInstance.post(`/api/share/board/category/list`, {"createUserId" : shareUserId})
            .then((res) =>  {
                console.log(`res.data.shareBoardCategoryList : ${res.data.shareBoardCategoryList}`);
                setShareBoardCategoryList(res.data.shareBoardCategoryList);        
            }).catch((err)=> {
                console.log(err);    
            })
    }, [shareUserId]);
    
    return (
        <Box component="menu" sx={{mr:3, overflow: 'hidden', opacity:0.7}}>
            {
                shareBoardCategoryList.map(sbc => (
                    <List key={'cat_'+sbc.id}>    
                        <ListItemText>{sbc.boardCategoryName}</ListItemText>
                        <Divider/>
                        <List key={'catBoard_'+sbc.id}>
                            {
                                sbc.shareBoardList.map(sb => (
                                    <ListItemText key={'shareBoard_'+sb.id}>{sb.boardName}</ListItemText>    
                                ))
                            }
                        </List> 
                    </List>       
                ))
            }            
            
            
        </Box>
    )
}

export default ShareSideArea;