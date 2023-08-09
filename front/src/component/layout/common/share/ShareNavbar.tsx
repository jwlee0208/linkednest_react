import { useEffect, useState } from "react";
import { useAppSelect } from "../../../../store/index.hooks";
import { ShareBoardCategoryList_, ShareBoardCategory_, ShareBoardList_, ShareBoard_, getShareInfo } from "../../../../store/modules/share";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../../../..";
import { Box, Button, Fade, Grid, List, ListItem, Paper, Typography } from "@mui/material";

function ShareNavbar ()  {
    const location      = useLocation();
    const pathArr       = location.pathname.split("/");
    const shareUserId   = pathArr[2];
    const navigate      = useNavigate();
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

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev)
    }

    const viewShareBoardCategoryList = () => {
        switch (shareBoardCategoryList) {
            case null : return <></>
            default : return shareBoardCategoryList.map((shareBoardCategory) => (
                <Box id="topMenuArea"
                    sx={{ width:`${100/shareBoardCategoryList.length}%`, textAlign:'center' }} 
                    key={`${shareBoardCategory.boardCategoryName}_area`} 
                    onClick={handleChange}>
                    <div key={`${shareBoardCategory.boardCategoryName}_1depth`} style={{verticalAlign:'bottom'}}>
                        <Button id={`${shareBoardCategory.boardCategoryName}_button`}
                                key={`${shareBoardCategory.boardCategoryName}`}>
                            <Typography sx={{fontWeight:'bold'}} key={`${shareBoardCategory.boardCategoryName}_text`}>{shareBoardCategory.boardCategoryName}</Typography>
                        </Button>
                    </div>
                </Box>    
            ))
        }
    }

    const viewShareBoardCategoryListForChildArea = () => {
        switch (shareBoardCategoryList) {
            case null : return <></>
            default : return shareBoardCategoryList.map((shareBoardCategory) => (
                <Grid item xs={12/shareBoardCategoryList.length} key={`${shareBoardCategory.boardCategoryName}_subMenus`}>
                    <List>
                        {viewShareBoardList(shareBoardCategory)}
                    </List>
                </Grid>    
            ))        
        }
    }

    const viewShareBoardList = (shareBoardCategory : ShareBoardCategory_) => {
        switch (shareBoardCategory.shareBoardList) {
            case null : return <></>
            default : return shareBoardCategory.shareBoardList.map((shareBoard) => (
                <ListItem key={`${shareBoard.id}_subMenu`} sx={{justifyContent:'center'}}>
                    <Button onClick={(e) => moveToPage(shareBoardCategory as ShareBoardCategory_, shareBoard as ShareBoard_, e)} 
                            sx={{fontWeight:'bold', border:1, borderColor:'white'}}>{shareBoard.boardName}</Button>
                </ListItem>
            ))
        }
    }

    const moveToPage = (shareBoardCategory : ShareBoardCategory_, shareBoard : ShareBoard_, e : React.MouseEvent<HTMLElement>) => {
        window.location.href = `share/${shareUserId}/${shareBoardCategory.id}/${shareBoard.id}`;
    };

    useEffect(() =>  {
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
        <Paper elevation={24}>    
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                {viewShareBoardCategoryList()}
                <Fade in={checked} {...({timeout: 200})} onMouseLeave={handleChange}>
                    <Box id="shareBoardCategoryArea"
                        sx={{ width:'100%', position: "absolute", backgroundColor: "#ffffff", left: "50%", transform: "translateX(-50%)", zIndex:10}}>
                        <Paper elevation={24}>    
                            <Grid container item>
                            {viewShareBoardCategoryListForChildArea()}
                            </Grid>
                        </Paper>    
                    </Box>
                </Fade>
            </Box>
        </Paper>        
    )
}

export default ShareNavbar;