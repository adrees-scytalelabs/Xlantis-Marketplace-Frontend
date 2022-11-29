import Avatar from "@material-ui/core/Avatar";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Logo from "../../assets/img/logo.png";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import NetworkErrorModal from "../Modals/NetworkErrorModal";

function HeaderHome(props) {
  let [menuOpenedClass, setMenuOpenedClass] = useState();
  let [isLoading] = useState(false);

  let [network] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const selectedStyling = {
    border: "2px solid 'rgb(167,0,0)'",
    padding: "10px 20px",
    borderRadius: "12px",
    color: "#fbfeff",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundImage:
      "linear-gradient(90deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
    boxShadow: "0 10px 6px -6px #777",
  };
  const defaultStyling = {
    padding: "10px 20px",
    borderRadius: "12px",
    color: "#04111D",
    fontSize: "18px",
    fontWeight: "bold",
  };
  const selectedNavStyle = {
    search: props.selectedNav === "search" ? defaultStyling : defaultStyling,
    Market: props.selectedNav === "Market" ? selectedStyling : defaultStyling,
    Drops: props.selectedNav === "Drops" ? selectedStyling : defaultStyling,
    Home: props.selectedNav === "Home" ? selectedStyling : defaultStyling,
    Blog: props.selectedNav === "Blog" ? selectedStyling : defaultStyling,
    Community:
      props.selectedNav === "Community" ? selectedStyling : defaultStyling,
    create: props.selectedNav === "create" ? selectedStyling : defaultStyling,
  };
  const hoverClassStyle = {
    Market: props.selectedNav === "Market" ? "" : "headerNavLinks",
    Drops: props.selectedNav === "Drops" ? "" : "headerNavLinks",
    Home: props.selectedNav === "Home" ? "" : "headerNavLinks",
    Blog: props.selectedNav === "Blog" ? "" : "headerNavLinks",
    Community: props.selectedNav === "Community" ? "" : "headerNavLinks",
    Create: props.selectedNav === "Create" ? "" : "headerNavLinks",
  };

  let Logout = (e) => {
    console.log("akjdf");
    Cookies.remove("Authorization");
    localStorage.removeItem("Address");
    window.location.reload();

    // setTimeout(() => { }, 1);
  };

  return (
    <header className={`header ${menuOpenedClass}`}>
      <nav
        className="navbar navbar-expand-lg header-nav px-5 mainNav"
        style={{ width: "100%" }}
      >
        <div className="navbar-header">
          <a
            id="mobile_btn"
            href="/"
            style={{ color: "#04111D" }}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpenedClass("menu-opened");
            }}
          >
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>

          <Link
            style={{ color: "#04111D" }}
            to="/"
            className="navbar-brand logo"
          >
            <img src={Logo} alt="Logo" width="130" />
            {/* Robot Drop */}
          </Link>

          {/* <Link style={{ color: 'rgb(167,0,0)' }} to="/kyc" className="navbar-brand">
            KYC
          </Link> */}
        </div>

        <div className="main-menu-wrapper">
          <div className="menu-header">
            {/* <a style={{ color: 'rgb(167,0,0)' }} href="/" className="menu-logo">
              <img src={Logo} alt="Logo" width="100" height="60" />
            </a> */}
            <a
              id="menu_close"
              className="menu-close"
              style={{ color: "#04111D" }}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpenedClass("");
              }}
            >
              <i className="fas fa-times"></i> Close
            </a>
          </div>
          <ul
            className="main-nav "
            style={{
              marginTop: "4px",
            }}
          >
            <li className="login-link ">
              <a
                href="/"
                style={{ paddingLeft: "5px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpenedClass("");
                }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </a>
            </li>
            <li className="login-link ">
              {/* <Link to="/dashboard" style={{ color: 'rgb(167,0,0)' }} > */}

              {localStorage.getItem("Address") ? (
                <a
                  href={
                    "https://ropsten.etherscan.io/address/" +
                    localStorage.getItem("Address")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#04111D" }}
                >
                  <span style={{ cursor: "pointer" }}>
                    {localStorage.getItem("Address").substr(0, 10)}. . .
                  </span>
                </a>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      color: "#04111D",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      className={hoverClassStyle.Community}
                      style={selectedNavStyle.Community}
                    >
                      Login/Signup
                    </span>
                  </Link>
                </>
              )}
              {/* </Link> */}
            </li>
            <li>
              <a href="/" style={{ color: "rgb(167,0,0)" }}>
                <span
                  className={hoverClassStyle.Home}
                  style={selectedNavStyle.Home}
                >
                  Home
                </span>
              </a>
            </li>
            <li>
              <Link to="/marketPlace" style={{ color: "rgb(167,0,0)" }}>
                <span
                  className={hoverClassStyle.Market}
                  style={selectedNavStyle.Market}
                >
                  Market
                </span>
              </Link>
            </li>
            <li>
              <Link to="/auctionDrops" style={{ color: "rgb(167,0,0)" }}>
                <span
                  className={hoverClassStyle.Drops}
                  style={selectedNavStyle.Drops}
                >
                  Drops
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="nav header-navbar-rht">
          <li>
            {isLoading ? (
              <div className="text-center">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "ff0000" }}
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : localStorage.getItem("Address") ? (
              <a
                href={
                  "https://ropsten.etherscan.io/address/" +
                  localStorage.getItem("Address")
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#04111D" }}
              >
                <span style={{ cursor: "pointer" }} className="headerNavLinks">
                  {localStorage.getItem("Address").substr(0, 10)}. . .
                </span>
              </a>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: "#04111D",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <span
                    className="headerNavLinks"
                    style={{ cursor: "pointer" }}
                  >
                    Login/Signup
                  </span>
                </Link>
              </>
            )}
          </li>
          <li>
            {localStorage.getItem("Address") ? (
              <Link to="/dashboard" style={{ color: "rgb(167,0,0)" }}>
                Dashboard
              </Link>
            ) : (
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            )}
          </li>
          <li>
            {localStorage.getItem("Address") ? (
              <span style={{ cursor: "pointer" }} onClick={() => Logout()}>
                Logout
              </span>
            ) : null}
          </li>
        </ul>
        <NetworkErrorModal
          show={show}
          handleClose={handleClose}
          network={network}
        ></NetworkErrorModal>
      </nav>
    </header>
  );
}

export default HeaderHome;
