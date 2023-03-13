import { Box, Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelect } from "../../../store/index.hooks";
import { getLayoutInfo } from "../../../store/modules/layout";
import { asyncLogout, User } from "../../../store/modules/user";
import Login from "../user/Login";

type SideAreaProps = {
    user : User,
    isLogin : Boolean;
    username : String;
};

function SideArea({
    user,
    isLogin, 
    username, 
} : SideAreaProps) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const layoutinfo = useAppSelect(getLayoutInfo);

    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        dispatch(asyncLogout(user));
        navigate("/"+layoutinfo.typeId);    
    };
    
    return (
        <Box component="menu">
            <Box border={1} borderColor="primary.main" bgcolor="gray" sx={{minHeight:"200px"}}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    Area1
                </FormControl>
            </Box>    
            <Box border={1} borderColor="gray" sx={{mt:1, mb:1}}>
                {isLogin === false ? 
                    <Login/> 
                    : (
                        <FormControl fullWidth sx={{ m: 2 }}>
                            <Box>{username}님<br/>
                            <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                        </FormControl>    
                    )
                }  
            </Box>
            <Box border={1} borderColor="primary.main" bgcolor="gray" sx={{mt:1, mb:1, minHeight:"200px"}}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    Area3
                </FormControl>
            </Box>  
        </Box>
    );
}

export default SideArea;