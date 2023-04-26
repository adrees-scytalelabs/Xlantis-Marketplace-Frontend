import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import UAParser from "ua-parser-js";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import HomeBanner from "./Home/HomeBanner";
import Market from "./Home/Market";


function HomeScreen({ deviceType }) {
  const { enqueueSnackbar } = useSnackbar();
  let location = useLocation();
  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("session_id");
    const sessionId = localStorage.getItem('sessionId')
    if (id != null) {
      if (sessionId == id) {
        const active = searchParams.get("active");
        if (active == "true") {
          let variant = "success";
          enqueueSnackbar("Payment Successful!!Thank you for your purchase.", { variant });
          localStorage.removeItem('sessionId');
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete('session_id');
          searchParams.delete('active');
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, '', newUrl);
        } else {
          let variant = "error";
          enqueueSnackbar("Payment Unsuccessful!", { variant });
          localStorage.removeItem('sessionId');
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete('session_id');
          searchParams.delete('active');
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, '', newUrl);
        }
      }
    }
  },[])
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <HeaderHome selectedNav={"Home"} role={null} />
        <div id="hBanner">
          <HomeBanner />
        </div>
        <div className="row no-gutters mt-5">
          <Market deviceType={deviceType} />
        </div>
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
