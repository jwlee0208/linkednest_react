import { useLocation } from "react-router";
import Layout2 from "./template/Layout2";
import Layout1 from "./template/Layout1";
import Layout3 from "./template/Layout3";
import { useAppSelect } from "../../store/index.hooks";
import { useState } from "react";
import layoutSlice, { getLayoutInfo, Layout_, } from "../../store/modules/layout";
import store from "../../store";

function Layout() {

    let typeId = ""; 
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
    
    console.log("layout >> typeId : " + typeId + ", equal : " + (typeId === "2"));

    switch (typeId) {
      case "1" : return <Layout1/>
      case "2" : return <Layout2/>
      case "3" : return <Layout3/>
      default : return <Layout1/>
    }
}

export default Layout;