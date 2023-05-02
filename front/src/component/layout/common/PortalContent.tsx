import { Navigate, Route, Routes }    from "react-router";
import SignupForStepper               from "../user/signup/SignupForStepper";
import Login                          from "../user/Login";
import Mypage                         from "../user/Mypage";
import Home                           from "./Home";
import { Box, Fab } from "@mui/material";
import ArticleList from "../board/ArticleList";
import ArticleDetail from "../board/ArticleDetail";
import ArticleEdit from "../board/ArticleEdit";
import CategoryInfoContentList from "../main/CategoryInfoContentList";
import { ContentCategory_, ContentList_ } from "../../../store/modules/content";
import PortalBanner from "../main/banner/PortalBanner";

type PortalContentProps = {
    isLogin : boolean;
    contentList : ContentList_;
    contentCategory : ContentCategory_;
};

function PortalContent ({
    isLogin, contentList, contentCategory
} : PortalContentProps ) {

    return (
      <Box>
        <Routes>
          <Route path='/'                    element={<PortalBanner contentList={contentList}/>} />
          <Route path='/:contentCode'        element={<PortalBanner contentList={contentList}/>} />
          <Route path='/:contentCode/mypage' element={isLogin === true ? <Mypage /> : <Navigate replace to="/:contentCode/login"/>} />
          <Route path='/:contentCode/login'  element={<Login />} />
          <Route path='/:contentCode/signup' element={<SignupForStepper />} />
          <Route path='/:contentCode/category/detail' element={<CategoryInfoContentList contentCategory={contentCategory}/>} />
        </Routes>
      </Box>
    )
}

export default PortalContent;