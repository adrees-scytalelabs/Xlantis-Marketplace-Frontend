import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMaticBalance, topUpAmount } from "../API/AxiosInterceptor";
import CircularBackdrop from "../Backdrop/Backdrop";
import AdminBalanceCard from "../Cards/AdminBalanceCard";
import TopUpForm from "../Forms/TopUpForm";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";
import StripeAccountMessageCard from "../MessageCards/StripeAccountMessageCard";

function TopUp(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [hover, setHover] = useState(false);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let location = useLocation();
  const [amount, setAmount] = useState(0.5);
  const [balanceUSD, setBalanceUSD] = useState(0);
  const [balanceMatic, setBalanceMatic] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("session_id");
    const sessionId = localStorage.getItem("sessionId");
    if (id != null) {
      if (sessionId == id) {
        const active = searchParams.get("active");
        if (active == "true") {
          let variant = "success";
          setSnackbarMessage("Top Up Successfully.");
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
          setSnackbarMessage("Top Up Unsccessfully.");
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
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "active",
    });
  }, []);

  const getBalance = () => {
    setIsLoadingBalance(true);
    getMaticBalance()
      .then((response) => {
        console.log("response from getting matic balance: ", response);
        response.data.balanceInUsd &&
          setBalanceUSD(response.data?.balanceInUsd);
        response.data.maticBalance &&
          setBalanceMatic(response.data?.maticBalance);
        setIsLoadingBalance(false);
      })
      .catch((error) => {
        console.log("Error from getting balance: ", error);
        setSnackbarMessage("Error Fetching Balance");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setIsLoadingBalance(false);
      });
  };

  useEffect(() => {
    getBalance();
  }, []);

  const handleTopUpAmount = (e) => {
    handleShowBackdrop();
    e.preventDefault();
    let data = {
      amount: amount,
    };
    topUpAmount(data)
      .then((response) => {
        localStorage.setItem("sessionId", response.data.checkoutSessionId);
        window.location.replace(response.data.sessionUrl);
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          handleCloseBackdrop();
          let variant = "error";
          setSnackbarMessage("Something went wrong.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        }
      });
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Top Up</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Top Up</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} setIsStripeLogin={props.setIsStripeLogin} />
      )}
      <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
        <AdminBalanceCard
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          linkTo={``}
          hoverH4={
            hover
              ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
              : "totalNftsAdminDashHeading"
          }
          hoverH1={hover ? "superAdminBalanceHover" : "superAdminBalance"}
          balanceUSD={balanceUSD}
          balanceMatic={balanceMatic}
          message="Balance"
          icon={<CurrencyExchangeIcon />}
          isLoadingBalance={isLoadingBalance}
        />
      </div>
      <TopUpForm
        amount={amount}
        setAmount={setAmount}
        handleTopUpAmount={handleTopUpAmount}
      />
      <CircularBackdrop open={open} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default TopUp;
