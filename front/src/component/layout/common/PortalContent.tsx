import { Box }                      from "@mui/material";
import { Navigate, Route, Routes }  from "react-router";
import { ContentList_ }             from "../../../store/modules/content";
import { ContentCategory_ }         from "../../../store/modules/contentCategory";
import Mypage                       from "../../function/user/Mypage";
import Login                        from "../../function/user/Login";
import SignupForStepper             from "../../function/user/signup/SignupForStepper";
import PortalBanner                 from "../../function/main/portal/PortalBanner";
import CategoryInfoContentList      from "../../function/main/portal/CategoryInfoContentList";
import { getReferrer } from ".";
import PortalLogin from "../../function/user/signin/PortalLogin";

type PortalContentProps = {
    isLogin         : boolean;
    contentList     : ContentList_;
    contentCategory : ContentCategory_;
};

function PortalContent ({
      isLogin
    , contentList
    , contentCategory
} : PortalContentProps ) {

    const getMyPage = () => {
      if (isLogin === true) {
        return <Mypage />
      }
      return <Navigate replace to="/:contentCode/login"/>
    }

    return (
      <Box>
        <Routes>
          <Route path='/'                    element={<PortalBanner contentList={contentList}/>} />
          <Route path='/login'               element={<PortalLogin refer={getReferrer()}/>} />
          <Route path='/signup'              element={<SignupForStepper refer={getReferrer()}/>} />
          <Route path='/:contentCode'        element={<PortalBanner contentList={contentList}/>} />
          <Route path='/:contentCode/mypage' element={getMyPage()} />
          <Route path='/:contentCode/login'  element={<PortalLogin refer={getReferrer()}/>} />
          <Route path='/:contentCode/signup' element={<SignupForStepper refer={getReferrer()}/>} />
          <Route path='/:contentCode/category/detail' element={<CategoryInfoContentList contentCategory={contentCategory}/>} />
        </Routes>
      </Box>
    )
}

export default PortalContent;