import { Box, Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/index.hooks";
import { asyncLogout, User } from "../../store/modules/user";
import Login from "./user/Login";

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
    
    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        dispatch(asyncLogout(user));
        navigate("/");    
    };
    
    return (
        <Box component="menu">
            <Box bgcolor="primary.main" sx={{mt:1, mb:1, minHeight:"200px"}}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    Area1
                </FormControl>
            </Box>    
            <Box borderColor="gray" sx={{mt:1, mb:1}}>
                {isLogin === false ? 
                    <Login/> 
                    : (
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Box>{username}님<hr/>
                            <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                        </FormControl>    
                    )
                }  
            </Box>
            <Box bgcolor="primary.main" sx={{mt:1, mb:1, minHeight:"200px"}}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    Area3
                </FormControl>
            </Box>  
        </Box>
    );
}

export default SideArea;