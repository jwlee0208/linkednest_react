import { Box, Breadcrumbs, Divider, Grid, Link, Pagination, Typography } 
                            from "@mui/material";
import { useState }         from 'react';
import { ContentCategory_ } from "../../../store/modules/contentCategory";
import ContentCard          from "./ContentCard";

type CategoryInfoContentListProps = {
    contentCategory : ContentCategory_;
}
function CategoryInfoContentList({contentCategory} : CategoryInfoContentListProps) {
 
    const [limit                , setLimit]                 = useState(10);
    const [page                 , setPage]                  = useState(1);
    const offset = (page - 1) * limit;


    const viewCards = () => {
        if (contentCategory.contentList !== null) {
            return contentCategory.contentList.slice(offset, offset+limit).map((content, index) => (
                <Grid item spacing={4} key={`${content.contentCode}_grid`}>
                    <ContentCard content={content} key={content.contentCode}/>
                </Grid>
            ))    
        } else {
            return <Grid key='no_content' sx={{width:'100%'}}><Typography align="center">No Content</Typography></Grid>
        }
    }

    let listCnt = (contentCategory.contentList === null) ? 0 : contentCategory.contentList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
    };

    return (
        <Box sx={{p:2}}>
            <Typography variant="h4"> List</Typography>
            <Divider/>
            <br/>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">Portal</Link>            
                <Link underline="hover" color="inherit">{contentCategory.categoryName}</Link>            
                <Typography color="text.primary">List</Typography>
            </Breadcrumbs>
            
            <Grid container spacing={8} sx={{pt:3, pb:3}}>
                {viewCards()}
            </Grid>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}} />
        </Box>
    )
}
export default CategoryInfoContentList;