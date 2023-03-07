import React, { FormEvent } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useAppDispatch } from "../../store/index.hooks";
import { asyncLogout, User } from "../../store/modules/user";
import logo from './logo.svg';
import Button from '@mui/material/Button';

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
            <Link to="/"><Button variant="text">Home<div></div></Button></Link>
            {(isLogin === true) 
                ? (
                    <><Link to="/mypage"><Button variant="text" >My Page</Button></Link><Button variant="text" onClick={handleLogout}>Logout</Button></>    
                )
                : 
                <Link to="/login"><Button variant="text">Login<div>{accessToken}</div></Button></Link>
            }
        </header>    
    );
}

export default Header;