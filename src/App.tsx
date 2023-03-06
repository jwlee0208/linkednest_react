import React, { Component } from 'react';
import {Link, Routes, Route, BrowserRouter} from 'react-router-dom';
import { useSelector} from "react-redux";
// import {RootState} from './reducer';
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Mypage from './component/Mypage';
import Header from './component/Header';
import { RootState } from './reducer';
import { useAppSelect } from './store/index.hooks';
import { getUserInfo } from './reducer/userSlice';


 function App() {
  
  // const user = useSelector((state) => state.userSlice);
  // console.log('user : ' + user.isLogin);
  // user.accessToken;
  
  const userinfo = useAppSelect(getUserInfo);
  const isLogin = userinfo.isLogin;
  const accessToken = userinfo.accessToken; //useSelector((state : RootState) => state.userSlice.accessToken);
  const username = userinfo.username; //useSelector((state : RootState) => state.userSlice.username);

  
  // useSelector(((state) => state.user.username);
  console.log('[App] isLogin : ' + isLogin + ", accessToken : " + accessToken + ", username : " + username);

  return (
    <BrowserRouter>
      <Header isLogin={isLogin} accessToken={accessToken} username={username}/>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>    
  );
}

export default App;
