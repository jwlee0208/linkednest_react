import { Box, Button } from '@mui/material';
import {Editor} from '@tinymce/tinymce-react'
import { useEffect, useRef, useState } from 'react';
import { ShareBoardArticle_ } from '../../../store/modules/share';

type ShareRegistProps = {
    boardId : number;
    height : number;
}
function ShareRegist({boardId, height} : ShareRegistProps) {
    const editorRef = useRef({});
    const [content, setContent] = useState('');
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

    const registContent = () => {
        shareBoardArticle.content = content;
        shareBoardArticle.filePath = '';
        shareBoardArticle.originalFilePath = '';
        shareBoardArticle.title = '';
        shareBoardArticle.shareBoard.id = boardId;
        console.log(`shareBoardArticle : ${JSON.stringify(shareBoardArticle)}`);
        //to-do : call api for content registration

    }

    useEffect(() => {
        console.log(`share content : ${content}`);
    }, [content]);

    return (
        <Box sx={{p:2}}>
            <Editor 
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                height: height,
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
        </Box>
    )
}

export default ShareRegist;