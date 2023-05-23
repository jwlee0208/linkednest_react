import { Box, Paper } from "@mui/material";
import { useEffect } from "react";

function SideAreaBottom() {

    useEffect(() => {
        
        const fbScript = document.createElement('script');
        fbScript.crossOrigin = 'anonymous';
        fbScript.src='https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v16.0&appId=292888480735625&autoLogAppEvents=1';
        fbScript.nonce = '7MH3uMeZ';
        fbScript.async = true;
        fbScript.defer = true;
        document.head.appendChild(fbScript);
        return () => {
            document.head.removeChild(fbScript);
        }
    });

    return (
        <>
            <Paper elevation={3} sx={{minHeight:"200px", mt:1, mb:1, backgroundColor:'#efefef'}}>
                <Box sx={{ p: 2 }}>
                    <div id="fb-root"></div>
                    <div className="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="" data-height="" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                        <blockquote cite="https://www.facebook.com/facebook" className="fb-xfbml-parse-ignore">
                            <a href="https://www.facebook.com/facebook">Facebook</a>
                        </blockquote>
                    </div>
                </Box>
            </Paper>
            
            <Paper elevation={3}>
            </Paper>
        </>
    )
}



export default SideAreaBottom;