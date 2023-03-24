import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { asyncSignUp, User } from "../../../store/modules/user";
import { getLayoutInfo } from "../../../store/modules/layout";
import { encode as base64_encode } from 'base-64';
import { useAppDispatch, useAppSelect } from "../../../store/index.hooks";
import { Box, FormControl, Grid } from "@mui/material";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField";
import ReactQuill from 'react-quill';
import 'react-quill/dist/react-quill';

function SignUp() {

    const navigate = useNavigate();
    const layoutInfo = useAppSelect(getLayoutInfo);
    const [user, setUser] = useState<User>({
          username : ""
        , password : ""
        , introduce : ""
        , accessToken : ""
        , refreshToken : ''
        , isLogin : false
        , nickname : ""
        , email : ""
        , returnCode : 0
        , authorities : JSON
    });

    const inputUsernameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // console.log('username : ' + e.target.value);        
        setUser({...user, username : e.target.value});
    }

    const inputPwVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // console.log('password : ' + e.target.value);
        setUser({...user, password : e.target.value});
    }

    const inputNicknameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // console.log('nickname : ' + e.target.value);        
        setUser({...user, nickname : e.target.value});
    }

    const inputEmailVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        // console.log('email : ' + e.target.value);        
        setUser({...user, email : e.target.value});
    }

    function inputIntroduceVal (value : any) {
        // console.log('introduce : ' + value);        
        setUser({...user, introduce : value});
    }
    
    const dispatch = useAppDispatch();

    const SignupAction = (e : React.FormEvent) => {
        e.preventDefault();
        if (!user.username) {
            return alert('ID를 입력하세요.');
        } else if (!user.password) {
            return alert('Password를 입력하세요.');
        } else if (!user.email) {
            return alert('Email을 입력하세요.');
        } else if (!user.nickname) {
            return alert('Nickname을 입력하세요.');
        }

        console.log('[signup] before encode : ' + JSON.stringify(user));

        user.username = base64_encode(user.username);
        user.password = base64_encode(user.password);        
        // console.log('[signup] after encode : ' + JSON.stringify(user));

        const res = dispatch(asyncSignUp(user));
        // console.log('[signup] res : ' + JSON.stringify(res.arg));
        navigate(`/${layoutInfo.typeId !== '' ? layoutInfo.typeId : '/'}`);
    }

    useEffect(()=>{
        const quillCss = document.createElement("link");
        quillCss.crossOrigin = '*';
        quillCss.rel = 'stylesheet';
        quillCss.type = "text/css";
        quillCss.href = `https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css`;
        
        document.head.appendChild(quillCss);
  
        return () => {
          document.head.removeChild(quillCss);
        }
    }, []);

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


    return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
      <div className="SignUp">
        <form onSubmit={SignupAction}>
        <Grid container>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="username"  label="User ID" variant="filled" color="success" onChange={inputUsernameVal} value={user.username} type="text" helperText="Please enter your ID"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="password" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password" helperText="Please enter your password"/>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="email" label="Email" variant="filled" color="success" onChange={inputEmailVal} value={user.email} type="email" helperText="Please enter your Email"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" name="nickname" label="Nickname" variant="filled" color="success" onChange={inputNicknameVal} value={user.nickname} type="text" helperText="Please enter your Nickname"/>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <ReactQuill onChange={inputIntroduceVal} modules={modules} theme="snow" style={{minHeight: '250px',  width: '100%', borderBlockColor:'black', marginBottom: '50px'}} value={user.introduce}/>    
                </FormControl>
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button type="submit" variant="outlined" size="large">Sign Up</Button>
                </FormControl>
            </Grid>
        </Grid>    
        </form>
      </div>
      </Box>
    );
  }
  export default SignUp;
  