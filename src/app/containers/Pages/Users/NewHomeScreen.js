import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UAParser from "ua-parser-js";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import Footer from "../../../components/Footers/NewFooter";
import HeaderHome from "../../../components/Headers/NewHeader";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";
import HomeBanner from "./Home/NewHomeBanner";
import Market from "./Home/Market";

import { Box, Grid, InputBase, Paper, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import XmannaDetails from "./Home/XmannaDetails";
import Featured from "./Home/Featured";
import BuyNow from "./Home/BuyNow";
import HomeCards from "./Home/HomeCards";




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
    <div className="main-wrapper" style={{ background: 'rgba(32,32,32,255)' }}>
      <div className="home-section home-full-height">
        <HeaderHome selectedNav={"Home"} role={null} />
        <HomeBanner />
        <XmannaDetails />
        <Featured />
        <BuyNow />
        <HomeCards/>

       

        {/* <Grid item xs={12}>
            

          </Grid> */}
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
