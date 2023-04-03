import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";
import patient from "../../../assets/img/patients/patient.jpg";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import SettingDashboardDefault from "../Users/SettingsDashboardDefault";
import AdminSidebar from "./Admin/AdminSidebar";

function UserSettings(props) {
  let { path } = useRouteMatch();

  let [match] = useState({
    isExact: true,
    params: {},
    path: "/dashboard",
    url: "/dashboard",
  });
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

  useEffect(() => {
    console.log("Props in admin settings are: ", props);
  }, []);

  let [activeTab, setActiveTab] = useState({
    profile: "active",
    offer: "",
  });
  const [updateProfile, setUpdateProfile] = useState("");
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <div className={`admin-header ${menuOpenedClass}`}>
          <div className="header-left">
            <a
              href="/"
              className="navbar-brand logo"
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
                    <Link to="/admin/settings" style={{ width: "100%" }}>
                      Profile Settings
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/dashboard" style={{ width: "100%" }}>
                      Dashboard
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
          match={match}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Switch>
              <Route exact path={`${path}`}>
                <SettingDashboardDefault
                  user="admin"
                  setActiveTab={setActiveTab}
                  updateProfile={updateProfile}
                  setUpdateProfile={setUpdateProfile}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
