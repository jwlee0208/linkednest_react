import { useLocation } from "react-router";
import Layout2 from "./template/Layout2";
import Layout1 from "./template/Layout1";
import Layout3 from "./template/Layout3";
import { useAppSelect } from "../../store/index.hooks";
import { useEffect, useState } from "react";
import layoutSlice, { getLayoutInfo, Layout_, setLayoutTypeId, } from "../../store/modules/layout";
import store from "../../store";


function Layout() {


    let typeId = '1'; 
    const location = useLocation();

    const [layout, setLayout] = useState<Layout_>({typeId : ""});

    console.log('layout >> location : ' + location + ", json type : " + JSON.stringify(location));

    let pathArr = location.pathname.split("/");
    if (pathArr[1] !== ''){
      typeId = pathArr[1];
    }
    const layoutInfo = useAppSelect(getLayoutInfo);
    console.log('location.pathname : ' + typeId  + ', stateTypeId : ' + layoutInfo.typeId);

    if (typeId !== layoutInfo.typeId) {
      setLayout({...layout, typeId : typeId});
      store.dispatch(layoutSlice.actions.setTypeId(layout));
    }
   
    useEffect(()=>{
      const baseCss = document.createElement("link");
      baseCss.crossOrigin = '*';
      baseCss.rel = 'stylesheet';
      baseCss.type = "text/css";
      baseCss.href = `http://localhost:9091/style/layout_${typeId === '' ? '1' : typeId}.scss`;
      
      const iconCss = document.createElement("link");
      iconCss.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      iconCss.rel = 'stylesheet';
      iconCss.crossOrigin = '*';

      document.head.appendChild(baseCss);
      document.head.appendChild(iconCss);

      return () => {
        document.head.removeChild(baseCss);
        document.head.removeChild(iconCss);
      }
    }, [typeId]);
    
    switch (typeId) {
      case "1" : return <Layout1/>
      case "2" : return <Layout2/>
      case "3" : return <Layout3/>
      default : return <Layout1/>
    }
}

export default Layout;