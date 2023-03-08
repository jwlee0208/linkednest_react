import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { asyncLogin, User } from "../store/modules/user";
import { useAppDispatch } from "../store/index.hooks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import { Grid } from "@mui/material";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState<User>({username : "", password : "", isLogin : false, accessToken : ""});

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

        const res = dispatch(asyncLogin(user));
        // setUser({...user, user.isLogin : true, user.accessToken : 'asdf'});
        // dispatch({type : 'LOGIN_USER', payload: user});
        console.log('[login] res : ' + JSON.stringify(res.arg));

        setMsg("로그인 성공하였습니다.");
        navigate("/");
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
      <div className="Login">
        <h2>::: Login :::</h2>
        <hr/>    
        <form onSubmit={LoginAction}>
        <Grid container spacing={3}>
            <Grid container item>
                <TextField id="outlined-basic" label="Email" variant="filled" color="success" onChange={inputUsernameVal} value={user.username} type="email"/> 
            </Grid>
            <Grid container item>
                <TextField id="outlined-basic" label="Password" variant="filled" color="success" onChange={inputPwVal} value={user.password} type="password"/>
            </Grid>
            <Grid container item>
                <Button type="submit" disabled={loading} >Login</Button>
            </Grid>
        </Grid>    
        </form>
      </div>
    );
  }
  export default Login;
  