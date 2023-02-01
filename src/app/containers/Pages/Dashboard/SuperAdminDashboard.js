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
import SuperAdminDashboardDefaultScreen from "./Admin/SuperAdminDashboardDefaultScreen";
import SuperAdminSidebar from "./Admin/SuperAdminSidenar";
import AccountApproval from "./Admin/AccountApproval";
import Accounts from "./Admin/Accounts";
import ManageAccounts from "./Admin/ManageAccounts";

import transakSDK from "@transak/transak-sdk";

axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
  "Authorization"
)}`;

function SuperAdminDashboard(props) {
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
    manageAccounts: "",
    accountApproval: "",
    accounts: "",
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
            className="logo"
            // onClick={(e) => e.preventDefault()}
            style={{ color: "rgb(167,0,0)" }}
          >
            <img src={Logo} alt="Logo" width="90" />
            {/* Robot Drop */}
          </a>
          <a
            href="/"
            className="logo logo-small"
            // onClick={(e) => e.preventDefault()}
            style={{ color: "rgb(167,0,0)" }}
          >
            <img src={Logo} alt="Logo" width="90" />
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
                <Dropdown.Item>
                  <span style={{ color: "white" }} onClick={openTransak}>
                    Buy Crypto
                  </span>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      sessionStorage.removeItem("Authorization");
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

      <SuperAdminSidebar
        match={props.match}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Switch>
            <Route exact path={`${path}`}>
              <SuperAdminDashboardDefaultScreen
                match={props.match}
                setActiveTab={setActiveTab}
              />
            </Route>

            <Route exact path={`${path}/accountApproval`}>
              <AccountApproval setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/manageAccounts`}>
              <ManageAccounts setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/accounts`}>
              <Accounts setActiveTab={setActiveTab} />
            </Route>

            <Route path={`${path}`}>
              <SuperAdminDashboardDefaultScreen
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

export default SuperAdminDashboard;
