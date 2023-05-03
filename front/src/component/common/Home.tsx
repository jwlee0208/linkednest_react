import { Box, Paper } from "@mui/material";
import Banner         from "../main/banner/Banner";
import RecentNotice   from "../main/RecentNotice";
import SiteMap        from "../main/SiteMap";

type HomeProps = {
  bannerHeight : string,
}

function Home({bannerHeight} : HomeProps) {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, minHeight:"200px" }}>  
    <div className="Home">
        <Box borderColor="primary.main" sx={{mt:1, mb:1, height:{bannerHeight}}}>
          <Banner/>
        </Box>
        <Paper variant="outlined" elevation={3} sx={{m:1, minHeight:"200px"}}>
          <RecentNotice/>
        </Paper>
        <Paper variant="outlined" elevation={3} sx={{m:1, minHeight:"200px", }}>
          <SiteMap/>
        </Paper>
    </div>
    </Box>
  );
}

export default Home;
