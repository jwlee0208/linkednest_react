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
    <Box>
        <Grid container item>
{
    boardCategoryInfo.boardCategoryList.map((boardCategory) => (
            <Card key={`${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}`} sx={{p:1, width: `${100/boardCategoryCnt}%`}}>
                <Typography variant="h6" sx={{p:1}}>{boardCategory.boardCategoryName}</Typography>
    {
        (boardCategory.boardList !== null) ? (
            boardCategory.boardList.map((board) => (
                <Box key={`${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}/${board.boardKeyword}`} sx={{pl: 1, pb: 1}}><Button onClick={(e) => movePage(`/${boardCategoryInfo.contentCode}/${boardCategory.boardCategoryKeyword}/${board.boardKeyword}`, e)}>{board.boardName}</Button></Box>
            ))        

        ) : (<></>)

    }
            </Card>
    ))
}
        </Grid>
    </Box>)

}

export default SiteMap;