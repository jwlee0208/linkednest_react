import { useEffect, useState } from "react";
import { ShareBoardArticleList_, ShareBoardArticle_ } from "../../../store/modules/share";
import { Box, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { axiosInstance } from "../../..";

function ShareNormalBoardArticleList () {
    const location = useLocation();
    const navigate = useNavigate();

    const [totalPages, setTotalPages] = useState(0);
    const [shareBoardArticleList, setShareBoardArticleList] = useState<ShareBoardArticleList_>([{
        id              : 0,
        title           : "",
        content         : "",
        createUser      : {
            userNo                  : 0,
            userId                  : '',
            password                : '',
            nickname                : '',
            email                   : '',
            introduce               : '',
            accessToken             : '',
            refreshToken            : '',
            isLogin                 : false,
            adminMenuCategoryList   : [],
            userRoleInfoList        : [],
            roleInfoList            : [],
            birthday                : '',
            sex                     : '',
            phoneNo                 : '',
            additionalPhoneNo       : '',
            address                 : '',
            detailAddress           : '',
            zipcode                 : 0,
            reCaptchaToken          : "",             
            userProfile             : {
                sex         : '',
                phoneNo     : '',
                birthday    : '',
            },        
            returnCode              : 0,        
        },
        createDate      : "",
        filePath        : "",
        originalFilePath: "",
        status          : 0,
        shareBoard : {
            id                  : 0,
            boardName           : "",
            boardType           : "",
            createUserId        : "",
            createDate          : "",
            modifyUserId        : "",
            modifyDate          : "",
        }
    }]);

    const setupShareBoardArticleList = (shareBoardArticleList_ : ShareBoardArticleList_) => {
        setShareBoardArticleList(shareBoardArticleList_);
    }

    const getShareBoardArticleList = (offset  : number, limit  : number) => {
        axiosInstance.post('/api/share/board/article/list/71',
            JSON.stringify({
                offset  : offset * limit,
                limit   : limit,
            })
        ).then(res => {
            setupShareBoardArticleList(res.data.shareBoardArticleList);
            setTotalPages(res.data.totalPages);
        }).catch(err => (
            alert(`[${err.code}][${err.response.status}] ${err.message}`)    
        ));
    }

    const handleMenuView = (shareBoardArticle : ShareBoardArticle_, e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${location.pathname}/detail/${shareBoardArticle.id}`, {state : {shareBoardArticle : shareBoardArticle}});
    }

    const [limit                , setLimit]  = useState(10);
    const [page                 , setPage]   = useState(1);
    const [offset               , setOffset] = useState(0);
    
    let pageCnt = totalPages;

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
        setOffset(value - 1);
    };

    useEffect(() => {
        getShareBoardArticleList(offset, 10);
    }, [offset]);

    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={'5%'}>No</TableCell>
                            <TableCell width={'45%'}>Title</TableCell>
                            <TableCell width={'15%'}>작성자</TableCell>
                            <TableCell width={'25%'}>작성일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        shareBoardArticleList.slice(offset, offset+limit).map((shareBoardArticle, index) => (
                            <TableRow key={`${shareBoardArticle.id}_${shareBoardArticle.id}`}>
                                <TableCell>{index + offset + 1}</TableCell>
                                <TableCell><Button onClick={(e) => handleMenuView(shareBoardArticle as ShareBoardArticle_, e)}>{shareBoardArticle.title}</Button></TableCell>
                                <TableCell>{shareBoardArticle.createUser.nickname}</TableCell>
                                <TableCell>
                                    <Typography>{shareBoardArticle.createDate}</Typography>                                
                                </TableCell>
                            </TableRow>
                        ))
                    }                
                    </TableBody>    
                </Table>
            </TableContainer>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}} />
        </Box>    
    )
}

export default ShareNormalBoardArticleList;