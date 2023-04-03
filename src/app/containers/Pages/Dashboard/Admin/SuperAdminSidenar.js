import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/css/superAdmin.css";

function SuperAdminSidebar(props) {
  const [style, setStyle] = useState("dropdown-container1");
  const [propertiesStyle, setPropertiesStyle] = useState("dropdown-container1");
  const [ssoStyle, setSSOStyle] = useState("");
  const [walletStyle, setWalletStyle] = useState("");
  const [templateStyle, setTemplateStyle] = useState("");
  const [SavedStyle, setSavedStyle] = useState("");
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
    if(style==="dropdown-container2"){
      setStyle("dropdown-container1");
      setSSOStyle("");
      setWalletStyle("");
    }
    else if(style==="dropdown-container4"){
      setStyle("dropdown-container3");
      setTemplateStyle("");
      setSavedStyle("");
    }
  };
  let handleLogout = (e) => {
    sessionStorage.clear();
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("Address");
    Cookies.remove("Version");
    
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
    } if (props.activeTab.saved === "active") {
      setPropertiesStyle("dropdown-container4");
    } if (props.activeTab.template === "" && props.activeTab.saved === "") {
      setPropertiesStyle("dropdown-container3");
    }
    console.log("Active Tab", props.activeTab);
    
  },[props.activeTab]);

  return (
    <div className="sidebar backgroundDefault" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>
            <li className={props.activeTab.dashboard} onClick={closedDropdown}>
              <Link to={`${props.match.url}`} className="sidebarLink">
                <i className="fa fa-home"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li
              className={props.activeTab.verifiedAccounts}
              onClick={closedDropdown}
            >
              <Link
                to={`${props.match.url}/verifiedAccounts`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Verified Accounts</span>
              </Link>
            </li>
            <li
              className={props.activeTab.accountApproval}
              onClick={closedDropdown}
            >
              <Link
                to={`${props.match.url}/accountApproval`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Approve Accounts</span>
              </Link>
            </li>
            <li
              className={props.activeTab.manageAccounts}
              onClick={changeStyle}
            >
              <Link
                to={`${props.match.url}/manageAccounts`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Manage Accounts</span>
                <i class="fa fa-caret-down"></i>
              </Link>
              <div className={`${style} container`}>
                <div
                  className={`${ssoStyle} row ssoRow d-flex justify-content-center`}
                  onClick={subMenuSSOClick}
                >
                  <li className={`${props.activeTab.sso} ssoSidebar`}>
                    <Link to={`${props.match.url}/manageAccounts/SSO`}>
                      SSO
                    </Link>
                  </li>
                </div>
                <div
                  className={`${walletStyle} row walletRow d-flex justify-content-center`}
                  onClick={subMenuWalletClick}
                >
                  <li className={`${props.activeTab.wallet}`}>
                    <Link
                      to={`${props.match.url}/manageAccounts/Wallet`}
                      className="wallet-sidebar"
                    >
                      Wallet
                    </Link>
                  </li>
                </div>
              </div>
            </li>
            {/* <li className={props.activeTab.manageAccounts}>
              <Link
                to={`${props.match.url}/manageAccounts`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Manage Accounts</span>
              </Link>
            </li> */}
            <li className={props.activeTab.accounts} onClick={closedDropdown}>
              <Link to={`${props.match.url}/Accounts`} className="sidebarLink">
                <i className="fa fa-file-medical"></i> <span>Accounts</span>
              </Link>
            </li>
            <li
              className={props.activeTab.properties}
              onClick={changeStyle1}
            >
              <Link
                to={`${props.match.url}/properties`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Properties</span>
                <i class="fa fa-caret-down"></i>
              </Link>
              <div className={`${propertiesStyle} container`}>
                <div
                  className={`${templateStyle} row ssoRow d-flex justify-content-center`}
                  onClick={templateClick}
                >
                  <li className={`${props.activeTab.template} ssoSidebar`}>
                    <Link to={`${props.match.url}/properties/createTemplate`}>
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
                      to={`${props.match.url}/properties/savedTemplate`}
                      className="wallet-sidebar"
                    >
                      Saved Template
                    </Link>
                  </li>
                </div>
              </div>
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
