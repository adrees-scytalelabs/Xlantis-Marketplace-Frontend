import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import StorageIcon from '@material-ui/icons/Storage';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocalOffer from '@material-ui/icons/LocalOffer';

function SettingsSidebar(props) {

    console.log("props", props);
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
              <span>Settings</span>
            </li>
            <li className={props.activeTab.profile}>
              <Link to={`/user/settings`}>
                <AccountCircle /> <span>Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SettingsSidebar;
