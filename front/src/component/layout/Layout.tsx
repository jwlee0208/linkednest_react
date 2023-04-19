import { useLocation }             from "react-router";
import { useAppDispatch, useAppSelect }            from "../../store/index.hooks";
import { useEffect, useState }     from "react";
import LayoutType1                 from "./template/LayoutType1";
import LayoutType2                 from "./template/LayoutType2";
import LayoutType3                 from "./template/LayoutType3";
import LayoutAdmin                 from "./template/admin/LayoutAdmin";
import layoutSlice
   , { getLayoutInfo, LayoutInfo } from "../../store/modules/layout";
import contentSlice, { Content_, asyncGetContent, getContentInfo } from "../../store/modules/content";
import { axiosInstance } from "../..";
import bannerSlice, { BannerListInfo_, BannerList_ } from "../../store/modules/banner";

function Layout() {

    let   contentCode = ''; 
    const location    = useLocation();
    const dispatch    = useAppDispatch();
    const layoutInfo  = useAppSelect(getLayoutInfo);

    const [layout, setLayout]   = useState<LayoutInfo>({layoutId : ""});
    const [content, setContent] = useState<Content_>({
      contentId   : 0,
      contentName : '',
      contentType : '',
      contentCode : '',
      layoutType  : 0,
      status      : '',
      usableLevel : 0,
      contentSnsList : [],
      contentCreator : {
          contentCreatorId : 0,
          creatorName      : '',
          creatorRights    : '',
          creatorImgUrl    : '',    
      },
    })

    const [bannerListInfo, setBannerListInfo] = useState<BannerListInfo_>({
      contentCode : '',
      bannerList : [],
    });


    let pathArr = location.pathname.split("/");
    if (pathArr[1] !== ''){
      contentCode = pathArr[1];
    }

    const setupContent = (content : Content_) => {
      console.log('content : ', content);
      dispatch(contentSlice.actions.setContent(content));
      layout.layoutId = content.layoutType.toString();
      dispatch(layoutSlice.actions.setLayoutId(layout));          
    }                   

    const setupBannerList = (bannerList : BannerList_) => {
      console.log('layout >> bannerList : ', bannerList);
      bannerListInfo.contentCode = content.contentCode;
      bannerListInfo.bannerList = bannerList;
      dispatch(bannerSlice.actions.setBannerList(bannerListInfo));
    }

    useEffect(()=>{
      content.contentCode = contentCode;
      axiosInstance.get(`/api/content/${content.contentCode}`)
                   .then((res) => setupContent(res.data))
                   .catch(err => console.log(err));

      if (contentCode !== 'admin') {
        axiosInstance.get(`/api/banner/list/${content.contentCode}`)
        .then((res) => setupBannerList(res.data))
        .catch((err) => console.log(err));              
      }
              
      const baseCss = document.createElement("link");
      baseCss.crossOrigin = '*';
      baseCss.rel         = 'stylesheet';
      baseCss.type        = "text/css";
      baseCss.href        = `http://localhost:9091/style/layout_${contentCode === '' ? '' : contentCode}.scss`;
      
      const iconCss = document.createElement("link");
      iconCss.href        = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      iconCss.rel         = 'stylesheet';
      iconCss.crossOrigin = '*';

      document.head.appendChild(baseCss);
      document.head.appendChild(iconCss);

      return () => {
        document.head.removeChild(baseCss);
        document.head.removeChild(iconCss);
      }
    }, [contentCode]);
    
    switch (layoutInfo.layoutId) {
      case "99" : return <LayoutAdmin/>
      case "1"  : return <LayoutType1/>
      case "2"  : return <LayoutType2/>
      case "3"  : return <LayoutType3/>
      default   : return <LayoutType1/>
    }
}

export default Layout;