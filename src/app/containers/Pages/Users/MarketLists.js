import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UAParser from "ua-parser-js";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";
import DomainList from "./DomainLists";
import HomeBanner from "./Home/HomeBanner";
import Market from "./Home/Market";

function MarketLists() {
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <HeaderHome selectedNav={"Home"} role={null} />
        <div id="hBanner">
          <HomeBanner />
        </div>

        <div className="row no-gutters mt-5">
          <DomainList />
        </div>
      </div>
      <Footer position={"relative"} />
    </div>
  );
}

export default MarketLists;
