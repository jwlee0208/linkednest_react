import { Navigate, Route, Routes, useLocation } from "react-router";
import { useAppSelect } from "../../store/index.hooks";
import { getUserInfo } from "../../store/modules/user";
import Header from "./Header";
import Home from "./Home";
import Login from "./user/Login";
import Mypage from "./user/Mypage";
import Footer from "./Footer";
import SideArea from "./SideArea";
import { Grid } from "@mui/material";
import Navbar from "./Navbar";
import TopBanner from "./TopBanner";
import App from "../../App";
import Layout2 from "./Layout2";
import Layout1 from "./Layout1";
import Layout3 from "./Layout3";

function Layout() {

    let typeId = "1"; 
    const location = useLocation();

    console.log('layout >> location : ' + location + ", json type : " + JSON.stringify(location));

    if (location.state !== null) {
      typeId = location.state;
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