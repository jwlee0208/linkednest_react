import {Paper} from '@mui/material';
import { BannerInfo } from './Banner';

type BannerProps = {
    key : number;
    info : BannerInfo;
};

function BannerDetail({key,info} : BannerProps) {

    return (
        <Paper title={info.name} sx={{align:"center"}}>
            <img src={info.img} width="800px" height="300px" alt={info.description} title={info.name}/>
        </Paper>
    )
}

export default BannerDetail;
