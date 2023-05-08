import { useMemo, useState, useEffect }      from "react";
import { encode as base64_encode }           from 'base-64';
import { useNavigate }                       from "react-router-dom";
import { Box, FormControl, Grid }            from "@mui/material";
import TextField                             from "@mui/material/TextField";
import Button                                from "@mui/material/Button"
import Parser                                from 'html-react-parser';
import ReactQuill                            from 'react-quill';
import { inputEmailVal, inputNicknameVal, inputUsernameVal } 
                                             from ".";
import { useAppDispatch, useAppSelect }      from "../../../store/index.hooks";
import { getLayoutInfo }                     from "../../../store/modules/layout";
import { User, asyncUserUpdate, getUserInfo }
                                             from "../../../store/modules/user";
import { getContentInfo }                    from "../../../store/modules/content";

function Mypage() {

  const navigate    = useNavigate();
  const dispatch    = useAppDispatch();
  const layoutInfo  = useAppSelect(getLayoutInfo);
  const userInfo    = useAppSelect(getUserInfo);
  const contentInfo = useAppSelect(getContentInfo);

  const [user, setUser] = useState<User>({
      userNo                : 0
    , userId                : userInfo.userId
    , password              : ""
    , introduce             : Parser(decodeURI(userInfo.introduce).replaceAll('\\"', '"')).toString() 
    , accessToken           : userInfo.accessToken
    , refreshToken          : userInfo.refreshToken
    , isLogin               : userInfo.isLogin
    , nickname              : userInfo.nickname
    , email                 : userInfo.email
    , returnCode            : 0
    , adminMenuCategoryList : []
    , userRoleInfoList      : []
    , roleInfoList          : []
    , birthday              : ''
    , sex                   : ''
    , phoneNo               : ''
    , additionalPhoneNo     : ''
    , address               : ''
    , detailAddress         : ''
    , zipcode               : 0
    , token                 : ''
    , userProfile             : {
      sex         : '',
      phoneNo     : '',
      birthday    : '',
  },
});

 
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
                ['blockquote', 'code-block'],
                ['link', 'image'],
            ],
        },
    }), []);

  const MypageAction = (e : React.FormEvent) => {
    e.preventDefault();
    user.userId = base64_encode(user.userId);
    dispatch(asyncUserUpdate(user));
    navigate(`/${contentInfo.contentCode}`);
  }


  const inputIntroduceVal = (value : any) => {
      // console.log('introduce : ' + value); 
      setUser({...user, introduce : value}); 
  }  

  useEffect(()=>{
    // quill editor
    const quillCss = document.createElement("link");
    quillCss.crossOrigin  = '*';
    quillCss.rel          = 'stylesheet';
    quillCss.type         = "text/css";
    quillCss.href         = `https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css`;
    
    document.head.appendChild(quillCss);
    
    return () => {
      document.head.removeChild(quillCss);
    }
  }, [user.introduce]);
  
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
      <div className="Mypage">
        <form onSubmit={MypageAction}>
          <Grid container>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="outlined-basic" name="userId" label="User ID" variant="filled" color="success" 
                                onChange={inputUsernameVal} value={user.userId} type="text" helperText="Please enter your ID" disabled/> 
                  </FormControl>    
              </Grid>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="outlined-basic" name="email" label="Email" variant="filled" color="success" 
                                onChange={inputEmailVal} value={user.email} type="email" helperText="Please enter your Email" disabled/> 
                  </FormControl>    
              </Grid>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="outlined-basic" name="nickname" label="Nickname" variant="filled" color="success" 
                                onChange={inputNicknameVal} value={user.nickname} type="text" helperText="Please enter your Nickname" disabled/>
                  </FormControl>    
              </Grid>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                     <ReactQuill onChange={(content, delta, source, editor) => inputIntroduceVal(editor.getHTML())} modules={modules} theme="snow" 
                          style={{minHeight: '250px',  width: '100%', borderBlockColor:'black', marginBottom: '50px'}} value={user.introduce}/>                  
                  </FormControl>
              </Grid>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                      <Button type="submit" variant="outlined" size="large">Update</Button>
                  </FormControl>
              </Grid>
          </Grid>    
        </form>
      </div>
    </Box>
  );
}
  
export default Mypage;
  