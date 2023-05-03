import { Box, Button, Card, Typography }             from "@mui/material";
import { BoardCategory_, ContentBoardCategoryInfo_ } from "../../../store/modules/boardCategory";
import { movePage } from ".";

type SiteMapCardProps = {
    boardCategoryInfo   : ContentBoardCategoryInfo_
    boardCategory       : BoardCategory_
}
function SiteMapCard({boardCategoryInfo, boardCategory} : SiteMapCardProps) {
    let     boardCategoryCnt    = boardCategoryInfo.boardCategoryList.length;


    return (
    <>    
        <Card key={`${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}`} sx={{m:1, width: `${(100/boardCategoryCnt)-2}%`}}>
        <Typography variant="h6" sx={{p:1}}>{boardCategory.boardCategoryName}</Typography>
{
(boardCategory.boardList !== null) ? (
    boardCategory.boardList.map((board) => (
        <Box key={`${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}/${board.boardKeyword}`} sx={{m: 1}}><Button onClick={(e) => movePage(`/${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}/${board.boardKeyword}`, e)}>{board.boardName}</Button></Box>
    ))        

) : (<></>)

}
        </Card>
    </>
    )
}

export default SiteMapCard;