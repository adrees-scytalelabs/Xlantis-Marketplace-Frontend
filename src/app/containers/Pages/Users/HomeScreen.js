import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UAParser from "ua-parser-js";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";
import HomeBanner from "./Home/HomeBanner";
import Market from "./Home/Market";
import MarketLists from "./MarketLists";

function HomeScreen({ deviceType }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  let location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("session_id");
    const sessionId = localStorage.getItem('sessionId')
    if (id != null) {
      if (sessionId == id) {
        const active = searchParams.get("active");
        if (active == "true") {
          let variant = "success";
          setSnackbarMessage("Payment Successful!! Thank you for your purchase.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          localStorage.removeItem('sessionId');
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete('session_id');
          searchParams.delete('active');
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, '', newUrl);
        } else {
          let variant = "error";
          setSnackbarMessage("Payment Unsuccessful!");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          localStorage.removeItem('sessionId');
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete('session_id');
          searchParams.delete('active');
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, '', newUrl);
        }
      }
    }
  }, [])
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <HeaderHome selectedNav={"Home"} role={null} />
        <div id="hBanner">
          <HomeBanner />
        </div>
        
        <div className="row no-gutters mt-5">
          {/* <MarketLists></MarketLists> */}
          <Market deviceType={deviceType} />
        </div>
      </div>
      <Footer position={"relative"} />
      <NotificationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />
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
