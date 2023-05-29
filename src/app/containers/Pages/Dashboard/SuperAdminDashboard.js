import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, Route, Routes, useResolvedPath } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";

import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { defaultProfile } from "../../../components/ImageURLs/URLs";
import AccountApproval from "./Admin/AccountApproval";
import Accounts from "./Admin/Accounts";
import CreateTemplate from "./Admin/CreateTemplate";
import PlatformFee from "./Admin/PlatformFee";
import SavedTemplate from "./Admin/SavedTemplate";
import SuperAdminDashboardScreen from "./Admin/SuperAdminDashboardScreen";
import SuperAdminSidebar from "./Admin/SuperAdminSidebar";
import SuperAdminStats from "./Admin/SuperAdminStats";
import TemplateProperties from "./Admin/TemplateProperties";
import VerifiedAccounts from "./Admin/VerifiedAccounts";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "black",
          },
        },
      },
    },
  },
});

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
    PlatformFee: "",
  });
  const [tab, setTab] = useState(0);

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const menuOpen = Boolean(menuAnchorEl);
  const handleClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMenuAnchorEl(null);
  };

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "start",
                backgroundColor: "transparent",
                border: "0",
                paddingTop: "15px",
              }}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2, mr: 3 }}
                aria-controls={menuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
              >
                <span className="admin-img">
                  <img
                    className="avatar-sm rounded-circle"
                    src={defaultProfile}
                    width="50"
                    alt="Ryan Taylor"
                  />
                </span>
              </IconButton>
            </Box>
            <ThemeProvider theme={theme}>
              <Menu
                anchorEl={menuAnchorEl}
                id="account-menu"
                open={menuOpen}
                sx={{
                  zIndex: "9999",
                  color: "black",
                }}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "& .MuiList-root": {
                      background: "black",
                      "&:hover": {
                        textColor: "black !important",
                      },
                    },
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        backgroundColor: "#f64d04",
                        textColor: "black",
                      },
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Link to="/dashboard" style={{ width: "100%" }}>
                    <Typography>Dashboard</Typography>
                  </Link>
                </MenuItem>
                <Divider color="white" />
                <MenuItem onClick={handleClose}>
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
                    <Typography>Logout</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </ThemeProvider>
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
            <Route
              exact
              path={`platformFee`}
              element={
                <PlatformFee
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
