import {Paper} from '@mui/material';
import { BannerInfo } from './Banner';
import Image from 'mui-image';

type BannerProps = {
    info : BannerInfo;
};

function BannerDetail({info} : BannerProps) {

    return (
        <Paper title={info.name}>
            <Image src={info.img} style={{margin:"auto", display:"flex"}}/>
        </Paper>
    )
}

export default BannerDetail;
