import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { asyncLogin, asyncSignUp, User } from "../../../store/modules/user";
import { useAppDispatch, useAppSelect } from "../../../store/index.hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import { Box, FormControl, Grid } from "@mui/material";
import { getLayoutInfo } from "../../../store/modules/layout";
import {encode as base64_encode} from 'base-64';

function SignUp() {

    const navigate = useNavigate();
    const layoutinfo = useAppSelect(getLayoutInfo);

    const [user, setUser] = useState<User>({username : "", password : "", accessToken : "", isLogin : false, nickname : "", email : "", returnCode : 0});

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

    const inputNicknameVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('nickname : ' + e.target.value);        
        setUser({...user, nickname : e.target.value});
    }

    const inputEmailVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log('email : ' + e.target.value);        
        setUser({...user, email : e.target.value});
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
        console.log('[signup] after encode : ' + JSON.stringify(user));

        const res = dispatch(asyncSignUp(user));
        console.log('[signup] res : ' + JSON.stringify(res.arg));
        navigate(`/${layoutinfo.typeId}`);
    }

    useEffect(()=>{
    }, []);

    return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>  
      <div className="SignUp">
        <form onSubmit={SignupAction}>
        <Grid container>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="User ID" variant="filled" color="success" onChange={inputUsernameVal} value={user.username} type="text" helperText="Please enter your ID"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password" helperText="Please enter your password"/>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Email" variant="filled" color="success" onChange={inputEmailVal} value={user.email} type="email" helperText="Please enter your Email"/> 
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField id="outlined-basic" label="Nickname" variant="filled" color="success" onChange={inputNicknameVal} value={user.nickname} type="text" helperText="Please enter your Nickname"/>
                </FormControl>    
            </Grid>
            <Grid container item>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button type="submit" variant="outlined" size="large">Login</Button>
                </FormControl>
            </Grid>
        </Grid>    
        </form>
      </div>
      </Box>
    );
  }
  export default SignUp;
  