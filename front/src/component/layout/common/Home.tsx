import { Box }      from "@mui/material";
import Banner       from "../main/banner/Banner";
import RecentNotice from "../main/RecentNotice";
import SiteMap      from "../main/SiteMap";

type HomeProps = {
  bannerHeight : string,
}

function Home({bannerHeight} : HomeProps) {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1, minHeight:"200px" }}>  
    <div className="Home">
        <Box borderColor="primary.main" border={1} sx={{mt:1, mb:1, height:{bannerHeight}}}>
          <Banner/>
        </Box>
        <Box borderColor="secondary.main" border={1} sx={{mt:1, mb:1, minHeight:"200px"}}>
          <RecentNotice/>
        </Box>
        <Box borderColor="skyblue" border={1} sx={{mt:1, mb:1, minHeight:"200px"}}>
          <SiteMap/>
        </Box>
    </div>
    </Box>
  );
}

export default Home;
