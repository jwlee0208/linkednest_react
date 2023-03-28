import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { asyncLogin, User } from "../../../store/modules/user";
import { useAppDispatch, useAppSelect } from "../../../store/index.hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import { Box, FormControl, Grid } from "@mui/material";
import { getLayoutInfo } from "../../../store/modules/layout";
import {encode as base64_encode} from 'base-64';

function Login() {

    const navigate = useNavigate();
    const layoutinfo = useAppSelect(getLayoutInfo);

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
        , adminMenuCategoryList : []
        , userRoleDtoList : []});
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const inputUsernameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('username : ' + e.target.value);
        
        setUser({...user, username : e.target.value});
    }

    const inputPwVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('password : ' + e.target.value);
        setUser({...user, password : e.target.value});
    }

    const dispatch = useAppDispatch();

    const LoginAction = (e : React.FormEvent) => {
        e.preventDefault();
        if (!user.username) {
            return alert('ID를 입력하세요.');
        } else if (!user.password) {
            return alert('Password를 입력하세요.');
        }

        user.username = base64_encode(user.username);
        user.password = base64_encode(user.password);    
        console.log('[login] before : ' + JSON.stringify(user));        

        const res = dispatch(asyncLogin(user));
        // setUser({...user, user.isLogin : true, user.accessToken : 'asdf'});
        // dispatch({type : 'LOGIN_USER', payload: user});
        console.log('[login] res : ' + JSON.stringify(res.arg));

        setMsg("로그인 성공하였습니다.");
        navigate(`/${layoutinfo.typeId}`);
        setLoading(true);
    }

    useEffect(()=>{
        if (msg) {
            setTimeout(() => {
                setMsg("");
                setLoading(false);
            }, 1500);
        }
    }, [msg]);

    return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
      <div className="Login">
        <form onSubmit={LoginAction}>
        <Grid container>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Email" variant="filled" color="success" onChange={inputUsernameVal} value={user.username} type="text" helperText="Please enter your Email"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password" helperText="Please enter your password"/>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button type="submit" variant="outlined" size="large" disabled={loading}>Login</Button>
                </FormControl>
            </Grid>
        </Grid>    
        </form>
      </div>
      </Box>
    );
  }
  export default Login;
  