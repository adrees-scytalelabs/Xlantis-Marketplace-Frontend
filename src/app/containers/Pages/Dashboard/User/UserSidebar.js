import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotificationsIcon from "@mui/icons-material/Notifications";

function AdminSidebar(props) {
  let navigate = useNavigate();
  let handleLogout = (e) => {
    sessionStorage.removeItem("Address");
    sessionStorage.removeItem("Authorization");
    Cookies.remove("InfoAdded");
    Cookies.remove("Verified");
    Cookies.remove("Version");
    Cookies.remove("PNT");
    sessionStorage.clear();

    navigate({ pathname: "/" });
    window.location.reload(false);
  };

  return (
    <div
      className="sidebar"
      id="sidebar"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>
            <li className={props.activeTab.dashboard}>
              <Link to={`/dashboard`} state={{notification:props?.notification}}>
                <i className="fa fa-home"></i> <span>Dashboard</span>
            </Link>
            </li>
            <li className={props.activeTab.notification}>
              <Link to={`/dashboard/notifications`} state={{notification:props?.notification}}>
                <NotificationsIcon /> <span>Notifications</span>
              </Link>
            </li>
            <li className={props.activeTab.myNFTs}>
              <Link to={`/dashboard/myNFTs`}>
                <ListAltIcon /> <span>My NFTs</span>
              </Link>
            </li>
            <li className={props.activeTab.topUp}>
              <Link to={`/dashboard/topUp`}>
                <AttachMoneyIcon /> <span>Top Up</span>
              </Link>
            </li>
            <li className={props.activeTab.topupHistory}>
              <Link to={`/dashboard/topup-history`}>
                <HistoryIcon /> <span>Top-up History</span>
              </Link>
            </li>
            <li className="menu-title">
              <span>SETTINGS</span>
            </li>
            <li className={props.activeTab.profile}>
              <Link to={`/user/settings`}>
                <AccountCircleIcon /> <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to={"/"} onClick={handleLogout}>
                <i className="fa fa-sign-out-alt"></i> <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
