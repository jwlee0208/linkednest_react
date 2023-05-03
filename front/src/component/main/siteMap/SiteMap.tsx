import { Grid }                         from "@mui/material";
import { useAppSelect }                 from "../../../store/index.hooks";
import { getContentBoardCategoryInfo }  from "../../../store/modules/boardCategory";
import SiteMapCard                      from "./SIteMapCard";

function SiteMap() {

    const   boardCategoryInfo   = useAppSelect(getContentBoardCategoryInfo);

    return (
        <Grid container item>
        {
            boardCategoryInfo.boardCategoryList.map((boardCategory) => (
            <SiteMapCard key={boardCategory.boardCategoryCode} boardCategory={boardCategory} boardCategoryInfo={boardCategoryInfo}/>
            ))
        }
        </Grid>
    )
}

export default SiteMap;