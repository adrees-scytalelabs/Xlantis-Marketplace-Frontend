import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";
import HomeBanner from "./Home/HomeBanner";
import Market from "./Home/Market";

function HomeScreen({ deviceType }) {
  let navigate = useNavigate();
  const { marketPlace } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  let location = useLocation();
  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      navigate("/");
    }
  });
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <HeaderHome selectedNav={"Home"} role={null} marketplaceId={location.state.marketplaceId} />
        <div id="hBanner">
          <HomeBanner />
        </div>

        <div className="row no-gutters mt-5">
          {/* <MarketLists></MarketLists> */}
          <Market deviceType={deviceType} marketPlace={marketPlace} />
        </div>
      </div>
      <Footer position={"relative"} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}


export default HomeScreen;
