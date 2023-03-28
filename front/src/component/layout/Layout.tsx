import { useLocation }             from "react-router";
import { useAppSelect }            from "../../store/index.hooks";
import { useEffect, useState }     from "react";
import LayoutType1                 from "./template/LayoutType1";
import LayoutType2                 from "./template/LayoutType2";
import LayoutType3                 from "./template/LayoutType3";
import LayoutAdmin                 from "./template/admin/LayoutAdmin";
import store                       from "../../store";
import layoutSlice
   , { getLayoutInfo, LayoutInfo } from "../../store/modules/layout";

function Layout() {

    let   typeId      = 'type1'; 
    const location    = useLocation();
    const layoutInfo  = useAppSelect(getLayoutInfo);

    const [layout, setLayout] = useState<LayoutInfo>({typeId : ""});

    // console.log(`LAYOUT >> location : ${location} , json type : ${JSON.stringify(location)}`);

    let pathArr = location.pathname.split("/");
    if (pathArr[1] !== ''){
      typeId = pathArr[1];
    }
    // console.log(`location.pathname : ${typeId}, stateTypeId : ${layoutInfo.typeId}`);

    if (typeId !== layoutInfo.typeId) {
      setLayout({...layout, typeId : typeId});
      store.dispatch(layoutSlice.actions.setTypeId(layout));
    }
   
    useEffect(()=>{
      const baseCss = document.createElement("link");
      baseCss.crossOrigin = '*';
      baseCss.rel         = 'stylesheet';
      baseCss.type        = "text/css";
      baseCss.href        = `http://localhost:9091/style/layout_${typeId === '' ? '1' : typeId}.scss`;
      
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
    }, [typeId]);
    
    switch (typeId) {
      case "admin"  : return <LayoutAdmin/>
      case "type1"  : return <LayoutType1/>
      case "type2"  : return <LayoutType2/>
      case "type3"  : return <LayoutType3/>
      default       : return <LayoutType1/>
    }
}

export default Layout;