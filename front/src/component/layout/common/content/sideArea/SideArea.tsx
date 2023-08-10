import { Box, Button, Paper }           from "@mui/material";
import { useLocation, useNavigate }                  from "react-router";
import { User, asyncLogout }            from "../../../../../store/modules/user";
import { useAppDispatch, useAppSelect } from "../../../../../store/index.hooks";
import { getLayoutInfo }                from "../../../../../store/modules/layout";
import SideFloatingButtons              from "./SideFloatingButtons";
import Login                            from "../../../../function/user/Login";
import { useEffect } from "react";
import SideAreaBottom from "./SideAreaBottom";
import SideAreaMId from "./SideAreaMid";

type SideAreaProps = {
    user        : User,
    isLogin     : Boolean;
    userId      : String;
};

function SideArea({
    user,
    isLogin, 
    userId, 
} : SideAreaProps) {


    useEffect(() => {

    })



    return (
        <Box component="menu" sx={{mr:3, overflow: 'hidden', opacity:0.7}}>
            {/* <SideFloatingButtons/> */}
            <Paper elevation={3} sx={{minHeight:"200px", backgroundColor:'#efefef'}}>
                <Box sx={{ m: 1 }}>
                        Area1
                </Box>
            </Paper>    
            <SideAreaMId userId={user.userId} isLogin={user.isLogin}/>
            <SideAreaBottom/>
        </Box>
    );
}

export default SideArea;