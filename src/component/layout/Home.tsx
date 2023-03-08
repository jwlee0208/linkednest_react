import { Box } from "@mui/material";
import Banner from "./main/Banner";
import RecentNotice from "./main/RecentNotice";
import SiteMap from "./main/SiteMap";

function Home() {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, minHeight:"200px" }}>  
    <div className="Home">
        <Box sx={{height:"200px"}}>
          <Banner/>
        </Box>
        <Box sx={{height:"200px"}}>
          <RecentNotice/>
        </Box>
        <Box sx={{height:"200px"}}>
          <SiteMap/>
        </Box>
    </div>
    </Box>
  );
}

export default Home;
