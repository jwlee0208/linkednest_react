import { Box }                              from "@mui/material";
import { Navigate, Route, Routes }          from "react-router";
import { ContentList_ }                     from "../../store/modules/content";
import { ContentCategory_ }                 from "../../store/modules/contentCategory";
import CategoryInfoContentList              from "../main/portal/CategoryInfoContentList";
import PortalBanner                         from "../main/portal/PortalBanner";
import Login                                from "../user/Login";
import Mypage                               from "../user/Mypage";
import SignupForStepper                     from "../user/signup/SignupForStepper";

type PortalContentProps = {
    isLogin         : boolean;
    contentList     : ContentList_;
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