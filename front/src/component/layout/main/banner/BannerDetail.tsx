import {Paper}      from '@mui/material';
import Image        from 'mui-image';
import { Banner_ }  from '../../../../store/modules/banner';

type BannerProps = {
    info : Banner_;
};

function BannerDetail({info} : BannerProps) {
    return (
        <Paper title={info.bannerName}>
            <Image src={info.mainImageUrl} style={{margin:"auto", display:"flex"}} alt={info.bannerDesc}/>
        </Paper>
    )
}

export default BannerDetail;
