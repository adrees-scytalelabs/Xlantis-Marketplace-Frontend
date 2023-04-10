import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import StorageIcon from "@material-ui/icons/Storage";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BusinessIcon from "@material-ui/icons/Business";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useState } from "react";
import { useEffect } from "react";

function AdminSidebar(props) {
  const [versionB, setVersionB] = useState("");
  let handleLogout = (e) => {
    sessionStorage.clear();
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("Address");
    Cookies.remove("Version");

    window.location.reload(false);
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));
  }, []);

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
            <li className={props.activeTab.newCollection}>
              <Link
                to={`${props.match.url}/createNewCollection`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>New Collection</span>
              </Link>
            </li>
            <li className={props.activeTab.myCollections}>
              <Link
                to={`${props.match.url}/myCollection`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Collections</span>
              </Link>
            </li>
            <li className={props.activeTab.newNFT}>
              <Link to={`${props.match.url}/newNFT`} className="sidebarLink">
                <i className="fa fa-file-medical"></i> <span>New NFT</span>
              </Link>
            </li>
            <li className={props.activeTab.myNFTs}>
              <Link to={`${props.match.url}/myNFTs`} className="sidebarLink">
                <ListAltIcon /> <span>My NFTs</span>
              </Link>
            </li>
            <li className={props.activeTab.marketplace}>
              <Link
                to={`${props.match.url}/marketPlace`}
                className="sidebarLink"
              >
                <BusinessIcon /> <span>MarketPlace</span>
              </Link>
            </li>
            {versionB !== "v1-sso" ? (
              <li className={props.activeTab.dropApproval}>
                <Link to={`${props.match.url}/dropApproval`}>
                  <i className="fas fa-check-circle"></i>{" "}
                  <span>Drop Approval</span>
                </Link>
              </li>
            ) : null}

            <li className={props.activeTab.newDrop}>
              <Link to={`${props.match.url}/newDrop`}>
                <i className="fas fa-plus"></i> <span>New Drop</span>
              </Link>
            </li>
            <li className={props.activeTab.topUp}>
              <Link to={`${props.match.url}/topUp`}>
                <AttachMoneyIcon></AttachMoneyIcon> <span>Top Up</span>
              </Link>
            </li>
            <li className={props.activeTab.myDrops}>
              <Link to={`${props.match.url}/myDrops`}>
                <StorageIcon></StorageIcon> <span>My Drops</span>
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

export default AdminSidebar;
