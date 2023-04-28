import { Box } from "@mui/material";
import { useLocation } from "react-router";

function CategoryInfoContentList() {

    const location = useLocation();
    const contentCategoryInfo = location.state.contentCategory;

    return (
        <>
            <Box>{contentCategoryInfo.categoryName}</Box>
    {
        contentCategoryInfo.contentList !== null ? (<></>) : (<></>)
    }        
        </>
    )
}
export default CategoryInfoContentList;