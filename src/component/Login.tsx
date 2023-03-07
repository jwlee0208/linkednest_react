import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { asyncLogin, User } from "../store/modules/user";
import { useAppDispatch } from "../store/index.hooks";
import axios from "axios";

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
            <div>
                <label htmlFor="username">Email : </label>
                <input type="email" id="username" onChange={inputUsernameVal} value={user.username}/>
            </div>
            <div>
                <label htmlFor="password">Password : </label>
                <input type="password" id="password" onChange={inputPwVal} value={user.password}/>
            </div>
            <div>
                <button type="submit" disabled={loading}>Login</button>        
            </div>
        </form>
      </div>
    );
  }
  export default Login;
  