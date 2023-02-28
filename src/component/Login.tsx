import React, {useState, useEffect, useCallback} from "react";
import {useDispatch} from "react-redux";
import { loginUser } from "../store/userSlice.js";
import {useNavigate} from "react-router-dom";

import axios from "axios";


function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const inputIdVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('id : ' + e.target.value);
        setId(e.target.value);
    }

    const inputPwVal = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        console.log('password : ' + e.target.value);
        setPassword(e.target.value);
    }


    const LoginAction = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!id) {
            return alert('ID를 입력하세요.');
        } else if (!password) {
            return alert('Password를 입력하세요.');
        }

        let body = {
           username : id
         , password : password
        }
        await axios.post("/login", body).then((res) => {
            if (res.status === 200) {
                if(res.data.returnCode === '10000') {
                    const { accessToken } = res.data.token;
                    // console.log('res.data : ' + res.data.token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ${accessToken}';
                    dispatch(loginUser(res.data));
                    setMsg("로그인되었습니다.");    
                    navigate("/");
                } else {
                    setMsg("로그인 실패하였습니다.");
                }
            }
        })
        setLoading(true);
    }

    useEffect(()=>{

    }, [msg]);


    return (
      <div className="Login">
        <h2>::: Login :::</h2>
        <hr/>    
        <form onSubmit={LoginAction}>
            <div>
                <label htmlFor="email">Email : </label>
                <input type="email" id="email" onChange={inputIdVal} value={id}/>
            </div>
            <div>
                <label htmlFor="password">Password : </label>
                <input type="password" id="password" onChange={inputPwVal} value={password}/>
            </div>
            <div>
                <button type="submit">Login</button>        
            </div>
        </form>
      </div>
    );
  }



  export default Login;
  