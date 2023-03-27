import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import "../../../assets/css/adminStyle.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import patient from "../../../assets/img/patients/patient.jpg";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import Logo from "../../../assets/img/logo.png";
import DropApproval from "./Admin/DropApproval";
import AdminDashboardDefaultScreen from "./Admin/AdminDashboardDefaultScreen";
import AdminSidebar from "./Admin/AdminSidebar";
import UserSettings from "../Users/UserSettings";
import DropCubes from "./Admin/DropsCubes";
import MyCubes from "./Admin/MyCubes";
import MyDrops from "./Admin/MyDrops";
import MyNFTs from "./Admin/MyNFTs";
import MySeasons from "./Admin/MySeasons";
import MyCollection from "./Admin/MyCollection";
import NewCube from "./Admin/NewCube";
import NewDrop from "./Admin/NewDrop";
import NewNFT from "./Admin/NewNFT";
import AddNFT from "./Admin/AddNFT";
import NewSeason from "./Admin/NewSeason";
import RandomDrop from "./Admin/RandomDrop";
import SeasonDrops from "./Admin/SeasonDrops";
import ChangePassword from "./ChangePassword";
import ProfileSetting from "./ProfileSetting";
import CollectionNfts from "./Admin/CollectionNfts";
import CubeNFTs from "./Admin/CubeNFTs";
import NewCollection from "./Admin/NewCollection";
import SingleNftDetail from "./Admin/singleNftDetail";
import DropNfts from "./Admin/DropNfts";
import MarketPlace from "./Admin/MarketPlace";
import NFTBuy from "./Admin/NFTBuy";
import AuctionNFT from "./Admin/AuctionNFT";
import MyDropNFTs from "./Admin/MyDropNfts";
import DropSingleNFT from "./Admin/DropSingleNFT";
import transakSDK from "@transak/transak-sdk";
import TopUp from "./Admin/TopUp";

axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
  "Authorization"
)}`;

function AdminDashboard(props) {
  let { path } = useRouteMatch();
  let [menuOpenedClass, setMenuOpenedClass] = useState();
  let [slideNavClass, setSlideNavClass] = useState();

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

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412", // Your API Key
    environment: "STAGING", // STAGING/PRODUCTION
    defaultCryptoCurrency: "ETH",
    themeColor: "000000", // App theme color
    hostURL: window.location.origin,
    widgetHeight: "700px",
    widgetWidth: "500px",
  };

  let [activeTab, setActiveTab] = useState({
    dashboard: "active",
    totalUserAccount: "",
    pendingUserAccount: "",
    resolvedDisputedOrders: "",
    tradeListOrders: "",
    earningsList: "",
    referralEarnings: "",
    settings: "",
    changePassword: "",
    newNFT: "",
    dropApproval: "",
    newCube: "",
    myDrops: "",
    newDrop: "",
    newSeason: "",
    newCollection: "",
    createNewCollection: "",
    myNFTs: "",
    myCubes: "",
    newRandomDrop: "",
    marketPlace: "",
    topUp:""
  });

  function openTransak() {
    const transak = new transakSDK(settings);

    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data);
    });

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData) => {
      console.log(eventData);
      transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      window.alert("Payment Success");
      transak.close();
    });
  }

  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      {/* <!-- Header --> */}
      <div className={`admin-header ${menuOpenedClass}`}>
        {/* <!-- Logo --> */}
        <div className="header-left">
          <a
            href="/"
            className="navbar-brand logo"
            // onClick={(e) => e.preventDefault()}
            style={{ width: "210px" }}
          >
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
            {/* Robot Drop */}
          </a>
          <a
            href="/"
            className="logo logo-small"
            // onClick={(e) => e.preventDefault()}
            style={{ width: "210px" }}
          >
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
            {/* Robot Drop */}
          </a>
        </div>
        {/* <!-- /Logo --> */}
        {/* 
        <a href="" id="toggle_btn">
          <i className="fa fa-align-left"></i>
        </a> */}

        {/* <!-- Mobile Menu Toggle --> */}
        <a
          href="/"
          className="mobile_btn"
          id="mobile_btn"
          onClick={handleSlideNav}
        >
          <i className="fa fa-bars"></i>
        </a>
        {/* <!-- /Mobile Menu Toggle --> */}

        {/* <!-- Header Right Menu --> */}
        <ul className="nav user-menu">
          {/* <!-- User Menu --> */}

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
                style={{ backgroundColor: "rgb(167, 0, 0)" }}
              >
                <Dropdown.Item>
                  <Link to="/dashboard" style={{ width: "100%" }}>
                    Dashboard
                  </Link>
                </Dropdown.Item>
                {/* <Dropdown.Item>
                  <span style={{ color: "white" }} onClick={openTransak}>
                    Buy Crypto
                  </span>
                </Dropdown.Item> */}
                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      sessionStorage.clear();
                      // Cookies.remove("Authorization");
                      sessionStorage.removeItem("Address");
                      // web3Modal.clearCachedProvider();

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
          {/* <!-- /User Menu --> */}
        </ul>
        {/* <!-- /Header Right Menu --> */}
      </div>
      {/* <!-- /Header --> */}

      <AdminSidebar
        match={props.match}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Switch>
            <Route exact path={`${path}`}>
              <AdminDashboardDefaultScreen
                match={props.match}
                setActiveTab={setActiveTab}
              />
            </Route>

            <Route exact path={`${path}/newNFT`}>
              <NewNFT setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/myNFTs`}>
              <MyNFTs setActiveTab={setActiveTab} />
            </Route>
            {/* myNFTs:"", */}
            <Route exact path={`${path}/myCubes`}>
              <MyCubes setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/newCube`}>
              <NewCube setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/newRandomDrop`}>
              <RandomDrop setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/newSeason`}>
              <NewSeason setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/mySeason`}>
              <MySeasons setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/mySeason/drops/:seasonId`}>
              <SeasonDrops setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/dropApproval`}>
              <DropApproval setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/topUp`}>
              <TopUp setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/newDrop`}>
              <NewDrop setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/newDrop/addNft`}>
              <AddNFT setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/myDrops`}>
              <MyDrops setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/myDrops/nfts`}>
              <MyDropNFTs setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/myDrops/nfts/singleNft`}>
              <DropSingleNFT setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/myDrops/cubes/:dropId`}>
              <DropCubes setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/myCubes/Nfts/:dropId/:cubeId`}>
              <CubeNFTs setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/createNewCollection`}>
              <NewCollection setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/myCollection`}>
              <MyCollection setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/nftDetail/:nftId`}>
              <SingleNftDetail setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/collection/nfts/:collectionId`}>
              <CollectionNfts setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/marketPlace`}>
              <MarketPlace setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/marketPlace/drops/nfts`}>
              <DropNfts setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/marketPlace/drops/nfts/buy`}>
              <NFTBuy setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/marketPlace/:dropId/:nftId`}>
              <AuctionNFT setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/profilesettings`}>
              <ProfileSetting setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/changepassword`}>
              <ChangePassword setActiveTab={setActiveTab} />
            </Route>

            <Route path={`${path}`}>
              <AdminDashboardDefaultScreen
                match={props.match}
                setActiveTab={setActiveTab}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
