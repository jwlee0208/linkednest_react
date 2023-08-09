import { useEffect, useState } from "react";
import { ShareBoardArticleList_, ShareBoardArticle_, getShareInfo } from "../../../store/modules/share";
import { Box, Breadcrumbs, Button, Divider, Link, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../..";
import { useAppSelect } from "../../../store/index.hooks";

function ShareNormalBoardArticleList () {
    const location              = useLocation();
    const navigate              = useNavigate();
    const params                = useParams();
    const shareBoardId          = params.shareBoardId;
    const shareBoardCategoryId  = params.shareBoardCategoryId;
    const shareUserId           = params.userId;
    const shareInfo             = useAppSelect(getShareInfo);
    const pathArr               = location.pathname.split("/");
    const boardType             = (location.state !== null) ? location.state.boardType : null;
    const [limit                , setLimit]  = useState(10);
    const [page                 , setPage]   = useState(1);
    const [offset               , setOffset] = useState(0);
    const [totalPages           , setTotalPages]            = useState(0);
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

    const getShareBoardArticleList = (page  : number, limit  : number) => {
        axiosInstance.post('/api/share/board/article/list',
            JSON.stringify({
                shareBoardCategoryId : shareBoardCategoryId,
                shareBoardId         : shareBoardId,
                shareUserId          : shareUserId,
                offset               : (page - 1) * limit,
                limit                : limit,
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
        navigate(`/share/${shareUserId}/${shareBoardCategoryId}/${shareBoardArticle.shareBoard.id}/${shareBoardArticle.id}`, {state : {shareBoardArticle : shareBoardArticle}});
    }

    let pageCnt = totalPages;

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault();
        setPage(value);
    };

    const viewShareBoardArticleList = (shareBoardArticleList  : ShareBoardArticleList_) => {
        switch(shareBoardArticleList) {
            case null : 
                return <>No Content</>
            default : 
                return (
                    shareBoardArticleList.slice(offset, offset+limit).map((shareBoardArticle, index) => (
                        <TableRow key={`${shareBoardArticle.id}_${shareBoardArticle.id}`}>
                            <TableCell>{index + offset + 1}</TableCell>
                            <TableCell><Button onClick={(e) => handleMenuView(shareBoardArticle as ShareBoardArticle_, e)} sx={{textAlign:'left'}}>{shareBoardArticle.title}</Button></TableCell>
                            <TableCell>{shareBoardArticle.createUser.nickname}</TableCell>
                            <TableCell>
                                <Typography>{shareBoardArticle.createDate}</Typography>                                
                            </TableCell>
                        </TableRow>
                    ))
                )
        }
    }

    useEffect(() => {
        getShareBoardArticleList(page, 10);
    }, [page, shareUserId, shareBoardCategoryId, shareBoardId]);

    return (
        <Box sx={{p : 2}}>
            <Typography variant="h4">List</Typography>
            <Divider/>
            <Breadcrumbs aria-label="breadcrumb" sx={{pt:2, pb:2}} separator=">">
                <Link underline="hover" color="inherit">{pathArr[1].toUpperCase()}</Link>            
                <Link underline="hover" color="inherit">{shareInfo.shareName.toUpperCase()}</Link>   
                <Typography color="text.primary">LIST</Typography>
            </Breadcrumbs>           
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
                    {viewShareBoardArticleList(shareBoardArticleList)}                
                    </TableBody>    
                </Table>
            </TableContainer>
            <Pagination count={pageCnt} shape="rounded" onChange={handleChange} sx={{p:2, justifyContent:"center", display: "flex"}} />
        </Box>    
    )
}

export default ShareNormalBoardArticleList;