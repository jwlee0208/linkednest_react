import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect }                        from "react";
import { ContentCategoryList_ }             from "../../../../../store/modules/contentCategory";

type ContentCategoryProps = {
    contentCategoryList : ContentCategoryList_,
    handleCloseNavMenu  : any,
}

function ContentCategory({contentCategoryList, handleCloseNavMenu} : ContentCategoryProps) {

    const contentCategoryTxtVariant = (depth : number) => {
        switch (depth) {
            case 1 : return 'h6'
            case 2 : return 'subtitle1'
            default : return 'subtitle2'
        }
    }

    useEffect(() => {

    }, []);

    return (
    <>
{
    contentCategoryList.map((contentCategory) => (
        <Box key={contentCategory.categoryCode} sx={{pl:1}}>
            <Button key={contentCategory.categoryCode} sx={{color:'black', width:'100%', align:'left'}} 
                    onClick={(e) => handleCloseNavMenu('/portal/category/detail', contentCategory, e)}>
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
            <ContentCategory contentCategoryList={contentCategory.childCategoryList} handleCloseNavMenu={handleCloseNavMenu}/>
        ) : (<Box></Box>)
    }
        </Box>
    ))
}    
    </>)
}
export default ContentCategory;