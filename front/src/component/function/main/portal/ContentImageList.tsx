import { Box, ImageList, ImageListItem, ImageListItemBar, Paper, Typography } from "@mui/material"
import { ContentList_, Content_ } from "../../../../store/modules/content"
import { styled }                           from '@mui/material/styles';
import { MouseEvent } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

type ContentImageListProps = {
    contentList : ContentList_
}

function ContentImageList({
    contentList 
} : ContentImageListProps) {

    
    const moveTo = (content : Content_, event : MouseEvent<HTMLElement>) => {
        event.preventDefault();
        window.location.href = `/${content.contentCode}`;
    }

    return (
    <div>    
        <Box sx={{p:2}}>
            <Typography variant="h6" sx={{fontWeight:'bold', color: 'GrayText'}}>Games</Typography>
            <ImageList variant="standard" cols={3} gap={100} >
        {
            contentList.map((content) => (
                <ImageListItem key={`${content.contentCode}_imageListItem`} sx={{cursor:'pointer'}} onClick={(e) => moveTo(content as Content_, e)} >
                    <img 
                        src={`${content.imagePath}?w=248&fit=crop&auto=format`}
                        srcSet={`${content.imagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={content.contentName}
                        loading="lazy"
                        key={`${content.contentCode}_img`}
                        style={{
                            borderTopLeftRadius:4,
                            borderTopRightRadius:4,
                            borderBottomLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            display: 'inline-grid',
                            width: '100%',
                            cursor:'pointer'
                        }}/>
                    <ImageListItemBar position="below" 
                        subtitle={content.contentName}
                        sx={{mt:2, pt:1, pl: 1, verticalAlign: 'center', bgcolor:'#efefef', borderRadius:'0.5rem'}} 
                    />
                    <Typography noWrap={false} variant="subtitle2" sx={{p:1}}>{content.contentDesc}</Typography>
                </ImageListItem>

            ))
        }        
            </ImageList>

        </Box>
    </div>    
    )
}

export default ContentImageList