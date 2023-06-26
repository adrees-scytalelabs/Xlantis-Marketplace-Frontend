import ListAltIcon from "@mui/icons-material/ListAlt";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  getAdminCountsVersioned,
  getMaticBalance,
  stripeLogin,
  stripeOnBoarding,
} from "../../../../components/API/AxiosInterceptor";
import AdminBalanceCard from "../../../../components/Cards/AdminBalanceCard";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";

function AdminDashboardDefaultScreen(props) {
  const cardContainerStyle = {
    flex: "1 0 100%",
    padding: "0 0.5rem",
    height: "100%",
  };
  const [balanceUSD, setBalanceUSD] = useState(0);
  const [balanceMatic, setBalanceMatic] = useState(0);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const [hover, setHover] = useState(false);
  const [hoverCollections, setHoverCollections] = useState(false);
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
  const getBalance = () => {
    getMaticBalance()
      .then((response) => {
        console.log("response from getting matic balance: ", response);
        response.data.balanceInUsd &&
          setBalanceUSD(response.data?.balanceInUsd);
        response.data.maticBalance &&
          setBalanceMatic(response.data?.maticBalance);
      })
      .catch((error) => {
        console.log("Error from getting balance: ", error);
      });
  };
  useEffect(() => {
    getBalance();
    let version = Cookies.get("Version");
    getAdminCountsVersioned(version)
      .then((response) => {
        setTotalNFTs(response.data.NFTscount);
        setTotalCollections(response.data.Collectionscount);
      })
      .catch((error) => {
        console.log("Error from getting admin counts: ", error);
      });
  }, []);
  const handleStripeOnBoarding = async () => {
    try {
      const response = await stripeOnBoarding();
      if (!response.data.success) {
        window.location.replace(response.data.link);
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage(
          "OnBoarding Process already completed."
        );
        setSnackbarSeverity("error");
      }
      console.log("Response of stripe on boarding ", response);
    } catch (error) {
      console.log("Unable to get stripe on boarding detail: ", error.response);
    }
  };
  const handleStripeLogin = async () => {
    try {
      const response = await stripeLogin();
      window.location.replace(response.data.link);
      console.log("Response of stripe login ", response);
    } catch (error) {
      console.log("Unable to get stripe login detail: ", error.response);
      if (
        error.response.data.message ===
        "Cannot create a login link for an account that has not completed onboarding."
      ) {
        setSnackbarOpen(true);
        setSnackbarMessage(
          "Cannot create a login link for an account that has not completed onboarding."
        );
        setSnackbarSeverity("error");
      }
    }
  };
  useEffect(() => {
    props.setActiveTab({
      dashboard: "active",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);

  return (
    <>
      <div className="page-header mt-4 mt-lg-2 pt-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome Admin!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" style={{ color: "#999" }}>
                Dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-12">
          <div className="row">
            <div className="col-12 mb-3" style={{ textAlign: "right" }}>
              <button
                className="newTemplateBtn mb-3 mr-2"
                onClick={handleStripeOnBoarding}
                style={{
                  backgroundColor: "#000",
                  fontSize: "1.2rem",
                  padding: "15px",
                }}
              >
                Stripe Onboarding
              </button>
              <button
                className="newTemplateBtn mb-3 mr-2"
                onClick={handleStripeLogin}
                style={{
                  backgroundColor: "#000",
                  fontSize: "1.2rem",
                  padding: "15px",
                }}
              >
                Stripe Login
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
              <div style={cardContainerStyle}>
                <DisplayNumbersAndContentCard
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  linkTo={`${props.match}/myNFTs`}
                  hoverH4={
                    hover
                      ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                      : "totalNftsAdminDashHeading"
                  }
                  hoverH1={
                    hover
                      ? "totalNftsAdminDashCountHover"
                      : "totalNftsAdminDashCount"
                  }
                  content={totalNFTs}
                  message="Total NFTs"
                  icon={<ListAltIcon />}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
              <div style={cardContainerStyle}>
                <DisplayNumbersAndContentCard
                  onMouseEnter={() => setHoverCollections(true)}
                  onMouseLeave={() => setHoverCollections(false)}
                  linkTo={`${props.match}/myCollection`}
                  hoverH4={
                    hoverCollections
                      ? "totalCollectionsAdminDashHeadingHover totalCollectionsAdminDashHeading"
                      : "totalCollectionsAdminDashHeading"
                  }
                  hoverH1={
                    hoverCollections
                      ? "totalCollectionsAdminDashCountHover"
                      : "totalCollectionsAdminDashCount"
                  }
                  content={totalCollections}
                  message="Total Collections"
                  icon={<i className="fas fa-layer-group pr-1"></i>}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
              <div style={cardContainerStyle}>
                <AdminBalanceCard
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  linkTo={``}
                  hoverH4={
                    hover
                      ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                      : "totalNftsAdminDashHeading"
                  }
                  hoverH1={
                    hover ? "superAdminBalanceHover" : "superAdminBalance"
                  }
                  balanceUSD={balanceUSD}
                  balanceMatic={balanceMatic}
                  message="Balance"
                  icon={<CurrencyExchangeIcon />}
                />
              </div>
            </div>
          </div>
        </div>
        <NotificationSnackbar
          open={snackbarOpen}
          handleClose={handleSnackbarClose}
          severity={snackbarSeverity}
          message={snackbarMessage}
        />
      </div>
    </>
  );
}

export default AdminDashboardDefaultScreen;
