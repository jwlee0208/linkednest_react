import { Paper } from "@mui/material";
import { Route, Routes } from "react-router";
import ShareMain from "../../../function/share/ShareMain";
import ShareUser from "./ShareUser";
import ShareBoardArticleDetail from "../../../function/share/ShareBoardArticleDetail";

function ShareContent () {
    return (
        <Paper elevation={24} sx={{mt:3, mb:3, backgroundColor:'#ffffff', opacity:0.8 }}>
            <Routes>
                <Route path='/share'                     element={<ShareMain/>} />
                <Route path='/share/:userId'             element={<ShareUser/>} />
                <Route path='/share/:userId/detail/:shareBoardArticleId' element={<ShareBoardArticleDetail/>}/>
            </Routes>
        </Paper>    
    )
}

export default ShareContent;