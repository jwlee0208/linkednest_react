import { Box, Button, Fab, Icon, Paper } from "@mui/material";
import { useNavigate }      from "react-router";
import { useAppDispatch, useAppSelect }     from "../../../store/index.hooks";
import { getLayoutInfo }    from "../../../store/modules/layout";
import { User, asyncLogout }  from "../../../store/modules/user";
import Login                from "../../user/Login";
import { getContentInfo }   from "../../../store/modules/content";
import SideFloatingButtons  from "./SideFloatingButtons";

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

    const navigate      = useNavigate();
    const dispatch      = useAppDispatch();
    const layoutInfo    = useAppSelect(getLayoutInfo);
    const contentInfo   = useAppSelect(getContentInfo);

    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        dispatch(asyncLogout());
        navigate(`/${contentInfo.contentCode}`);    

        // store.dispatch(userSlice.actions.logout(user));
        // navigate(`/${contentInfo.contentCode}`);    
    };
    
    
    return (
        <Box component="menu" sx={{mr:3, overflow: 'hidden'}}>
            <SideFloatingButtons/>
            <Paper variant="outlined" elevation={3} sx={{minHeight:"200px", backgroundColor:'#efefef'}}>
                <Box sx={{ m: 1 }}>
                        Area1
                </Box>
            </Paper>    
            <Paper variant="outlined" elevation={3} sx={{minHeight:"200px", mt:1, mb:1, backgroundColor:'#efefef'}}>
                {isLogin === false ? 
                    <Login/> 
                    : (
                        <Box sx={{ m: 2 }}>
                            <Box>{userId}님<br/>
                            <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                        </Box>    
                    )
                }  
            </Paper>
            <Paper variant="outlined" elevation={3} sx={{minHeight:"200px", backgroundColor:'#efefef'}}>
                <Box sx={{ m: 1 }}>
                    Area3
                </Box>
            </Paper>  
        </Box>
    );
}

export default SideArea;