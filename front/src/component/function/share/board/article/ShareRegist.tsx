import { Box, Button, Collapse, FormControl, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } 
                                        from '@mui/material';
import {Editor}                         from '@tinymce/tinymce-react'
import { useEffect, useRef, useState }  from 'react';
import { ShareBoardArticle_, ShareBoardCategoryList_, ShareBoardList_, getShareInfo }           from '../../../../../store/modules/share'; 
import { axiosInstance } from '../../../../..';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useAppSelect } from '../../../../../store/index.hooks';

type ShareRegistProps = {
    boardId : number;
    height  : number;
}
function ShareRegist({boardId, height} : ShareRegistProps) {
    const editorRef = useRef({});
    const [content, setContent] = useState('');
    const [shareBoardId, setShareBoardId] = useState(0);
    const [shareBoardArticle, setShareBoardArticle] = useState<ShareBoardArticle_>({
        id              : 0,
        title           : '',
        content         : '',
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
        createDate      : '',
        filePath        : '',
        originalFilePath: '',
        status          : 0,
        shareBoard      : {
            id                  : 0,
            boardName           : '',
            boardType           : '',
            createUserId        : '',
            createDate          : '',
            modifyUserId        : '',
            modifyDate          : '',
        },
    });
    const [shareBoardCategoryList, setShareBoardCategoryList] = useState<ShareBoardCategoryList_>([{
        id                  : 0,
        boardCategoryName   : '',
        createUserId        : '',
        createDate          : '',
        share               : {
            id              : 0,
            shareName       : '',
            shareType       : '',
            introduce       : '',
            createUserId    : '',
            createDate      : '',
            shareBoardCategoryList : [], 
            returnCode      : 0,
            returnMsg       : '',
        },
        shareBoardList      : [],    
    }]);
    const [shareBoardList, setShareBoardList] = useState<ShareBoardList_>([{
        id                  : 0,
        boardName           : '',
        boardType           : '',
        createUserId        : '',
        createDate          : '',
        modifyUserId        : '',
        modifyDate          : '',    
    }]);
    const [open, setOpen] = useState(true);
    const handleClick = () => {
      setOpen(!open);
    };

    const shareInfo = useAppSelect(getShareInfo);
    const registContent = () => {
        shareBoardArticle.content           = content;
        shareBoardArticle.filePath          = '';
        shareBoardArticle.originalFilePath  = '';
        shareBoardArticle.shareBoard.id     = boardId;
        console.log(`shareBoardArticle : ${JSON.stringify(shareBoardArticle)}`);
        if  (boardId == null) {
            alert('게시판이 선택되지 않았습니다.');
            return false;
        }
        //to-do : call api for content registration
        axiosInstance.post(`/api/share/board/article`
            , JSON.stringify({
                title            : shareBoardArticle.title,
                content          : content,
                shareBoardId     : shareBoardId,
                filePath         : shareBoardArticle.filePath,
                originalFilePath : shareBoardArticle.originalFilePath,
            })
        ).then((res) => {
            if (res.status === 200 && res.data.returnCode === 10000) {
                window.location.reload();
            } else {
                alert(`[CODE : ${res.data.returnCode}] error occurred : ${res.data.returnMsg}`);
                return false;
            }   
        }).catch(err => {
            alert(`${JSON.stringify(err)}`);
        });
    }

    const inputCommonVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        console.log(`inputCommonVal > name : ${name}, value : ${value}`);
        setShareBoardArticle({...shareBoardArticle, [name] : value});
    }

    useEffect(() => {
        console.log(`share content : ${content}, boardId : ${Number.isNaN(boardId)}`);
        if (boardId === null || Number.isNaN(boardId)) {
            // alert(`${shareInfo.shareBoardCategoryList}`);
            setShareBoardCategoryList(shareInfo.shareBoardCategoryList);
        } else {
            setShareBoardId(Number(boardId))
        }
    }, [shareBoardCategoryList]);


    const handleBoardChange = (event: SelectChangeEvent) => {
        setShareBoardId(Number(event.target.value));
        shareBoardArticle.shareBoard.id = Number(event.target.value);
    }

    const handleBoardCategoryChange = (event: SelectChangeEvent) => {
        console.log(`selected cat val : ${event.target.value}`);
        shareBoardCategoryList.filter(shareBoardCategory => shareBoardCategory.id === Number(event.target.value))
            .forEach(shareBoardCategory => {
                console.log(`category > shareBoardList : ${JSON.stringify(shareBoardCategory)}`);
                setShareBoardList(shareBoardCategory.shareBoardList);
        });
        console.log(`shareBoardList : ${JSON.stringify(shareBoardList)}`);
    }

    const viewSelectBoxArea = () => {
        switch (shareBoardId) {
            case 0: return (
                <>
                <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Select labelId="shareBoardCatSelectLabel"
                        id="shareBoardCategory"
                        value={`${shareBoardArticle.shareBoard.id}`}
                        label="Category"
                        onChange={handleBoardCategoryChange}>
                        <MenuItem value={'0'}>::: 선택 :::</MenuItem>    
                    {
                        shareBoardCategoryList.map((shareBoardCategory) => (
                            <MenuItem value={shareBoardCategory.id}>{shareBoardCategory.boardCategoryName}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>            
            </Grid>

            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Select labelId="shareBoardSelectLabel"
                        id="shareBoard"
                        value={`${shareBoardArticle.shareBoard.id}`}
                        label="Board"
                        onChange={handleBoardChange}>
                        <MenuItem value={'0'}>::: 선택 :::</MenuItem>    
                    {
                        shareBoardList.map((shareBoard) => (
                            <MenuItem value={shareBoard.id}>{shareBoard.boardName}</MenuItem>
                        ))
                    }    
                    </Select>
                </FormControl>            
            </Grid>
            </>
            )
            default : return <></>
        }
    }

    return (
        <>
            <Typography  variant='h4' sx={{p:1}}  onClick={handleClick}>{open ? <ExpandLess /> : <ExpandMore />}Share your thinking</Typography>
            <Box sx={{p:2}}>
                <Collapse in={open} timeout={'auto'} unmountOnExit>                            
                    {viewSelectBoxArea()}
                    
                    <Grid container item>
                        <FormControl fullWidth sx={{  }}>
                            <TextField id="title" 
                                        name="title"
                                        label="Title"
                                        variant="filled"
                                        color="success"
                                        onChange={inputCommonVal}
                                        value={shareBoardArticle.title}
                                        type="text"
                                        helperText="Would you share your story?"
                                        autoComplete="off"/>
                        </FormControl>    
                    </Grid>
                    <Editor 
                            id='content'
                            textareaName='content'
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                            height: height,
                            skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
                            content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'),
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | image | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'}}
                            onEditorChange={setContent}
                    />                
                    <Button size="large" variant="contained" fullWidth color='primary' sx={{marginTop:2}} onClick={registContent}>Regist</Button>
                </Collapse>        
            </Box>
        </>
    )
}

export default ShareRegist;