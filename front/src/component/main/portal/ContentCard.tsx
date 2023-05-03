import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } 
                        from "@mui/material";
import { MouseEvent }   from 'react';
import { useNavigate }  from "react-router";
import { Content_ }     from "../../../store/modules/content";

type ContentCardProps = {
    content : Content_
}
function ContentCard({content} : ContentCardProps) {
    const navigate = useNavigate();
    const movePage = (content : Content_, event : MouseEvent) => {
        navigate(`/${content.contentCode}`);
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={content.contentName}
          subheader={content.contentCreator.creatorName}
          sx={{cursor:'pointer'}}
          onClick={(e)=> movePage(content, e)}
        />
        <CardMedia
          component="img"
          height="194"
          image={content.imagePath}
          alt={content.contentName}
          sx={{cursor:'pointer'}}
          onClick={(e)=> movePage(content, e)}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content.contentDesc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
      </Card>
    )
}

export default ContentCard;