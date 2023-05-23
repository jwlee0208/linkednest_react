import { Box, Button, Card, Divider, Grid, Typography }             from "@mui/material";
import { movePage } from ".";
import { BoardCategory_, ContentBoardCategoryInfo_ } from "../../../../store/modules/boardCategory";

type SiteMapCardProps = {
    boardCategoryInfo   : ContentBoardCategoryInfo_
    boardCategory       : BoardCategory_
}
function SiteMapCard({boardCategoryInfo, boardCategory} : SiteMapCardProps) {
    let     boardCategoryCnt    = boardCategoryInfo.boardCategoryList.length;

    const getBoardListForCategory = () => {
        if (boardCategory.boardList !== null) {
            return (
                boardCategory.boardList.map((board) => (
                    <Box key={`${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}/${board.boardKeyword}`} sx={{m: 1}}>
                        <Typography variant="subtitle2" 
                                    onClick={(e) => movePage(`/${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}/${board.boardKeyword}`, e)}
                                    sx={{cursor:'pointer'}}>{board.boardName}</Typography>
                    </Box>
                ))                    
            )
        }
        return (<Box sx={{textAlign:'left', pl:1}}>-</Box>)
    }

    return (
    <Grid item xs={12/boardCategoryCnt} sx={{p:2}}>    
        <Card key={`${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}`} sx={{minHeight:200}}>
        {/* sx={{m:1, width: `${(100/boardCategoryCnt)-2}%`}} */}
        <Typography variant="h6" sx={{p:1}}>{boardCategory.boardCategoryName}</Typography>
        <Divider/>
        { getBoardListForCategory() }
        </Card>
    </Grid>
    )
}

export default SiteMapCard;