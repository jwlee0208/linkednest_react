import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useAppSelect } from "../../../store/index.hooks";
import { getContentBoardCategoryInfo } from "../../../store/modules/boardCategory";
import { useLocation } from "react-router";

function SiteMap() {

    const boardCategoryInfo = useAppSelect(getContentBoardCategoryInfo);
    let boardCategoryCnt = boardCategoryInfo.boardCategoryList.length;

    const movePage = (urlPath : string, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        window.location.href = urlPath;
    }

    return (
        <Grid container item>
{
    boardCategoryInfo.boardCategoryList.map((boardCategory) => (
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
    ))
}
        </Grid>
    )

}

export default SiteMap;