import { Box, Button, Divider, Typography } from "@mui/material";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ContentCategoryList_, ContentCategory_ } from "../../../../store/modules/content";

type ContentCategoryProps = {
    contentCategoryList : ContentCategoryList_
}

function ContentCategory({contentCategoryList} : ContentCategoryProps) {

    const navigate = useNavigate();

    const [contentCategory_, setContentCategory_] = useState<ContentCategory_>({
        id                  : 0,
        parentId            : 0,
        categoryCode        : '',
        categoryName        : '',
        depth               : 0,
        isActive            : '',
        childCategoryList   : [],
        contentList         : [],
    });

    const movePage = (contentCategory : ContentCategory_, e : MouseEvent) => {
        e.preventDefault();
        console.log('aaaaaaaaaa');
        setContentCategory_(contentCategory);
        navigate(`/portal/category/detail`, { replace: true, state : {contentCategory : contentCategory} });
    }

    const contentCategoryTxtVariant = (depth : number) => {
        switch (depth) {
            case 1 : return 'h6'
            case 2 : return 'subtitle1'
            default : return 'subtitle2'
        }
    }

    useEffect(() => {

    }, [contentCategory_]);

    return (
    <>
{
    contentCategoryList.map((contentCategory) => (
        <Box key={contentCategory.categoryCode} sx={{pl:1}}>
            <Button key={contentCategory.categoryCode} sx={{color:'black', width:'100%', align:'left'}} onClick={(e) => movePage(contentCategory, e)}>
                    <Typography variant={contentCategoryTxtVariant(contentCategory.depth)} 
                                sx={{textAlign: 'left', fontWeight : `${contentCategory.depth === 1 ? 'bold' : ''}`, width:'100%'}}>
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
        ) : (<Box></Box>)
    }
        </Box>
    ))
}    
    </>)
}
export default ContentCategory;