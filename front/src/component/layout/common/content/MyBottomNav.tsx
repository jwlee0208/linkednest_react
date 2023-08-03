
import HomeIcon                   from '@mui/icons-material/Home';
import PeopleIcon                 from '@mui/icons-material/People';
import React, { SyntheticEvent }  from "react";
import BottomNavigation           from "@mui/material/BottomNavigation";
import BottomNavigationAction     from "@mui/material/BottomNavigationAction";
import { useAppSelect }           from "../../../../store/index.hooks";
import { useNavigate }            from "react-router";
import { getUserInfo }            from "../../../../store/modules/user";
import {getContentInfo }          from "../../../../store/modules/content";

function MyBottomNav () {
    const userinfo    = useAppSelect(getUserInfo);
    const contentInfo = useAppSelect(getContentInfo);
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate();

    const moveTo = (event: SyntheticEvent, value: string) => {
      switch (value) {
        case 'home' : 
          navigate(`/${contentInfo.contentCode}`)
          break;
        case 'mypage' : 
          navigate(`/${contentInfo.contentCode}/mypage`)
          break;
        default : navigate(`/${contentInfo.contentCode}`);
      }
    }

    const myPageArea = (isLogin : boolean) => {
        switch (isLogin) {
            case true : 
                return <BottomNavigationAction label="My Page"   icon={<PeopleIcon />} onClick={(e) => moveTo(e, 'mypage')} />
            default : return <></>    
        }
    }
    
    return (
        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}}>
            {/* {myPageArea(userinfo.isLogin)} */}
            <BottomNavigationAction label="Home"      icon={<HomeIcon />} onClick={(e) => moveTo(e, 'home')}/>
        </BottomNavigation>
    )
}

export default MyBottomNav;