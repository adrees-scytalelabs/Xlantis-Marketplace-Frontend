import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";

function SuperAdminSidebar(props) {
  let handleLogout = (e) => {
    Cookies.remove("Authorization");
    localStorage.removeItem("Address");
    // web3Modal.clearCachedProvider();

    // setTimeout(() => { }, 1);
    window.location.reload(false);
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
              <Link to={`${props.match.url}`} className="sidebarLink">
                <i className="fa fa-home"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li className={props.activeTab.accountApproval}>
              <Link
                to={`${props.match.url}/accountApproval`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Approve Accounts</span>
              </Link>
            </li>
            <li className={props.activeTab.manageAccounts}>
              <Link
                to={`${props.match.url}/manageAccounts`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Manage Accounts</span>
              </Link>
            </li>
            <li className={props.activeTab.accounts}>
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
