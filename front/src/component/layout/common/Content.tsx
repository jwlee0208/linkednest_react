import { Box }                     from "@mui/material";
import { Navigate, Route, Routes } from "react-router";
import ArticleDetail               from "../../function/board/article/ArticleDetail";
import ArticleEdit                 from "../../function/board/article/ArticleEdit";
import ArticleList                 from "../../function/board/article/ArticleList";
import Home                        from "./Home";
import Mypage                      from "../../function/user/Mypage";
import Login                       from "../../function/user/Login";
import SignupForStepper            from "../../function/user/signup/SignupForStepper";

type ContentProps = {
    isLogin : boolean;
};

function Content ({
    isLogin
} : ContentProps ) {

    return (
      <Box>
        <Routes>
          <Route path='/'                    element={<Home bannerHeight="480px"/>} />
          <Route path='/signup' element={<SignupForStepper />} />
          <Route path='/login'  element={<Login />} />
          <Route path='/mypage' element={isLogin === true ? <Mypage /> : <Navigate replace to="/:contentCode/login"/>} />
          <Route path='/:contentCode'        element={<Home bannerHeight="480px"/>} />
          <Route path='/:contentCode/mypage' element={isLogin === true ? <Mypage /> : <Navigate replace to="/:contentCode/login"/>} />
          <Route path='/:contentCode/login'  element={<Login />} />
          <Route path='/:contentCode/signup' element={<SignupForStepper />} />
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword" element={<ArticleList/>}/>
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword/write" element={<ArticleEdit/>}/>
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword/edit/:boardArticleId" element={<ArticleEdit/>}/>        
          <Route path="/:contentCode/:boardCategoryKeyword/:boardKeyword/:boardArticleId" element={<ArticleDetail/>}/>
        </Routes>
      </Box>
    )
}

export default Content;