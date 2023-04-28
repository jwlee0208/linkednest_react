import { Box, Button, Divider, Typography } from "@mui/material";
import { ContentCategoryList_ } from "../../../../store/modules/content";

type ContentCategoryProps = {
    contentCategoryList : ContentCategoryList_
}

function ContentCategory({contentCategoryList} : ContentCategoryProps) {
    return (
    <>
{
    contentCategoryList.map((contentCategory) => (
        <Box key={contentCategory.categoryCode} sx={{pl:1}}>
            <Button key={contentCategory.categoryCode} sx={{color:'black'}}>
                    <Typography variant={contentCategory.depth === 1 ? 'h6' : (contentCategory.depth === 2 ? 'subtitle1' : 'subtitle2')} 
                                sx={{fontWeight : `${contentCategory.depth === 1 ? 'bold' : ''}` }}>
                        {contentCategory.categoryName}
                    </Typography>
            </Button>        
    {
        contentCategory.depth === 1 ? (<Divider/>) : (<></>)
    }    
    {
        contentCategory.childCategoryList !== null ? 
        (
            <ContentCategory contentCategoryList={contentCategory.childCategoryList}/>
        ) : (<Box>-</Box>)
    }
        </Box>
    ))
}    
    </>)
}
export default ContentCategory;