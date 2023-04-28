import { Box, Button, Divider, Typography } from "@mui/material";
import { ContentCategoryList_, ContentCategory_ } from "../../../../store/modules/content";
import { MouseEvent } from "react";
import { useNavigate } from "react-router";

type ContentCategoryProps = {
    contentCategoryList : ContentCategoryList_
}

function ContentCategory({contentCategoryList} : ContentCategoryProps) {

    const navigate = useNavigate();
    const movePage = (contentCategory : ContentCategory_, e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('aaaaaaaaaa');
        navigate(`/portal/category/detail`, {state : {contentCategory : contentCategory}});
    }

    return (
    <>
{
    contentCategoryList.map((contentCategory) => (
        <Box key={contentCategory.categoryCode} sx={{pl:1}}>
            <Button key={contentCategory.categoryCode} sx={{color:'black'}} onClick={(e) => movePage(contentCategory, e)}>
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