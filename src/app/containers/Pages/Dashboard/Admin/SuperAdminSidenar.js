import Cookies from "js-cookie";
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/css/superAdmin.css";

function SuperAdminSidebar(props) {
  const [style, setStyle] = useState("dropdown-container1");
  let changeStyle = (e) => {
    if (style === "dropdown-container1") {
      setStyle("dropdown-container2");
    } else {
      setStyle("dropdown-container1");
    }
  };
  let closedDropdown = (e) => {
    setStyle("dropdown-container1");
  };
  let handleLogout = (e) => {
    sessionStorage.clear();
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("Address");
    Cookies.remove("Version");

    // web3Modal.clearCachedProvider();

    // setTimeout(() => { }, 1);
    window.location.reload(false);
  };
  useEffect(() => {
   
   if(props.activeTab.sso==='active'){
    setStyle("dropdown-container2");
   }
   else if(props.activeTab.wallet==='active'){
    setStyle("dropdown-container2");
   }
   else if(props.activeTab.sso==="" && props.activeTab.wallet===""){
    setStyle("dropdown-container1");
   }
   console.log("Active Tab",props.activeTab);
    // eslint-disable-next-line
  });

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
                  className="row ssoRow d-flex justify-content-center"
                  style={{}}
                >
                  <li
                    className={`${props.activeTab.sso} ssoSidebar`}
                  >
                    <Link to={`${props.match.url}/manageAccounts/SSO` } >
                      SSO
                    </Link>
                  </li>
                </div>
                <div
                  className="row walletRow d-flex justify-content-center"
                  style={{}}
                >
                  <li className={`${props.activeTab.wallet}`}>
                    <Link
                      to={`${props.match.url}/manageAccounts/Wallet` }
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
