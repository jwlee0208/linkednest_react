import * as React from 'react';
import { Box } from "@mui/material";
import { useAppSelect } from "../../../store/index.hooks";
import { getContentBoardCategoryInfo } from "../../../store/modules/boardCategory";
import TopMenu from './topMenuArea/TopMenu';

function TopBanner() {

    const contentBoardCategoryInfo = useAppSelect(getContentBoardCategoryInfo);

    return (
            <Box  key={`${contentBoardCategoryInfo}_topBannerBox`} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', height: 50, width: '100%' }}>
{
    contentBoardCategoryInfo.boardCategoryList.map((contentBoardCategory) => (
                <TopMenu key={contentBoardCategory.boardCategoryKeyword} contentBoardCategory={contentBoardCategory}/>
    ))
}                
            </Box>
    );
}

export default TopBanner;