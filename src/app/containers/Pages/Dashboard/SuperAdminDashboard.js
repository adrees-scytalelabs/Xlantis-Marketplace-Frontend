import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import "../../../assets/css/adminStyle.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";
import patient from "../../../assets/img/patients/patient.jpg";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import AccountApproval from "./Admin/AccountApproval";
import Accounts from "./Admin/Accounts";
import CreateTemplate from "./Admin/CreateTemplate";
import ManageAccountsSSO from "./Admin/ManageAcccountsSSO";
import ManageAccounts from "./Admin/ManageAccounts";
import ManageAccountsWallet from "./Admin/ManageAccountsWallet";
import SavedTemplate from "./Admin/SavedTemplate";
import SuperAdminDashboardDefaultScreen from "./Admin/SuperAdminDashboardDefaultScreen";
import SuperAdminSidebar from "./Admin/SuperAdminSidebar";
import TemplateProperties from "./Admin/TemplateProperties";
import VerifiedAccounts from "./Admin/VerifiedAccounts";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("Authorization")}`;

function SuperAdminDashboard(props) {
  let { path } = useRouteMatch();
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
    manageAccounts: "",
    manageAccountsSSO: "",
    accountApproval: "",
    accounts: "",
    properties: "",
    template: "",
    saved: "",
  });
  const [tab, setTab] = useState(0);


  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      <div className={`admin-header ${menuOpenedClass}`}>
        <div className="header-left">
          <a
            href="/"
            className="logo"

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
          </a>
          <a
            href="/"
            className="logo logo-small"

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
                  <Link
                    to="/dashboard"
                    style={{ width: "100%" }}
                    className="headerAccountMenu"
                  >
                    Dashboard
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      sessionStorage.removeItem("Authorization");
                      sessionStorage.removeItem("Address");


                      Cookies.remove("PNT");
                      window.location.reload(false);
                    }}
                    to="/"
                    style={{ width: "100%" }}
                    className="headerAccountMenu"
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>

      <SuperAdminSidebar
        match={props.match}
        activeTab={activeTab}
        tab={tab}
        setTab={setTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Switch>
            <Route exact path={`${path}`}>
              <SuperAdminDashboardDefaultScreen
                match={props.match}
                tab={tab}
                setTab={setTab}
                setActiveTab={setActiveTab}
              />
            </Route>
            <Route exact path={`${path}/verifiedAccounts`}>
              <VerifiedAccounts
                match={props.match}
                tab={tab}
                setTab={setTab}
                setActiveTab={setActiveTab}
              />
            </Route>
            <Route exact path={`${path}/accountApproval`}>
              <AccountApproval
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
            <Route exact path={`${path}/manageAccounts`}>
              <ManageAccounts
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
            <Route exact path={`${path}/manageAccounts/SSO`}>
              <ManageAccountsSSO
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
            <Route exact path={`${path}/manageAccounts/Wallet`}>
              <ManageAccountsWallet
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
            <Route exact path={`${path}/accounts`}>
              <Accounts setActiveTab={setActiveTab} tab={tab} setTab={setTab} />
            </Route>
            <Route exact path={`${path}/properties`}>
              <TemplateProperties
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
            <Route exact path={`${path}/properties/createTemplate`}>
              <CreateTemplate
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
            <Route exact path={`${path}/properties/savedTemplate`}>
              <SavedTemplate
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
            <Route path={`${path}`}>
              <SuperAdminDashboardDefaultScreen
                match={props.match}
                setActiveTab={setActiveTab}
                tab={tab}
                setTab={setTab}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
