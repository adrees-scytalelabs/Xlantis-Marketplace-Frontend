import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import "../../../../assets/css/superAdmin.css";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CategoryIcon from "@mui/icons-material/Category";

function SuperAdminSidebar(props) {
  const [style, setStyle] = useState("dropdown-container1");
  const [propertiesStyle, setPropertiesStyle] = useState("dropdown-container1");
  const [ssoStyle, setSSOStyle] = useState("");
  const [walletStyle, setWalletStyle] = useState("");
  const [templateStyle, setTemplateStyle] = useState("");
  const [SavedStyle, setSavedStyle] = useState("");
  const path = useResolvedPath("").pathname;
  let changeStyle = (e) => {
    if (style === "dropdown-container1") {
      setStyle("dropdown-container2");
    } else {
      setStyle("dropdown-container1");
    }
  };
  let changeStyle1 = (e) => {
    setStyle("dropdown-container1");
    setSSOStyle("");
    setWalletStyle("");
    if (propertiesStyle === "dropdown-container3") {
      setPropertiesStyle("dropdown-container4");
    } else {
      setPropertiesStyle("dropdown-container3");
    }
  };
  let subMenuSSOClick = (e) => {
    setSSOStyle("ssoRowClick");
    setWalletStyle("");
  };
  let subMenuWalletClick = (e) => {
    setSSOStyle("");
    setWalletStyle("walletRowClick");
  };
  let templateClick = (e) => {
    setTemplateStyle("ssoRowClick");
    setSavedStyle("");
  };
  let savedClick = (e) => {
    setTemplateStyle("");
    setSavedStyle("walletRowClick");
  };
  let closedDropdown = (e) => {
    if (style === "dropdown-container2") {
      setStyle("dropdown-container1");
      setSSOStyle("");
      setWalletStyle("");
    } else if (style === "dropdown-container4") {
      setStyle("dropdown-container3");
      setTemplateStyle("");
      setSavedStyle("");
    }
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
    if (props.activeTab.sso === "active") {
      setStyle("dropdown-container2");
    } else if (props.activeTab.wallet === "active") {
      setStyle("dropdown-container2");
    } else if (props.activeTab.sso === "" && props.activeTab.wallet === "") {
      setStyle("dropdown-container1");
    }
    if (props.activeTab.template === "active") {
      setPropertiesStyle("dropdown-container4");
    }
    if (props.activeTab.saved === "active") {
      setPropertiesStyle("dropdown-container4");
    }
    if (props.activeTab.template === "" && props.activeTab.saved === "") {
      setPropertiesStyle("dropdown-container3");
    }
  }, [props.activeTab]);

  return (
    <div className="sidebar backgroundDefault" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>
            <li className={props.activeTab.dashboard} onClick={closedDropdown}>
              <Link to={`${path}`} className="sidebarLink">
                <i className="fa fa-home"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li className={props.activeTab.adminStats} onClick={closedDropdown}>
              <Link to={`${path}/adminStats`} className="sidebarLink">
                <AnalyticsIcon />
                <span>Admin Stats</span>
              </Link>
            </li>
            <li className={props.activeTab.earnings} onClick={closedDropdown}>
              <Link to={`${path}/earnings`} className="sidebarLink">
                <CurrencyExchangeIcon />
                <span>Earnings</span>
              </Link>
            </li>
            <li
              className={props.activeTab.manageAccounts}
              onClick={changeStyle}
            >
              <Link to={`${path}/manageAccounts`} className="sidebarLink">
                <ManageAccountsIcon />
                <span>Manage Accounts</span>
                <i className="fa fa-caret-down"></i>
              </Link>
              <div className={`${style} container`}>
                <div
                  className={`${ssoStyle} row ssoRow d-flex justify-content-center cursor-pointer`}
                  onClick={subMenuSSOClick}
                >
                  <li className={`${props.activeTab.sso} ssoSidebar`}>
                    <Link to={`${path}/accountApproval`}>
                      Approval Requests
                    </Link>
                  </li>
                </div>
                <div
                  className={`${walletStyle} row walletRow d-flex justify-content-center`}
                  onClick={subMenuWalletClick}
                >
                  <li className={`${props.activeTab.wallet}`}>
                    <Link to={`${path}/manageAccounts/Accounts`}>Accounts</Link>
                  </li>
                </div>
              </div>
            </li>
            <li className={props.activeTab.properties} onClick={changeStyle1}>
              <Link to={`${path}/properties`} className="sidebarLink">
                <i className="fas fa-layer-group"></i>
                <span>Properties</span>
                <i className="fa fa-caret-down"></i>
              </Link>
              <div className={`${propertiesStyle} container`}>
                <div
                  className={`${templateStyle} row ssoRow d-flex justify-content-center`}
                  onClick={templateClick}
                >
                  <li className={`${props.activeTab.template} ssoSidebar`}>
                    <Link to={`${path}/properties/createTemplate`}>
                      Create Template
                    </Link>
                  </li>
                </div>
                <div
                  className={`${SavedStyle} row walletRow d-flex justify-content-center`}
                  onClick={savedClick}
                >
                  <li className={`${props.activeTab.saved}`}>
                    <Link
                      to={`${path}/properties/savedTemplate`}
                      className="wallet-sidebar"
                    >
                      Saved Template
                    </Link>
                  </li>
                </div>
              </div>
            </li>
            <li className={props.activeTab.platformFee}>
              <Link to={`${path}/platformFee`} className="sidebarLink">
                <AttachMoneyIcon></AttachMoneyIcon> <span>Platform Fee</span>
              </Link>
            </li>
            <li className={props.activeTab.categories}>
              <Link to={`${path}/earnings`} className="sidebarLink">
              <CategoryIcon />
                <span>Categories</span>
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
    </div>
  );
}

export default SuperAdminSidebar;
