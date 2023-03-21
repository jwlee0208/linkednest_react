import { useMemo, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelect } from "../../../store/index.hooks";
import { asyncUserUpdate, getUserInfo, User} from "../../../store/modules/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import { Box, FormControl, Grid } from "@mui/material";
import { getLayoutInfo } from "../../../store/modules/layout";
import {encode as base64_encode} from 'base-64';
import ReactQuill from 'react-quill';
import { useNavigate } from "react-router-dom";
import Parser from 'html-react-parser';

function Mypage() {
  // user info
  const userinfo = useAppSelect(getUserInfo);


  const [user, setUser] = useState<User>({
    username : ""
  , password : ""
  , introduce : ""
  , accessToken : ""
  , refreshToken : ""
  , isLogin : false
  , nickname : ""
  , email : ""
  , returnCode : 0
});
  /* const [user, setUser] = useState<User>({
      username : userinfo.username
    , password : ""
    , introduce : decodeURI(userinfo.introduce).replaceAll('\\"', '"')
    , accessToken : userinfo.accessToken
    , refreshToken : userinfo.refreshToken
    , isLogin : userinfo.isLogin
    , nickname : userinfo.nickname
    , email : userinfo.email
    , returnCode : 0
  }); */

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const layoutinfo = useAppSelect(getLayoutInfo);
 
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
    user.username = base64_encode(user.username);
    const res = dispatch(asyncUserUpdate(user));
    navigate(`/`);
  }

  const inputUsernameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    return false;
  }

  const inputNicknameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      return false;
  }

  const inputEmailVal = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      return false;
  }

  const inputIntroduceVal = (value : any) => {
      console.log('introduce : ' + Parser(value).toString()); 
      // setUser({...user, introduce : Parser(user.introduce).toString()}); // to-do : setState시 무한루프 발생 해결 요망
  }  

  useEffect(()=>{
    // quill editor
    const quillCss = document.createElement("link");
    quillCss.crossOrigin = '*';
    quillCss.rel = 'stylesheet';
    quillCss.type = "text/css";
    quillCss.href = `https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css`;
    
    document.head.appendChild(quillCss);
    
    setUser({
        ...user,       
        username : userinfo.username
      , password : ""
      , introduce : decodeURI(userinfo.introduce).replaceAll('\\"', '"')
      , accessToken : userinfo.accessToken
      , refreshToken : userinfo.refreshToken
      , isLogin : userinfo.isLogin
      , nickname : userinfo.nickname
      , email : userinfo.email
      , returnCode : 0
    });  
    
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
                      <TextField id="outlined-basic" name="username" label="User ID" variant="filled" color="success" 
                                onChange={inputUsernameVal} value={user.username} type="text" helperText="Please enter your ID"/> 
                  </FormControl>    
              </Grid>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="outlined-basic" name="email" label="Email" variant="filled" color="success" 
                                onChange={inputEmailVal} value={user.email} type="email" helperText="Please enter your Email"/> 
                  </FormControl>    
              </Grid>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField id="outlined-basic" name="nickname" label="Nickname" variant="filled" color="success" 
                                onChange={inputNicknameVal} value={user.nickname} type="text" helperText="Please enter your Nickname"/>
                  </FormControl>    
              </Grid>
              <Grid container item>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <ReactQuill onChange={(content, delta, source, editor) => inputIntroduceVal(editor.getHTML())} modules={modules} theme="snow" 
                          style={{minHeight: '250px',  width: '100%', borderBlockColor:'black', marginBottom: '50px'}} value={Parser(user.introduce).toString()}/>
                  
{/*                       <ReactQuill onChange={inputIntroduceVal} modules={modules} theme="snow" 
                          style={{minHeight: '250px',  width: '100%', borderBlockColor:'black', marginBottom: '50px'}} value={Parser(user.introduce).toString()}/>     */}
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
  