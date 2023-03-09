import { BottomNavigation, Box, FormControl, Grid, Typography } from "@mui/material";

function Footer() {
    return (
        <Grid container spacing={1}>
            <Grid container item>
                <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, backgroundColor:"gray" }}>
                    <Typography  color="primary" variant="h6" align="center">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <p>footer area</p>
                        </FormControl>                            
                    </Typography>  
                </Box>
            </Grid>
        </Grid>        
    );
}

export default Footer;