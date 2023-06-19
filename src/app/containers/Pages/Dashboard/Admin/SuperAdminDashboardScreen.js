import React, { useEffect, useState } from "react";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import { useResolvedPath } from "react-router-dom";
import SuperAdminBalanceCard from "../../../../components/Cards/SuperAdminBalanceCard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  getAdminCountsV1,
  getAdminCountsV2,
  getSuperAdminBalance,
} from "../../../../components/API/AxiosInterceptor";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";

const SuperAdminDashboardScreen = (props) => {
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalVerifiedAdmins, setTotalVerifiedAdmins] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [superAdminBalance, setSuperAdminBalance] = useState({
    usd: 0,
    matic: { inMatic: 0, inWei: 0 },
  });
  const [masterWalletBalance, setMasterWalletBalance] = useState({
    usd: 0,
    matic: { inMatic: 0, inWei: 0 },
  });
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const path = useResolvedPath("").pathname;
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
    setIsLoadingBalance(true);
    getSuperAdminBalance()
      .then((response) => {
        console.log("Response from getting super admin balance: ", response);
        setMasterWalletBalance(response.data.masterWallet);
        setSuperAdminBalance(response.data.superAdmin);
        setIsLoadingBalance(false);
      })
      .catch((error) => {
        console.log("Error from getting super admin balance: ", error);
        setSnackbarMessage("Error fetching balance");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setIsLoadingBalance(false);
      });
  };

  const getTotalAndVerifiedAdmins = async () => {
    let verified = 0;
    let total = 0;
    await getAdminCountsV1()
      .then((response) => {
        console.log("Response from getting admin counts V1: ", response);
        verified = response.data.counts.totalVerifiedAdmins + verified;
        total = response.data.counts.totalAdmins + total;
      })
      .catch((error) => {
        console.log("Error from getting admin counts V1: ", error);
      });

    await getAdminCountsV2()
      .then((response) => {
        console.log("Response from getting admin counts V2: ", response);
        verified = response.data.counts.totalVerifiedAdmins + verified;
        total = response.data.counts.totalAdmins + total;
      })
      .catch((error) => {
        console.log("Error from getting admin counts V2: ", error);
      });

    setTotalAdmins(total);
    setTotalVerifiedAdmins(verified);
  };

  useEffect(() => {
    getBalance();
    getTotalAndVerifiedAdmins();
    props.setActiveTab({
      dashboard: "active",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      verifiedAccounts: "",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
      adminStats: "",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome SuperAdmin!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" style={{ color: "#999" }}>
                Dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
          <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
            <SuperAdminBalanceCard
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              linkTo={`${path}`}
              hoverH4={
                hover
                  ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                  : "totalNftsAdminDashHeading"
              }
              hoverH1={hover ? "superAdminBalanceHover" : "superAdminBalance"}
              content={masterWalletBalance}
              message="Master Wallet Balance"
              icon={<CurrencyExchangeIcon />}
              isLoadingBalance={isLoadingBalance}
            />
          </div>
          <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
            <SuperAdminBalanceCard
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              linkTo={`${path}`}
              state={{ current: "enabled" }}
              hoverH4={
                hover
                  ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                  : "totalNftsAdminDashHeading"
              }
              hoverH1={hover ? "superAdminBalanceHover" : "superAdminBalance"}
              content={superAdminBalance}
              message="Super Admin Balance"
              icon={<CurrencyExchangeIcon />}
              isLoadingBalance={isLoadingBalance}
            />
          </div>
          <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
            <DisplayNumbersAndContentCard
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              linkTo={`${path}`}
              state={{ current: "disabled" }}
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
              content={totalAdmins}
              message="Total Admins"
              icon={<ListAltIcon />}
            />
          </div>
          <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
            <DisplayNumbersAndContentCard
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              linkTo={`${path}`}
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
              content={totalVerifiedAdmins}
              message="Total Verified"
              icon={<ListAltIcon />}
            />
          </div>
        </div>
        <CircularBackdrop open={open} />
        <NotificationSnackbar
          open={snackbarOpen}
          handleClose={handleSnackbarClose}
          severity={snackbarSeverity}
          message={snackbarMessage}
        />
      </div>
    </div>
  );
};

export default SuperAdminDashboardScreen;
