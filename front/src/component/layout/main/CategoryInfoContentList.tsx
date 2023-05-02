import { Box, Breadcrumbs, Button, ButtonGroup, Divider, Link, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ContentCategory_, Content_ } from "../../../store/modules/content";
import { useState, MouseEvent } from 'react';
import { useNavigate } from "react-router";

type CategoryInfoContentListProps = {
    contentCategory : ContentCategory_;
}
function CategoryInfoContentList({contentCategory} : CategoryInfoContentListProps) {
 
    const navigate = useNavigate();
    const [limit                , setLimit]                 = useState(10);
    const [page                 , setPage]                  = useState(1);
    const offset = (page - 1) * limit;

    const viewTableRow = () => {

        if (contentCategory.contentList !== null) {
            return contentCategory.contentList.slice(offset, offset+limit).map((content, index) => (
                <TableRow key={`${content.contentCode}`}>
                    <TableCell>{index + offset + 1}</TableCell>
                    <TableCell><Button onClick={(e) => handleContentView(content as Content_, e)}>{content.contentName}</Button></TableCell>
                    <TableCell>{content.contentType}</TableCell>
                    <TableCell>
                        <Typography>{content.contentDesc}</Typography>                                
                    </TableCell>
                </TableRow>
            ))    
        } else {
            return 
                <TableRow>No Content</TableRow>
        }
    }


    let listCnt = (contentCategory.contentList === null) ? 0 : contentCategory.contentList.length;
    let pageCnt = Math.ceil(listCnt/10);

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
    };

    const handleContentView = (content : Content_, e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/${content.contentCode}`);
    }

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

            <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={'5%'}>No</TableCell>
                        <TableCell width={'45%'}>Title</TableCell>
                        <TableCell width={'15%'}>Type</TableCell>
                        <TableCell width={'25%'}>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    viewTableRow()
                }                
                </TableBody>    
            </Table>
            </TableContainer>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}} />
        </Box>    )
}
export default CategoryInfoContentList;