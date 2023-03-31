import { Box, Button }      from "@mui/material";
import { useNavigate }      from "react-router";
import { useAppSelect }     from "../../../store/index.hooks";
import { getLayoutInfo }    from "../../../store/modules/layout";
import userSlice, { User }  from "../../../store/modules/user";
import Login                from "../user/Login";
import store                from "../../../store";

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
    const layoutInfo    = useAppSelect(getLayoutInfo);

    const handleLogoutAction = (event : React.MouseEvent) => {
        event.preventDefault();
        store.dispatch(userSlice.actions.logout(user));
        navigate(`/${layoutInfo.typeId}`);    
    };
    
    return (
        <Box component="menu" sx={{mr:3, overflow: 'hidden'}}>
            <Box border={1} borderColor="primary.main" bgcolor="gray" sx={{minHeight:"200px"}}>
                <Box sx={{ m: 1 }}>
                    Area1
                </Box>
            </Box>    
            <Box border={1} borderColor="gray" sx={{mt:1, mb:1}}>
                {isLogin === false ? 
                    <Login/> 
                    : (
                        <Box sx={{ m: 2 }}>
                            <Box>{userId}님<br/>
                            <Button variant="outlined" size="medium" onClick={(e) => handleLogoutAction(e)}>Logout</Button></Box>
                        </Box>    
                    )
                }  
            </Box>
            <Box border={1} borderColor="primary.main" bgcolor="gray" sx={{mt:1, mb:1, minHeight:"200px"}}>
                <Box sx={{ m: 1 }}>
                    Area3
                </Box>
            </Box>  
        </Box>
    );
}

export default SideArea;