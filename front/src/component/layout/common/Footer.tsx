import { Box, FormControl, Grid, Typography } from "@mui/material";
import { Content_, getContentInfo } from "../../../store/modules/content";
import { useAppSelect } from "../../../store/index.hooks";
import Image from "mui-image";

function Footer() {
    const contentInfo = useAppSelect(getContentInfo);
    console.log('contentInfo.contentCreator : ', contentInfo.contentCreator);

    return (
        <Grid container spacing={1}>
            <Grid container item>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, borderColor:"gray", borderTop:1 }}>
                    <Typography  color="primary" variant="h6" align="center">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <Image src={contentInfo.contentCreator.creatorImgUrl}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <p>{contentInfo.contentCreator.creatorName}</p>
                                </Grid>
                            </Grid>
                        </FormControl>                            
                    </Typography>  
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, borderColor:"gray", borderTop:1 }}>
                    <Typography  color="primary" variant="h6" align="center">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <p>{contentInfo.contentCreator.creatorRights}</p>
                        </FormControl>                            
                    </Typography>  
                </Box>
            </Grid>
        </Grid>        
    );
}

export default Footer;