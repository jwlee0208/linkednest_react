import { Box, Button, Paper } from "@mui/material";
import Login from "../../../../function/user/Login";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelect } from "../../../../../store/index.hooks";
import { getLayoutInfo } from "../../../../../store/modules/layout";
import { getContentInfo }               from "../../../../../store/modules/content";
import { asyncLogout } from "../../../../../store/modules/user";

type SideAreaMIdProps = {
    isLogin : boolean;
    userId : string;
}
function SideAreaMId({isLogin, userId} : SideAreaMIdProps) {
    const navigate      = useNavigate();
    const dispatch      = useAppDispatch();
    const layoutInfo    = useAppSelect(getLayoutInfo);
    const contentInfo   = useAppSelect(getContentInfo);

    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        dispatch(asyncLogout());
        navigate(`/${contentInfo.contentCode}`);    
    };
    
    return (
        <Paper elevation={3} sx={{minHeight:"200px", mt:1, mb:1, backgroundColor:'#efefef'}}>
        {isLogin === false ? 
            <Login refer={`/${document.location.href}`} isNeedRedirect={false}/> 
            : (
                <Box sx={{ m: 2 }}>
                    <Box>{userId}님<br/>
                    <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                </Box>    
            )
        }  
        </Paper>
    )
}

export default SideAreaMId;