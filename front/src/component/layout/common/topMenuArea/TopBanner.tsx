import * as React from 'react';
import { Box } from "@mui/material";
import { useAppSelect } from "../../../../store/index.hooks";
import { getContentBoardCategoryInfo } from "../../../../store/modules/boardCategory";
import TopMenu from './TopMenu';

function TopBanner() {

    const contentBoardCategoryInfo = useAppSelect(getContentBoardCategoryInfo);
    const menuCnt = contentBoardCategoryInfo.boardCategoryList.length;
    return (
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', height: 50, width: '100%'}}>
{
    contentBoardCategoryInfo.boardCategoryList.map((contentBoardCategory) => (
                <Box sx={{width : `${100/menuCnt}%`, height: 50, verticalAlign:'center'}} key={`${contentBoardCategory.boardCategoryKeyword}_Box`}>
                    <TopMenu key={`${contentBoardCategory.boardCategoryKeyword}_topMenu`} contentBoardCategory={contentBoardCategory}/>
                </Box>
    ))
}                
            </Box>
    );
}

export default TopBanner;