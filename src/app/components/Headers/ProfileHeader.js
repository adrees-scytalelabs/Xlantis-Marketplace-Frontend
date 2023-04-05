import Cookies from "js-cookie";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "../../assets/css/adminStyle.css";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import patient from "../../assets/img/patients/patient.jpg";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

function ProfileHeader(props) {
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
  return (
    <div
    >
      <div className={`admin-header ${menuOpenedClass}`}>
        <div className="header-left">
          <a
            href="/"
            className="logo"
            onClick={(e) => e.preventDefault()}
            style={{ color: "rgb(167,0,0)" }}
          >
            Robot Drop
          </a>
          <a
            href="/"
            className="logo logo-small"
            onClick={(e) => e.preventDefault()}
            style={{ color: "rgb(167,0,0)" }}
          >
            Robot Drop
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

          <li className="nav-item dropdown has-arrow"></li>

          <li
            className="nav-item dropdown has-arrow"
            style={{ paddingTop: "10px" }}
          >
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "transparent",
                  border: "0",
                }}
              >
                <span className="admin-img">
                  <img
                    className="avatar-sm rounded-circle"
                    width="50"
                    alt="Ryan Taylor"
                  />
                  <img
                    className="avatar-sm rounded-circle"
                    src={patient}
                    width="50"
                    alt="Ryan Taylor"
                  />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu alignRight="true">
                <Dropdown.Item>
                  <div className="admin-header">
                    <div className="avatar avatar-sm">
                      <img
                        className="avatar-sm rounded-circle"
                        src={patient}
                        width="50"
                        alt="Ryan Taylor"
                      />
                    </div>
                    <div className="Admin-text">
                      <p className="text-muted mb-0">Admin</p>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Divider />
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Link to="/dashboard" style={{ width: "100%" }}>
                    Dashboard
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      sessionStorage.removeItem("Authorization");
                      Cookies.remove("InfoAdded");
                      Cookies.remove("Verified");
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
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(ProfileHeader));
