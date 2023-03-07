import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Mypage from './component/Mypage';
import Header from './component/Header';
import { useAppSelect } from './store/index.hooks';
import { getUserInfo } from './store/modules/user';



function App() {
  
  const userinfo = useAppSelect(getUserInfo);
  const isLogin = userinfo.isLogin;
  const accessToken = userinfo.accessToken; 
  const username = userinfo.username; 

  console.log('[App] isLogin : ' + isLogin + ", accessToken : " + accessToken + ", username : " + username);

  return (
    <BrowserRouter>
      <Header isLogin={isLogin} accessToken={accessToken} username={username} user={userinfo}/>
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
