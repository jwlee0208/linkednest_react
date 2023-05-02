import { Navigate, Route, Routes }    from "react-router";
import SignupForStepper               from "../user/signup/SignupForStepper";
import Login                          from "../user/Login";
import Mypage                         from "../user/Mypage";
import Home                           from "./Home";
import { Box, Fab } from "@mui/material";
import ArticleList from "../board/ArticleList";
import ArticleDetail from "../board/ArticleDetail";
import ArticleEdit from "../board/ArticleEdit";

type ContentProps = {
    isLogin : boolean;
};

function Content ({
    isLogin
} : ContentProps ) {

console.log('Content >>>');

    return (
      <Box>
        <Routes>
          <Route path='/'                    element={<Home bannerHeight="480px"/>} />
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