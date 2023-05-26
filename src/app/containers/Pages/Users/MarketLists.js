import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UAParser from "ua-parser-js";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import { getMarketPlace } from "../../../components/API/AxiosInterceptor";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import NotificationSnackbar from "../../../components/Snackbar/NotificationSnackbar";
import DomainList from "./DomainLists";
import HomeBanner from "./Home/HomeBanner";
import CircularBackdrop from "../../../components/Backdrop/Backdrop";

function MarketLists() {
  const [marketPlaces, setMarketPlaces] = useState();
  const [showDomain, setShowDomain] = useState(false);
  const [openBackdrop, setBackdropOpen] = useState(false);

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
        console.log("Error from getting market places", error.response);
      });
  };
  useEffect(() => {
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
    </>
  );
}

export default MarketLists;
