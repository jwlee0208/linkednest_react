import {Paper}      from '@mui/material';
import Image        from 'mui-image';
import { Banner_ }  from '../../../../store/modules/banner';

type BannerProps = {
    info : Banner_;
};

function BannerDetail({info} : BannerProps) {
    return (
        <Paper title={info.bannerName}>
            <Image src={info.mainImageUrl} style={{borderRadius:4, margin:"auto", display:"flex", maxHeight:"400px"}} alt={info.bannerDesc}/>
        </Paper>
    )
}

export default BannerDetail;
