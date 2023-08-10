import { Box, Fab }         from "@mui/material";
import FacebookIcon         from '@mui/icons-material/Facebook';
import TwitterIcon          from '@mui/icons-material/Twitter';
import HomeIcon             from '@mui/icons-material/Home';
import ChatIcon             from '@mui/icons-material/Chat';
import YouTubeIcon          from '@mui/icons-material/YouTube';
import { useAppSelect }     from "../../../../../store/index.hooks";
import { getContentInfo }   from "../../../../../store/modules/content";

function SideFloatingButtons() {
    const contentInfo   = useAppSelect(getContentInfo);

    const linkIcon = (snsType : string) => {
        switch (snsType) {
            case "fb" : return <FacebookIcon color="primary"/>
            case "tw" : return <TwitterIcon color="info"/>
            case "dc" : return <ChatIcon color="secondary"/>
            case "yt" : return <YouTubeIcon color="error"/>
            default : return <HomeIcon sx={{m:1}} color="success"/>
        }
    }

    return (
        <Box id="floatingButtons" sx={{ width:'50px', float: `${contentInfo.layoutType === 1 ? 'right' : 'left'}`, display:'flex', justifyContent:'flex-end'}}>
        {
            contentInfo.contentSnsList.map((contentSns, index) => (
                <Fab variant='circular' color='inherit' aria-label={`${contentSns.snsType}`} sx={{ mt: (contentSns.contentSnsId+1)*10, position:'fixed'}} onClick={() => window.open(`${contentSns.snsUrl}`)} key={`${contentSns.snsType}`} >
                    { linkIcon(contentSns.snsType) }
                </Fab>
            ))
        }
            </Box>        
    )
}

export default SideFloatingButtons;
