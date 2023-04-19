import Carousel from "react-material-ui-carousel";
import BannerDetail from "./BannerDetail";
import { useAppSelect } from "../../../../store/index.hooks";
import { getBannerInfo } from "../../../../store/modules/banner";

function Banners() {

    const bannerInfos = useAppSelect(getBannerInfo);

    return (
         <Carousel sx={{m:1}}>
            {
                bannerInfos.bannerList.map((banner, idx) => <BannerDetail key={idx} info={banner}/>)
            }
        </Carousel>
    )
}

export default Banners;