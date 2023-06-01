import { Box, Paper }                     from "@mui/material";
import { Navigate, Route, Router, Routes, useLocation, useParams } from "react-router";
import ArticleDetail               from "../../function/board/article/ArticleDetail";
import ArticleEdit                 from "../../function/board/article/ArticleEdit";
import ArticleList                 from "../../function/board/article/ArticleList";
import Home                        from "./Home";
import Mypage                      from "../../function/user/Mypage";
import Login                       from "../../function/user/Login";
import SignupForStepper            from "../../function/user/signup/SignupForStepper";
import { getReferrer } from ".";
import { useNavigate } from 'react-router-dom';

type ContentProps = {
    isLogin : boolean;
};

function Content ({
    isLogin
} : ContentProps ) {
    const params   = useParams();
    const location = useLocation();
    const pathArr  = location.pathname.split("/");
    const getContentId = () => {
      console.log('pathArr : ', pathArr);

      let pContentId = params.contentId
      if (pContentId === undefined) {

        return pathArr[1];
      }
      return pContentId;
    }

    function LoginNavigate () {
      let pathVal = window.location.href; //`/${getContentId()}`;
      if (isLogin === true) return <Navigate replace to={pathVal}/>
      return <Login refer={getReferrer()} isNeedRedirect={false}/>
    }

    function SignUpNavigate() {
      let pathVal = `/${getContentId()}`;
      if (isLogin === true) return <Navigate replace to={pathVal}/>
      return <SignupForStepper refer={getReferrer()}/>
    } 

    function MypageNavigate() {
      let pathVal = `/${getContentId()}/login`;
      if (isLogin === true) return <Mypage/>
      return <Navigate replace to={pathVal}/>

    }
    return (
      <Paper elevation={24} sx={{mt:3, mb:3, backgroundColor:'#ffffff', opacity:0.8 }}>
        <Routes>
          <Route path='/'                     element={<Home bannerHeight="480px"/>} />
          {/* <Route path='/signup'               element={<SignupForStepper />} /> */}
          {/* <Route path='/login'                element={<Login />} /> */}
          <Route path='/mypage'               element={<MypageNavigate/>} />
          <Route path='/:contentCode'         element={<Home bannerHeight="480px"/>} />
          <Route path='/:contentCode/mypage'  element={<MypageNavigate/>} />
          <Route path='/:contentCode/login'   element={<LoginNavigate/>} />
          <Route path='/:contentCode/signup'  element={<SignUpNavigate/>} />
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword"                      element={<ArticleList/>}/>
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword/write"                element={<ArticleEdit/>}/>
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword/edit/:boardArticleId" element={<ArticleEdit/>}/>        
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword/:boardArticleId"      element={<ArticleDetail/>}/>
        </Routes>
      </Paper>
    )
}

export default Content;