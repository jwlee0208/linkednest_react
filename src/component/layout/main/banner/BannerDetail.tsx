import {Paper} from '@mui/material';
import { BannerInfo } from './Banner';
import Image from 'mui-image';

type BannerProps = {
    key : number;
    info : BannerInfo;
};

function BannerDetail({key,info} : BannerProps) {

    return (
        <Paper title={info.name}>
            <Image src={info.img} style={{margin:"auto", display:"flex"}}/>
        </Paper>
    )
}

export default BannerDetail;
