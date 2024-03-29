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
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";

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
  const [adminBalance, setAdminBalance] = useState(0);
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
        response.data.walletBalance?.InUsd &&
        setAdminBalance(response.data?.usdBalance?.InUsd);
        response.data.walletBalance?.InUsd &&
          setBalanceUSD(response.data?.walletBalance?.InUsd);
        response.data.walletBalance?.InMatic &&
          setBalanceMatic(response.data?.walletBalance?.InMatic);
      })
      .catch((error) => {
        console.log("Error from getting balance: ", error.response);
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
        setSnackbarMessage("OnBoarding Process already completed.");
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
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} setIsStripeLogin={props.setIsStripeLogin} />
      )}
      <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-12">
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
                  message="Wallet Balance"
                  showMatic={true}
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
