import Carousel from "react-material-ui-carousel";
import BannerDetail from "./BannerDetail";

export interface BannerInfos {
    bannerInfos : Array<{
        name : string;
        description : string;
        img : string;
    }>
}

export interface BannerInfo {
    name : string;
    description : string;
    img : string;
}

const initialState : BannerInfo = {
    name : '',
    description : '',
    img : '',
}

function Banners() {

    const banners : BannerInfos = {
        bannerInfos : [{name : 'banner1', description : 'banner1 description', img : 'https://farm8.static.flickr.com/7176/27261364130_0ea18cdcfd_b.jpg'}
                     , {name : 'banner2', description : 'banner2 description', img : 'https://farm8.static.flickr.com/7130/27465699131_0ef9007372_b.jpg'}
                     , {name : 'banner3', description : 'banner3 description', img : 'https://farm8.static.flickr.com/7176/27261364130_0ea18cdcfd_b.jpg'}]
    }; 

    return (
         <Carousel sx={{m:1}}>
            {
                banners.bannerInfos.map((bannerInfo, i) => <BannerDetail key={i} info={bannerInfo}/>)
            }
        </Carousel>
    )
}

export default Banners;