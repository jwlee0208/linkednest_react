import { Box, Fab, Typography, styled } from "@mui/material";
import FacebookIcon         from '@mui/icons-material/Facebook';
import TwitterIcon          from '@mui/icons-material/Twitter';
import HomeIcon             from '@mui/icons-material/Home';
import ChatIcon             from '@mui/icons-material/Chat';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useAppSelect } from "../../../../store/index.hooks";
import { getContentInfo } from "../../../../store/modules/content";

function SideFloatingButtons() {
    const contentInfo   = useAppSelect(getContentInfo);

    return (
        <Box id="floatingButtons" sx={{ width:'50px', float: `${contentInfo.layoutType === 1 ? 'right' : 'left'}`, display:'flex', justifyContent:'flex-end'}}>
        {
            contentInfo.contentSnsList.map((contentSns, index) => (
                <Fab variant='circular' color='inherit' aria-label={`${contentSns.snsType}`} sx={{ mt: (contentSns.contentSnsId+1)*10, position:'fixed'}} onClick={() => window.open(`${contentSns.snsUrl}`)} key={`${contentSns.snsType}`} >
                    {
                        (contentSns.snsType === 'fb') ? (
                            <FacebookIcon color="primary"/>        
                        ) : 
                        ((contentSns.snsType === 'tw') ? (
                            <TwitterIcon color="info"/>
                        ) : 
                        ((contentSns.snsType === 'dc') ? (
                            <ChatIcon color="secondary"/>
                        ) : ((contentSns.snsType === 'yt') ? (
                            <YouTubeIcon color="error"/>
                        ) : (
                            <HomeIcon sx={{m:1}} color="success"/>
                        ))))
                    }
                </Fab>
            ))
        }
            </Box>        
    )
}

export default SideFloatingButtons;
