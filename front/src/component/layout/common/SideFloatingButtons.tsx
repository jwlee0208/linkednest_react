import { Box, Fab, styled } from "@mui/material";
import { useAppSelect } from "../../../store/index.hooks";
import { getContentInfo } from "../../../store/modules/content";
import FacebookIcon         from '@mui/icons-material/Facebook';
import TwitterIcon          from '@mui/icons-material/Twitter';
import HomeIcon             from '@mui/icons-material/Home';
import ChatIcon             from '@mui/icons-material/Chat';

function SideFloatingButtons() {
    const contentInfo   = useAppSelect(getContentInfo);

    return (
        <Box id="floatingButtons" sx={{ width:'50px', float: `${contentInfo.layoutType === 1 ? 'right' : 'left'}`, display:'flex', justifyContent:'flex-end'}}>

        {
            contentInfo.contentSnsList.map((contentSns, index) => (
                <Fab color="primary" aria-label={`${contentSns.snsType}`} sx={{ mt: (contentSns.contentSnsId+1)*10, position:'fixed'}} onClick={() => window.open(`${contentSns.snsUrl}`)} key={`${contentSns.snsType}`}>
                    {
                        (contentSns.snsType === 'fb') ? (
                            <FacebookIcon/>        
                        ) : 
                        ((contentSns.snsType === 'tw') ? (
                            <TwitterIcon/>
                        ) : 
                        ((contentSns.snsType === 'dc') ? (
                            <ChatIcon/>
                        ) : (
                            <HomeIcon sx={{m:1}}/>
                        )))
                    }
                </Fab>
            ))
        }
            </Box>        
    )
}

export default SideFloatingButtons;
