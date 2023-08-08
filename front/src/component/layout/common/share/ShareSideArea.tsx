import { Box, Collapse, Divider, List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../../..";
import { useAppSelect } from "../../../../store/index.hooks";
import { ShareBoardCategoryList_, getShareInfo } from "../../../../store/modules/share";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ShareBoardCategoryMenuRow from "./ShareBoardCategoryMenuRow";

function ShareSideArea() {
    const location      = useLocation();
    const pathArr       = location.pathname.split("/");
    const shareUserId   = pathArr[2];
    const shareInfo     = useAppSelect(getShareInfo);

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
            shareBoardCategoryList : [],
            returnCode      : 0,
            returnMsg       : '',
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
        if (`${shareInfo.id}` === '0') {
            axiosInstance.post(`/api/share/board/category/list`, {"createUserId" : shareUserId})
                .then((res) =>  {
                    console.log(`res.data.shareBoardCategoryList : ${res.data.shareBoardCategoryList}`);
                    setShareBoardCategoryList(res.data.shareBoardCategoryList);        
                }).catch((err)=> {
                    console.log(err);    
                });    
        } else {
            setShareBoardCategoryList(shareInfo.shareBoardCategoryList);    
        }
    }, [shareUserId]);
    
    return (
        <Box component="menu" sx={{mr:3, overflow: 'hidden', opacity:0.7}}>
            {
                shareBoardCategoryList !== null ? 
                    shareBoardCategoryList.map(sbc => (
                        <Paper key={`${sbc.boardCategoryName}_key`} elevation={3} sx={{marginTop:'10px', marginRight:'10px'}}>
                            <ShareBoardCategoryMenuRow shareBoardCategory={sbc} userId={shareUserId}/>
                        </Paper>
                    )) 
                    : <></>
            }            
        </Box>
    )
}

export default ShareSideArea;