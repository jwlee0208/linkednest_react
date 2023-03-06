import React from "react";
import {Link, Routes, Route, BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';

type HeaderProps = {
    isLogin : Boolean;
    username : String;
    accessToken : String;
};

function Header({
    isLogin, 
    username, 
    accessToken
} : HeaderProps) {
    return (
        <header>
            <Link to="/"><button>Home<div></div></button></Link>
            {(isLogin === true) 
                ? 
                <Link to="/mypage"><button>My Page</button></Link>    
                : 
                <Link to="/login"><button>Login<div>{accessToken}</div></button></Link>
            }
        </header>    
    );
}

export default Header;