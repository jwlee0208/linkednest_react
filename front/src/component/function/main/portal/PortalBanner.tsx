import { Box, Card, CardContent, CardMedia, IconButton, Typography } 
                                     from "@mui/material";
import Carousel                      from "react-material-ui-carousel";
import ArrowLeftIcon                 from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon                from '@mui/icons-material/ArrowRight';
import ChatIcon                      from '@mui/icons-material/Chat';
import FacebookIcon                  from '@mui/icons-material/Facebook';
import { default as HomeIcon }       from '@mui/icons-material/Home';
import TwitterIcon                   from '@mui/icons-material/Twitter';
import YouTubeIcon                   from '@mui/icons-material/YouTube';
import { ContentList_, ContentSns_ } from "../../../../store/modules/content";
import ContentImageList from "./ContentImageList";

type PortalBannerProps = {
    contentList : ContentList_
}
function PortalBanner({contentList} : PortalBannerProps) {
    const buttonArea = (contentSns : ContentSns_) => {
        switch (contentSns.snsType) {
            case 'fb' : return <FacebookIcon    color="primary"/>
            case 'tw' : return <TwitterIcon     color="info"/>
            case 'dc' : return <ChatIcon        color="secondary"/>
            case 'yt' : return <YouTubeIcon     color="error"/>
            default : return <HomeIcon sx={{m:1}} color="success"/>
        }
    }

    return (
    <>    
        <Carousel sx={{m:1, height: '500px'}} 
                    NextIcon={<ArrowRightIcon/>} 
                    PrevIcon={<ArrowLeftIcon/>}>
{
            contentList.map((content) => (
            <Card key={`${content.contentCode}_cardBanner`} sx={{ display: 'flex' }}>
                <Box sx={{borderRadius:4, borderColor:'InfoText', border:1, mr:1, display: 'flex', width: '25%', flexDirection: 'column', pl:2, pr:2}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '420px'}}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" sx={{fontWeight:'bold'}}>{content.contentName}</Typography>
                            <hr/>
                            <Typography component="div" variant="subtitle1" sx={{lineHeight:'2.5em'}}>{content.contentDesc}</Typography>    
                        </CardContent>
                    </Box>
                    <Box sx={{borderRadius:4, display: 'flex', alignItems: 'end', pt: 1, pl: 2, pb: 1, backgroundColor:'#efefef' }}>
                        <IconButton href={`${content.homepageUrl}`} sx={{float:'left', borderColor:'#efefef', border:1}} size="small">
                            <HomeIcon sx={{m:1}} color="inherit"/>
                        </IconButton>
                        {
                content.contentSnsList.map((contentSns, index) => (
                    <IconButton href={`${contentSns.snsUrl}`} 
                                sx={{borderColor:'#efefef', border:1, ml: 1}} 
                                size="large" 
                                key={`${content.contentCode}_${contentSns.snsType}_btn`}>
                        {
                            buttonArea(contentSns)
                        }
                    </IconButton>    
                ))
            }
                    </Box>
                </Box>
                <CardMedia component='img' 
                            sx={{width : '75%', maxHeight:'500px', borderRadius:4}} 
                            image={content.imagePath} 
                            alt={content.contentDesc}/>
            </Card>    
            ))
}
        </Carousel>
        <Box sx={{width:'100%', p:1}}>
            <ContentImageList contentList={contentList}/>
        </Box>  
    </>
    )
}

export default PortalBanner;