import Cookies from "js-cookie";
import React, {  useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Route, Routes, useResolvedPath } from "react-router-dom";
import "../../../assets/css/adminStyle.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";
import patient from "../../../assets/img/patients/patient.jpg";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import AddNFT from "./Admin/AddNFT";
import AdminDashboardDefaultScreen from "./Admin/AdminDashboardDefaultScreen";
import AdminSidebar from "./Admin/AdminSidebar";
import AuctionNFT from "./Admin/AuctionNFT";
import CollectionNfts from "./Admin/CollectionNfts";
import DropApproval from "./Admin/DropApproval";
import DropNfts from "./Admin/DropNfts";
import DropSingleNFT from "./Admin/DropSingleNFT";
import MarketPlace from "./Admin/MarketPlace";
import MyCollection from "./Admin/MyCollection";
import MyDropNFTs from "./Admin/MyDropNfts";
import MyDrops from "./Admin/MyDrops";
import MyNFTs from "./Admin/MyNFTs";
import NFTBuy from "./Admin/NFTBuy";
import NewCollection from "./Admin/NewCollection";
import NewDrop from "./Admin/NewDrop";
import NewNFT from "./Admin/NewNFT";
import TopUp from "./Admin/TopUp";
import SingleNftDetail from "./Admin/singleNftDetail";

function AdminDashboard(props) {
  console.log("propsprops", props);
  // const path = useResolvedPath("").pathname;
  const path = useResolvedPath("").pathname;
  console.log("path", path);
  const [menuOpenedClass, setMenuOpenedClass] = useState();
  const [slideNavClass, setSlideNavClass] = useState();

  let handleSlideNav = (e) => {
    e.preventDefault();
    if (slideNavClass !== "" && menuOpenedClass !== "") {
      setMenuOpenedClass("");
      setSlideNavClass("");
    } else {
      setMenuOpenedClass("menu-opened");
      setSlideNavClass("slide-nav");
    }
  };

  const [activeTab, setActiveTab] = useState({
    dashboard: "active",
    newCollection: "",
    myCollections: "",
    newNFT: "",
    myNFTs: "",
    marketplace: "",
    newDrop: "",
    myDrops: "",
    topUp: "",
  });

  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      <div className={`admin-header ${menuOpenedClass}`}>
        <div className="header-left">
          <a href="/" className="navbar-brand logo" style={{ width: "210px" }}>
            <img
              src={Logo}
              alt="Logo"
              width="120"
              height="34"
              style={{
                marginTop: "16px",
                width: "210px",
                height: "30px",
                padding: "5px 15px",
              }}
            />
          </a>
          <a href="/" className="logo logo-small" style={{ width: "210px" }}>
            <img
              src={Logo}
              alt="Logo"
              width="90"
              style={{
                marginTop: "16px",
                width: "210px",
                height: "30px",
                padding: "5px 15px",
              }}
            />
          </a>
        </div>
        <a
          href="/"
          className="mobile_btn"
          id="mobile_btn"
          onClick={handleSlideNav}
        >
          <i className="fa fa-bars"></i>
        </a>
        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "transparent",
                  border: "0",
                  paddingTop: "15px",
                }}
              >
                <span className="admin-img">
                  <img
                    className="avatar-sm rounded-circle"
                    src={patient}
                    width="50"
                    alt="Ryan Taylor"
                  />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                alignRight="true"
                style={{ backgroundColor: "black" }}
              >
                <Dropdown.Item>
                  <Link to="/dashboard" style={{ width: "100%" }}>
                    Dashboard
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/settings" style={{ width: "100%" }}>
                    Profile Settings
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      sessionStorage.clear();
                      sessionStorage.removeItem("Address");
                      Cookies.remove("PNT");
                      window.location.reload(false);
                    }}
                    to="/"
                    style={{ width: "100%" }}
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>

      <AdminSidebar
        match={path}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Routes>
            <Route path={`/`} element={
              <AdminDashboardDefaultScreen
                match={path}
                setActiveTab={setActiveTab} />
            }
            />

            <Route path={`newNFT`}
              element={<NewNFT setActiveTab={setActiveTab} />}
            />
            <Route exact path={`myNFTs`}
              element={<MyNFTs setActiveTab={setActiveTab} />}
            />

            <Route exact path={`dropApproval`}
              element={<DropApproval setActiveTab={setActiveTab} />}
            />
            <Route exact path={`topUp`}
              element={<TopUp setActiveTab={setActiveTab} />}
            />

            <Route exact path={`newDrop`}
              element={<NewDrop setActiveTab={setActiveTab} />}
            />
            <Route exact path={`newDrop/addNft`}
              element={<AddNFT setActiveTab={setActiveTab} />}
            />

            <Route exact path={`myDrops`}
              element={<MyDrops setActiveTab={setActiveTab} />}
            />

            <Route exact path={`myDrops/nfts`}
              element={<MyDropNFTs setActiveTab={setActiveTab} />}
            />

            <Route exact path={`myDrops/nfts/singleNft`}
              element={<DropSingleNFT setActiveTab={setActiveTab} />}
            />

            <Route exact path={`createNewCollection`}
              element={<NewCollection setActiveTab={setActiveTab} />}
            />
            <Route exact path={`myCollection`}
              element={<MyCollection setActiveTab={setActiveTab} />}
            />

            <Route exact path={`nftDetail/:nftId`}
              element={<SingleNftDetail setActiveTab={setActiveTab} />}
            />


            <Route exact path={`collection/nfts/:collectionId`}
              element={<CollectionNfts setActiveTab={setActiveTab} />}
            />
            <Route exact path={`marketPlace`}
              element={<MarketPlace setActiveTab={setActiveTab} />}
            />

            <Route exact path={`marketPlace/drops/nfts`}
              element={<DropNfts setActiveTab={setActiveTab} />}
            />
            <Route exact path={`marketPlace/drops/nfts/buy`}
              element={<NFTBuy setActiveTab={setActiveTab} />}
            />

            <Route exact path={`marketPlace/:dropId/:nftId`}
              element={<AuctionNFT setActiveTab={setActiveTab} />}
            />

            <Route path={`/`}
              element={<AdminDashboardDefaultScreen
                match={path}
                setActiveTab={setActiveTab}
              />}
            />

          </Routes>
        </div>
      </div>
    </div >
  );
}

export default AdminDashboard;
