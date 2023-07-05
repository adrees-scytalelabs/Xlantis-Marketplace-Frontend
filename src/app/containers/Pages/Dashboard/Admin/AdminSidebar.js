import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorageIcon from "@mui/icons-material/Storage";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import CategoryIcon from "@mui/icons-material/Category";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AllTransactions from "./AllTransactions";
import {
  stripeAccountStatus,
  stripeLogin,
  stripeOnBoarding,
} from "../../../../components/API/AxiosInterceptor";
import DropsCategories from "./DropsCategories";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";

function AdminSidebar(props) {
  const [versionB, setVersionB] = useState("");
  const [open, setOpen] = useState(false);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let handleLogout = (e) => {
    sessionStorage.removeItem("Address");
    sessionStorage.removeItem("Authorization");
    Cookies.remove("InfoAdded");
    Cookies.remove("Verified");
    Cookies.remove("Version");
    Cookies.remove("PNT");
    sessionStorage.clear();
    window.location.reload(false);
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));
  }, []);

  const handleStripeLogin = () => {
    stripeLogin()
      .then((response) => {
        console.log("Response from stripe login: ", response);
        window.location.replace(response?.data?.link);
        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log("Error from stripe login: ", error);
        handleCloseBackdrop();
      });
  };

  const handleStripeOnBoarding = () => {
    stripeOnBoarding()
      .then((response) => {
        console.log("Response from stripe on boarding: ", response);
        window.location.replace(response?.data?.onboardingLink?.url);
      })
      .catch((error) => {
        console.log("Error from stripe on boarding: ", error);
      });
  };

  const checkStripeStatus = () => {
    handleShowBackdrop();
    stripeAccountStatus()
      .then((response) => {
        console.log("Response from checking strip account status: ", response);
        if (response?.data?.detailsSubmitted) {
          handleStripeLogin();
        } else {
          handleStripeOnBoarding();
        }
      })
      .catch((error) => {
        console.log("Error from checking strip account status: ", error);
        handleCloseBackdrop();
      });
  };

  return (
    <div className="sidebar backgroundDefault" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>
            <li className={props.activeTab.dashboard}>
              <Link to={`${props.match}`} className="sidebarLink">
                <i className="fa fa-home"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li className={props.activeTab.notifications}>
              <Link to={`${props.match}/notifications`} className="sidebarLink">
                <NotificationsIcon /> <span>Notifications</span>
              </Link>
            </li>
            <li className={props.activeTab.earnings}>
              <Link to={`${props.match}/earnings`} className="sidebarLink">
                <CurrencyExchangeIcon />
                <span>Earning</span>
              </Link>
            </li>
            <li className={props.activeTab.newCollection}>
              <Link
                to={`${props.match}/createNewCollection`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>New Collection</span>
              </Link>
            </li>
            <li className={props.activeTab.myCollections}>
              <Link to={`${props.match}/myCollection`} className="sidebarLink">
                <i className="fas fa-layer-group"></i>
                <span>My Collections</span>
              </Link>
            </li>
            <li className={props.activeTab.newNFT}>
              <Link to={`${props.match}/newNFT`} className="sidebarLink">
                <i className="fa fa-file-medical"></i> <span>New NFT</span>
              </Link>
            </li>
            <li className={props.activeTab.myNFTs}>
              <Link to={`${props.match}/myNFTs`} className="sidebarLink">
                <ListAltIcon /> <span>My NFTs</span>
              </Link>
            </li>
            <li className={props.activeTab.templates}>
              <Link to={`${props.match}/templates`} className="sidebarLink">
                <i className="fa fa-file-medical"></i> <span>Templates</span>
              </Link>
            </li>
            <li className={props.activeTab.marketplace}>
              <Link
                to={`${props.match}/${props.domain}/marketPlace`}
                className="sidebarLink"
              >
                <BusinessIcon /> <span>MarketPlace</span>
              </Link>
            </li>
            {/* <li className={props.activeTab.allTransactions}>
              <Link to={`${props.match}/allTransactions`} className="sidebarLink">
                <ListAltIcon /> <span>All Transactions</span>
              </Link>
            </li> */}
            {versionB !== "v1-sso" ? (
              <li className={props.activeTab.dropApproval}>
                <Link to={`${props.match}/dropApproval`}>
                  <i className="fas fa-check-circle"></i>{" "}
                  <span>Drop Approval</span>
                </Link>
              </li>
            ) : null}

            <li className={props.activeTab.newDrop}>
              <Link to={`${props.match}/newDrop`}>
                <i className="fas fa-plus"></i> <span>New Drop</span>
              </Link>
            </li>
            <li className={props.activeTab.myDrops}>
              <Link to={`${props.match}/myDrops`}>
                <StorageIcon></StorageIcon> <span>My Drops</span>
              </Link>
            </li>
            <li className={props.activeTab.categories}>
              <Link to={`${props.match}/dropsCategories`}>
                <CategoryIcon /> <span>Categories</span>
              </Link>
            </li>
            <li
              className={props.activeTab.stripeAccount}
              onClick={checkStripeStatus}
            >
              <a href="#">
                <AttachMoneyIcon></AttachMoneyIcon> <span>Stripe Account</span>
              </a>
            </li>
            <li className={props.activeTab.topUp}>
              <Link to={`${props.match}/topUp`}>
                <AttachMoneyIcon></AttachMoneyIcon> <span>Top Up</span>
              </Link>
            </li>
            <li className={props.activeTab.topupHistory}>
              <Link to={`${props.match}/topup-history`}>
                <HistoryIcon /> <span>Top-up History</span>
              </Link>
            </li>
            <li className={props.activeTab.balanceSpentHistory}>
              <Link to={`${props.match}/balance-spent-history`}>
                <HistoryIcon /> <span>Balance Spent Hsitory</span>
              </Link>
            </li>
            <li className="menu-title mt-5">
              <span>Settings</span>
            </li>
            <li>
              <Link to={"/"} onClick={handleLogout} className="sidebarLink">
                <i className="fa fa-sign-out-alt"></i> <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <CircularBackdrop open={open} />
    </div>
  );
}

export default AdminSidebar;
