import AccountCircle from '@material-ui/icons/AccountCircle';
import ListAltIcon from "@material-ui/icons/ListAlt";
import Cookies from "js-cookie";
import React from "react";
import { Link, useHistory } from "react-router-dom";

function AdminSidebar(props) {
  let history = useHistory();
  let handleLogout = (e) => {
    sessionStorage.clear();
    sessionStorage.removeItem("Address");
    sessionStorage.removeItem("Authorization");
    Cookies.remove("Version");

    history.push({ pathname: '/' });
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
              <Link to={`/dashboard`}>
                <i className="fa fa-home"></i> <span>Dashboard</span>
              </Link>
            </li>
            <li className={props.activeTab.myNFTs}>
              <Link to={`/dashboard/myNFTs`}>
                <ListAltIcon /> <span>My NFTs</span>
              </Link>
            </li>
            <li className="menu-title">
              <span>SETTINGS</span>
            </li>
            <li className={props.activeTab.profile}>
              <Link to={`/user/settings`}>
                <AccountCircle /> <span>Profile</span>
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
