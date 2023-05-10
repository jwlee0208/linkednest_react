import { Box, Paper } from "@mui/material";
import Banners from "../../function/main/banner/Banner";
import RecentNotice from "../../function/main/RecentNotice";
import SiteMap from "../../function/main/siteMap/SiteMap";

type HomeProps = {
  bannerHeight : string,
}

function Home({bannerHeight} : HomeProps) {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, minHeight:"200px" }}>  
    <div className="Home">
        <Box borderColor="primary.main" sx={{mt:1, mb:1, height:{bannerHeight}}}>
          <Banners/>
        </Box>
        <Paper variant="outlined" elevation={0} sx={{m:1, minHeight:"200px"}}>
          <RecentNotice/>
        </Paper>
        <Paper variant="outlined" elevation={0} sx={{m:1, minHeight:"200px", }}>
          <SiteMap/>
        </Paper>
    </div>
    </Box>
  );
}

export default Home;
