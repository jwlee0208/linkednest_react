import { Box, FormControl, Grid, Typography }   from "@mui/material";
import { getContentInfo }                       from "../../store/modules/content";
import { useAppSelect }                         from "../../store/index.hooks";
import Image                                    from "mui-image";

function Footer() {
    const contentInfo = useAppSelect(getContentInfo);

    return (
        <Grid container id="footerArea">
            <Grid container item>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
                    <Typography  color="primary" variant="h6" align="center">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <Grid container>
                                <Grid item xs={4}>
                                {
                                    (contentInfo.contentCreator.creatorImgUrl !== null) ? (
                                        <Image src={contentInfo.contentCreator.creatorImgUrl} width={150}/>
                                    ) : (<></>)
                                }    
                                </Grid>
                                <Grid item xs={8}>
                                    <p>{contentInfo.contentCreator.creatorName}</p>
                                </Grid>
                            </Grid>
                        </FormControl>                            
                    </Typography>  
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1 }}>
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