import { useLocation, useNavigate } from "react-router";
import { useAppSelect } from "../../../store/index.hooks";
import { getUserInfo } from "../../../store/modules/user";
import { useEffect, useMemo, useState } from "react";
import { BoardArticle_, BoardCategory_, BoardList_, Board_, getContentBoardCategoryInfo } from "../../../store/modules/boardCategory";
import { Box, Breadcrumbs, Button, Divider, FormControl, FormLabel, Grid, InputLabel, Link, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import 'react-quill/dist/react-quill';
import { axiosInstance } from "../../..";
import Parser                                from 'html-react-parser';


function ArticleEdit() {

    const navigate = useNavigate();
    const userInfo = useAppSelect(getUserInfo);
    const boardCategoryInfo = useAppSelect(getContentBoardCategoryInfo);

    const location = useLocation();
    let   editType = 'create';
    if (location.state !== null) {
        editType = 'edit';
    }

    const [contentCode, setContentCode] = useState<string>('');
    const [boardCategoryKeyword, setBoardCategoryKeyword] = useState<string>('');
    const [boardKeyword, setBoardKeyword] = useState<string>('');

    const inputTitle = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('title : ', e.target.value);
        setBoardArticle_({...boardArticle_, title : e.target.value});
    }

    const inputContent = (value : any) => {
        setBoardArticle_({...boardArticle_, content : value});
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        let selectedBoardCategory = boardCategoryInfo.boardCategoryList.filter(boardCategory => (boardCategory.id === Number(event.target.value)))[0];
        setBoardCategory_(selectedBoardCategory);
        let boardList = selectedBoardCategory.boardList === null ? [] : selectedBoardCategory.boardList;
        setBoardList_(boardList);
    }

    const handleBoardChange = (event: SelectChangeEvent) => {
        setBoard_({...board_, id : Number(event.target.value)});
        setBoardArticle_({...boardArticle_, boardId : Number(event.target.value)});
    }

    const [boardCategory_, setBoardCategory_] = useState<BoardCategory_>({
        id                  : 0,
        contentId           : 0,
        contentCode         : '',
        boardCategoryName   : '',
        boardCategoryKeyword: '',
        boardCategoryCode   : '',
        boardCategoryDesc   : '',
        isActive            : '',
        boardList           : [],
    });

    const [boardList_, setBoardList_] = useState<BoardList_>([{
        id              : 0,
        boardCategoryId : 0,
        boardName       : '',
        boardKeyword    : '',
        boardCode       : '',
        isActive        : '',
        imagePath       : '',
        createDate      : '',
        updateDate      : '',
    }]);

    const [board_, setBoard_] = useState<Board_>({
        id              : 0,
        boardCategoryId : 0,
        boardName       : '',
        boardKeyword    : '',
        boardCode       : '',
        isActive        : '',
        imagePath       : '',
        createDate      : '',
        updateDate      : '', 
    });

    const [boardArticle_, setBoardArticle_] = useState<BoardArticle_>({
        id              : 0,
        boardId         : 0,
        title           : '',
        content         : '',
        imagePath       : '',
        isActive        : '',
        createUserNo    : 0,
        createUserId    : '',
        createDate      : '',
    });

    const saveArticle = (e: React.MouseEvent<HTMLElement>) => {
        boardArticle_.boardId = board_.id;
        saveBoardArticle()
            .then((res) => navigate(`/${contentCode}/${boardCategoryKeyword}/${boardKeyword}`))
            .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`));
    }

    async function saveBoardArticle () : Promise<BoardArticle_> {
        return await axiosInstance.post('/api/board/article', JSON.stringify({
            id : boardArticle_.id,
            title : boardArticle_.title,
            boardId : boardArticle_.boardId,
            content : boardArticle_.content,
        }));
    }

    const updateArticle = (e: React.MouseEvent<HTMLElement>) => {
        boardArticle_.boardId = board_.id;
        updateBoardArticle()
            .then((res) => navigate(`/${contentCode}/${boardCategoryKeyword}/${boardKeyword}`))
            .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`));
    }

    async function updateBoardArticle () : Promise<BoardArticle_> {
        return await axiosInstance.patch('/api/board/article',
            JSON.stringify({ 
                id      : boardArticle_.id,
                title   : boardArticle_.title,
                boardId : boardArticle_.boardId,
                content : boardArticle_.content,
             })
        );
    }

    const modules = useMemo(
        () => ({
            toolbar: { // 툴바에 넣을 기능
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                    ['link', 'image'],
                ],
            },
        }), []);

    const setupBoardCategoryDetail = (boardCategory : BoardCategory_, contentCode : string , boardCategoryKeyword : string, boardKeyword : string) => {
        setBoardCategory_(boardCategory);
        setBoardList_(boardCategory.boardList);
        let boardCode = `${contentCode}_${boardCategoryKeyword}_${boardKeyword}`;
        setBoard_(boardCategory.boardList.filter(boardObj => (boardObj.boardCode === boardCode))[0]);
    }

    const boardCategoryDetailCall = (contentCode : string , boardCategoryKeyword : string, boardKeyword : string) => {
        axiosInstance.get(`/api/board/category/detail/${contentCode}_${boardCategoryKeyword}`)
            .then((res) => setupBoardCategoryDetail(res.data, contentCode, boardCategoryKeyword, boardKeyword))
            .catch((err) => alert(`[${err.code}][${err.response.status}] ${err.message}`)  );       
    }

    const setupBreadcrumbs = () => {
        let contentCode          = '';
        let boardKeyword         = '';
        let boardCategoryKeyword = '';
        if (location.state !== null) {
            const boardArticleStateObj          = location.state.boardArticle;
            const boardCategoryKeywordStateVal  = location.state.boardCategoryKeyword;
            const boardKeywordStateVal          = location.state.boardKeyword;

            let isBoardCategoryExist = (boardCategoryInfo.contentCode !== '');
            if (isBoardCategoryExist) {
                let contentBoardCategory = boardCategoryInfo.boardCategoryList.filter(boardCategory => (boardCategory.boardCategoryKeyword === boardCategoryKeywordStateVal))[0];
                setBoardCategory_(contentBoardCategory);
                let selectedBoardInfo = contentBoardCategory.boardList.filter(boardObj => boardObj.boardKeyword === boardKeywordStateVal)[0];
                setBoard_(selectedBoardInfo);    
                
                contentCode          = contentBoardCategory.contentCode;
                boardCategoryKeyword = contentBoardCategory.boardCategoryKeyword;
                boardKeyword         = selectedBoardInfo.boardKeyword;
            }    
        } 

        console.log('boardCategory_ : ', boardCategory_);
        if (boardCategory_.id === 0) {
            let pathArr = location.pathname.split('/');
            if (pathArr.length > 3) {
                contentCode          = pathArr[1];
                boardCategoryKeyword = pathArr[2];
                boardKeyword         = pathArr[3];
            }
        }   
        boardCategoryDetailCall(contentCode, boardCategoryKeyword, boardKeyword);    

        setContentCode(contentCode);
        setBoardCategoryKeyword(boardCategoryKeyword);
        setBoardKeyword(boardKeyword);
    }  

    const setupEditor = () => {
        const quillCss = document.createElement("link");
        quillCss.crossOrigin    = '*';
        quillCss.rel            = 'stylesheet';
        quillCss.type           = "text/css";
        quillCss.href           = `https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css`;
            
        document.head.appendChild(quillCss);
        return () => {
          document.head.removeChild(quillCss);
        }
    }

    useEffect(()=>{
        setupBreadcrumbs();
        setupEditor();

        if (editType === 'edit') {
            const boardArticleStateObj = location.state.boardArticle;
            setBoardArticle_(boardArticleStateObj);
            boardArticle_.content = Parser(decodeURI(boardArticleStateObj.content).replaceAll('\\"', '"')).toString();
        } else if (editType === 'create') {
            setBoardArticle_({...boardArticle_, createUserNo : userInfo.userNo});            
        }    
    }, [boardCategoryKeyword, boardKeyword]);
    
    return (
        <Box sx={{p: 3}}>
            <Typography variant='h4'>{editType === 'create' ? 'Create' : 'Edit'} Article</Typography>
            <Divider/>
            <br/>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit">{contentCode}</Link>            
                <Link underline="hover" color="inherit">{boardCategoryKeyword}</Link>            
                <Link underline="hover" color="inherit">{boardKeyword}</Link>                            
                <Typography color="text.primary">{editType === 'create' ? 'write' : 'edit'}</Typography>
            </Breadcrumbs>
            <br/>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="boardCategorySelectLabel">Board Category</InputLabel>
                    <Select labelId="boardCategorySelectLabel"
                            id="boardCategory"
                            value={boardCategory_.id.toString()}
                            label="BoardCategory"
                            onChange={handleCategoryChange}>
                        <MenuItem value={'0'}>::: 선택 :::</MenuItem>        
                {
                    boardCategoryInfo.boardCategoryList.map(boardCategory => (
                        <MenuItem key={boardCategory.boardCategoryCode} value={boardCategory.id}>{boardCategory.boardCategoryName}</MenuItem>
                    ))
                }
                    </Select>
                </FormControl>
            </Grid>
            <Grid container item>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="boardSelectLabel">Board</InputLabel>
                    <Select labelId="boardSelectLabel"
                            id="Board"
                            value={board_.id.toString()}
                            label="Board"
                            onChange={handleBoardChange}>
                        <MenuItem value={'0'}>::: 선택 :::</MenuItem>        
                {
                    boardList_.map(board => (
                        <MenuItem key={`${board.boardCode}`} value={`${board.id}`}>{board.boardName}</MenuItem>
                    ))
                }
                    </Select>
                </FormControl>
            </Grid>

            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="title"  label="Title" variant="filled" color="success" onChange={inputTitle} value={boardArticle_.title} type="text" helperText="Please enter title" autoComplete="off"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Introduce</FormLabel>
                    <ReactQuill onChange={inputContent} modules={modules} theme="snow" style={{minHeight: '250px',  width: '100%', borderBlockColor:'black', marginBottom: '50px'}} value={boardArticle_.content}/>    
                </FormControl>
            </Grid>            
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1, align:'left',}}>
                    <Button variant="outlined" size="large" onClick={(editType === 'create') ? saveArticle : updateArticle}>Save</Button>
                </FormControl>
            </Grid>
        </Box>
    )
}

export default ArticleEdit;