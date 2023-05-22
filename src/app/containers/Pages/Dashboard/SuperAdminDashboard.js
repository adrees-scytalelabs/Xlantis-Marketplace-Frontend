import Cookies from "js-cookie";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Route, Routes, useResolvedPath } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { defaultProfile } from "../../../components/ImageURLs/URLs";
import AccountApproval from "./Admin/AccountApproval";
import Accounts from "./Admin/Accounts";
import CreateTemplate from "./Admin/CreateTemplate";
import ManageAccountsSSO from "./Admin/ManageAcccountsSSO";
import ManageAccounts from "./Admin/ManageAccounts";
import ManageAccountsWallet from "./Admin/ManageAccountsWallet";
import SavedTemplate from "./Admin/SavedTemplate";
import SuperAdminStats from "./Admin/SuperAdminStats";
import SuperAdminSidebar from "./Admin/SuperAdminSidebar";
import TemplateProperties from "./Admin/TemplateProperties";
import VerifiedAccounts from "./Admin/VerifiedAccounts";
import SuperAdminDashboardScreen from "./Admin/SuperAdminDashboardScreen";

function SuperAdminDashboard(props) {
  const path = useResolvedPath("").pathname;
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
    adminStats: "",
  });
  const [tab, setTab] = useState(0);

  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      <div className={`admin-header ${menuOpenedClass}`}>
        <div className="header-left">
          <a href="/" className="logo" style={{ width: "210px" }}>
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
                    src={defaultProfile}
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
        match={path}
        activeTab={activeTab}
        tab={tab}
        setTab={setTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Routes>
            <Route
              exact
              path={`/`}
              element={
                <SuperAdminDashboardScreen
                  match={path}
                  tab={tab}
                  setTab={setTab}
                  setActiveTab={setActiveTab}
                />
              }
            />
            <Route
              exact
              path={`adminStats`}
              element={
                <SuperAdminStats
                  match={path}
                  tab={tab}
                  setTab={setTab}
                  setActiveTab={setActiveTab}
                />
              }
            />
            <Route
              exact
              path={`verifiedAccounts`}
              element={
                <VerifiedAccounts
                  match={path}
                  tab={tab}
                  setTab={setTab}
                  setActiveTab={setActiveTab}
                />
              }
            />
            <Route
              exact
              path={`accountApproval`}
              element={
                <AccountApproval
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
            <Route
              exact
              path={`manageAccounts`}
              element={
                <AccountApproval
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
            <Route
              exact
              path={`manageAccounts/accountApproval`}
              element={
                <AccountApproval
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
            <Route
              exact
              path={`manageAccounts/Accounts`}
              element={
                <Accounts
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
            {/* <Route
              exact
              path={`accounts`}
              element={
                <Accounts
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            /> */}
            <Route
              exact
              path={`properties`}
              element={
                <TemplateProperties
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
            <Route
              exact
              path={`properties/createTemplate`}
              element={
                <CreateTemplate
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
            <Route
              exact
              path={`properties/savedTemplate`}
              element={
                <SavedTemplate
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
            <Route
              path={`/`}
              element={
                <SuperAdminDashboard
                  match={path}
                  setActiveTab={setActiveTab}
                  tab={tab}
                  setTab={setTab}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
