import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import { getMarketPlace } from "../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../components/Backdrop/Backdrop";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";
import DomainList from "./DomainLists";
import HomeBanner from "./Home/HomeBanner";

function MarketLists() {
  const [marketPlaces, setMarketPlaces] = useState();
  const [showDomain, setShowDomain] = useState(false);
  const [openBackdrop, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  let location = useLocation();

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const getMarketPlaces = () => {
    setBackdropOpen(true);
    getMarketPlace(0, 5)
      .then((response) => {
        console.log("Getting MarketPlaces: ", response);
        setMarketPlaces(response.data.data);
        setBackdropOpen(false);
        setShowDomain(true);
      })
      .catch((error) => {
        console.log("Error from getting market places", error.message);
        let variant = "error";
        setSnackbarMessage("An error occured");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setBackdropOpen(false);
      });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("session_id");
    const sessionId = localStorage.getItem("sessionId");
    if (id != null) {
      if (sessionId == id) {
        const active = searchParams.get("active");
        if (active == "true") {
          let variant = "success";
          setSnackbarMessage(
            "Payment Successful!! Thank you for your purchase."
          );
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          localStorage.removeItem("sessionId");
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete("session_id");
          searchParams.delete("active");
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, "", newUrl);
        } else {
          let variant = "error";
          setSnackbarMessage("Payment Unsuccessful!");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          localStorage.removeItem("sessionId");
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete("session_id");
          searchParams.delete("active");
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, "", newUrl);
        }
      }
    }
    getMarketPlaces();
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <div className="home-section home-full-height">
          <HeaderHome selectedNav={"Home"} role={null} />
          <div id="hBanner">
            <HomeBanner />
          </div>
          {showDomain === true && (
            <div className="row no-gutters mt-5">
              <DomainList domains={marketPlaces} />
            </div>
          )}
        </div>
        <Footer position={"relative"} />
      </div>
      <CircularBackdrop open={openBackdrop} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
}

export default MarketLists;
