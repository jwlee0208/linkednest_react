import { useLocation } from "react-router";
import Layout2 from "./template/Layout2";
import Layout1 from "./template/Layout1";
import Layout3 from "./template/Layout3";

function Layout() {

    let typeId = undefined; 
    const location = useLocation();

    console.log('layout >> location : ' + location + ", json type : " + JSON.stringify(location));

    if (location.state !== null) {
      typeId = location.state;
    }
    if (typeId === undefined) {
      let pathArr = location.pathname.split("/");
      if (pathArr[1] !== ''){
        typeId = pathArr[1];
      }
      console.log('location.pathname : ' + typeId);
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