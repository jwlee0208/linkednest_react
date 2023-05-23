import { Box, Divider, Grid, Typography }                         from "@mui/material";
import SiteMapCard                      from "./SIteMapCard";
import { useAppSelect }                 from "../../../../store/index.hooks";
import { getContentBoardCategoryInfo }  from "../../../../store/modules/boardCategory";

function SiteMap() {

    const   boardCategoryInfo   = useAppSelect(getContentBoardCategoryInfo);

    return (
        <Box sx={{p:2}}>
        <Typography variant="h4">Site Map</Typography>
        <Divider/>
        <Grid container item>
        {
            boardCategoryInfo.boardCategoryList.map((boardCategory) => (
            <SiteMapCard key={boardCategory.boardCategoryCode} boardCategory={boardCategory} boardCategoryInfo={boardCategoryInfo}/>
            ))
        }
        </Grid>
        </Box>
    )
}

export default SiteMap;