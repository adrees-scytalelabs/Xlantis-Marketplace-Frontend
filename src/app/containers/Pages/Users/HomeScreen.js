import React from "react";
import { Link } from "react-router-dom";

import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import Drops from "./Home/Drops";
import HomeBanner from "./Home/HomeBanner";
import Market from "./Home/Market";
import TrendingAndTop from "./Home/TrendingAndTop";
import FixedPriceDrops from "./Home/FixedPriceDrops";
import UAParser from "ua-parser-js";

// // CALCULATIONS
// let elem = document.getElementById("hBanner");
// let position = elem.getClientRect();
// if (position !== undefined) alert(position.top);

function HomeScreen({ deviceType }) {
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <HeaderHome selectedNav={"Home"} role={null}/>
        <div id="hBanner">
          <HomeBanner />
        </div>
        {/* Trending and Top Collections */}
        {/* <div className="row no-gutters mt-5">
          <TrendingAndTop />
        </div> */}
        {/* <div className="row no-gutters mt-5">
          <FixedPriceDrops />
        </div> */}
        <div className="row no-gutters mt-5">
          <Market deviceType={deviceType} />
        </div>
        {/* <Drops /> */}
      </div>
      <Footer position={"relative"} />
    </div>
  );
}

HomeScreen.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return { deviceType };
};

export default HomeScreen;
