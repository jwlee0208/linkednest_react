import { Box, Divider, Hidden, Typography, styled,  } from "@mui/material";
import Login from "../Login";

const MobileBox = styled(Box)({
    padding:20,
});

const DesktopBox = styled(Box)({
    paddingTop:100,
    paddingLeft:340,
    paddingRight:340,
});

type PortalLoginProps = {
    refer : string;
}

function PortalLogin({refer} : PortalLoginProps) {
    
    const commonLoginArea = () => {
        return (
            <>
                <Typography variant="h4" sx={{fontWeight:'bold'}}>Login</Typography>
                <Divider sx={{mt:3, mb:5}}/>
                <Login refer={refer}/>
            </>
        )
    }
    const loginArea = (type : string) => {
        
        if (type === 'mobile') {
            return (
                <MobileBox>{commonLoginArea()}</MobileBox>
            )
        }
        return (
            <DesktopBox>{commonLoginArea()}</DesktopBox>
        )
    }

    return (
        <Box>
            <Hidden smDown>
                {loginArea('normal')}
            </Hidden>
            <Hidden smUp>
                {loginArea('mobile')}
            </Hidden>
        </Box>
    )
}

export default PortalLogin;