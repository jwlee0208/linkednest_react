import React, { FormEvent, useState } from "react";
import {Link, Routes, Route, BrowserRouter, Navigate, useNavigate} from 'react-router-dom';
import logo from './logo.svg';
// import { logout, User} from "../store/modules/user";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../store/index.hooks";
import { asyncLogout, User } from "../store/modules/user";


type HeaderProps = {
    user : User,
    isLogin : Boolean;
    username : String;
    accessToken : String;
};


function Header({
    user,
    isLogin, 
    username, 
    accessToken
} : HeaderProps) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
 
    const handleLogout = (e : FormEvent) => {
        e.preventDefault();
        dispatch(asyncLogout(user));
        navigate("/");
    }    

    return (
        <header>
            <Link to="/"><button>Home<div></div></button></Link>
            {(isLogin === true) 
                ? (
                    <><Link to="/mypage"><button>My Page</button></Link><button onClick={handleLogout}>Logout</button></>    
                )
                : 
                <Link to="/login"><button>Login<div>{accessToken}</div></button></Link>
            }
        </header>    
    );
}

export default Header;