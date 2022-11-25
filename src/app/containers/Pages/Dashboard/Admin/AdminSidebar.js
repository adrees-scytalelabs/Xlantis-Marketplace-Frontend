import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import StorageIcon from "@material-ui/icons/Storage";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import BusinessIcon from "@material-ui/icons/Business";

function AdminSidebar(props) {
  let handleLogout = (e) => {
    Cookies.remove("Authorization");
    localStorage.removeItem("Address");
    // setTimeout(() => { }, 1);
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
            <li className={props.activeTab.createNewCollection}>
              <Link
                to={`${props.match.url}/createNewCollection`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>New Collection</span>
              </Link>
            </li>
            <li className={props.activeTab.newCollection}>
              <Link
                to={`${props.match.url}/newCollection`}
                className="sidebarLink"
              >
                <i className="fas fa-layer-group"></i>
                <span>Collection</span>
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
            <li className={props.activeTab.marketPlace}>
              <Link
                to={`${props.match.url}/marketPlace`}
                className="sidebarLink"
              >
                <BusinessIcon /> <span>Market Place</span>
              </Link>
            </li>

            {/* <li className={props.activeTab.newCube}>
              <Link to={`${props.match.url}/newCube`}>
                <i className="fas fa-cube"></i> <span>New Cube</span>
              </Link>
            </li> 
             <li className={props.activeTab.myCubes}>
              <Link to={`${props.match.url}/myCubes`}>
                <i className="fas fa-cubes"></i><span>My Cubes</span>
              </Link>
            </li>  */}

            <li className={props.activeTab.newDrop}>
              <Link to={`${props.match.url}/newDrop`} className="sidebarLink">
                <i className="fas fa-plus"></i> <span>New Drop</span>
              </Link>
            </li>
            <li className={props.activeTab.myDrops}>
              <Link to={`${props.match.url}/myDrops`} className="sidebarLink">
                <StorageIcon></StorageIcon> <span>My Drops</span>
              </Link>
            </li>
            {/* <li className={props.activeTab.newRandomDrop}>
              <Link to={`${props.match.url}/newRandomDrop`}>
                <i className="fas fa-random"></i> <span>New Random Drop</span>
              </Link>
            </li>
            <li className={props.activeTab.newSeason}>
              <Link to={`${props.match.url}/newSeason`}>
                <i className="fas fa-boxes"></i> <span>New Season</span>
              </Link>
            </li>
            <li className={props.activeTab.mySeason}>
              <Link to={`${props.match.url}/mySeason`}>
                <LibraryBooksIcon/> <span>My Season</span>
              </Link>
            </li> */}

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
