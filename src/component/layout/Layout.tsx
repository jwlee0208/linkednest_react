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

function Layout() {

    let typeId = "0"; 
    const location = useLocation();
    if (location.state !== null) {
      typeId = location.state.typeId;
    }
    

    return (
      (typeId === "2") ? <Layout2/> : <Layout1/>
    )
}

export default Layout;