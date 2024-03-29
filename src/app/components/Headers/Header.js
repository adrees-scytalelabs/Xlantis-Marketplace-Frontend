import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, ClickAwayListener, Paper, Popper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import transakSDK from "@transak/transak-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from "axios";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { io } from "socket.io-client";
import WalletLink from "walletlink";
import Web3 from "web3";
import Web3Modal from "web3modal";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Logo from "../../assets/img/WhiteLogo.png";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { getHeaderNotification } from "../../redux/getHeaderNotificationSlice";
import { getUserProfile } from "../../redux/getUserProfileSlice";
import NotificationList from "../Cards/NotificationList Card";
import CartModal from "../Modals/CartModal";
import NetworkErrorModal from "../Modals/NetworkErrorModal";
import SSOWalletModal from "../Modals/SSOWalletModal";
import WorkInProgressModal from "../Modals/WorkInProgressModal";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";
import { hoverClassStyleTest } from "../Utils/CustomStyling";

function HeaderHome(props) {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [menuOpenedClass, setMenuOpenedClass] = useState();
  const [userSignOut] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  let navigate = useNavigate();
  const [modalOpen, setMOdalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminSignInData, setAdminSignInData] = useState(null);
  const [, setTokenVerification] = useState(true);
  const [profileImg, setProfileImg] = useState(
    "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png"
  );
  let location = useLocation();
  const { marketPlace } = useParams();
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const [anchorElPopper, setAnchorElPopper] = React.useState(null);
  const openPopper = Boolean(anchorElPopper);
  const [notificationsList, setNotificationsList] = useState({});
  const [notificationCount, setNotificationCount] = useState(0);
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const { userData, loading } = useSelector((store) => store.userProfile);
  const [open, setOpen] = useState(false);
  const { notification, notificationLoading } = useSelector(
    (store) => store.getHeaderNotification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setSocket(io("https://raindrop-backend.herokuapp.com/"));
  }, []);
  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    let userIdentity = sessionStorage.getItem("userId");
    if (userLogin != null) {
      setUserId(userIdentity);
      if (userId !== "" && socket !== null) {
        socket.emit("user-logged-in", userIdentity);
        socket.on("Notification", (notification) => {
          getNotifications(0, 2000);
        });
      } else if (userIdentity === "" && socket !== null) {
        socket.emit("user-logged-out", userIdentity);
      }
    }
  }, [socket, userId]);
  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    let userIdentity = sessionStorage.getItem("userId");
    if (userLogin != null) {
      setUserId(userIdentity);
      getNotifications(0, 2000);
    }
  }, [notificationLoading]);

  useEffect(() => {
    getProfile();
  }, [loading]);

  useEffect(() => {
    if (adminSignInData !== null) {
      if (
        adminSignInData.isInfoAdded === true &&
        adminSignInData.isVerified === false
      ) {
        let variant = "info";
        setSnackbarMessage(
          "Your request is under process. Waiting for approval by the Super Admin."
        );
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    }
  }, [adminSignInData]);
  const handleOpenModal = () => {
    setMOdalOpen(!modalOpen);
  };

  const handleCloseModal = () => {
    setMOdalOpen(false);
  };

  const handleOpenCart = () => {
    setCartOpen(!cartOpen);
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412",
    environment: "STAGING",
    defaultCryptoCurrency: "ETH",
    themeColor: "000000",
    hostURL: window.location.origin,
    widgetHeight: "700px",
    widgetWidth: "500px",
  };

  const [isLoading, setIsLoading] = useState(false);

  const [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "2b677656bad14a3db4592ffdb69e7805",
      },
    },
    walletlink: {
      package: WalletLink,
      options: {
        appName: "RINKEBY API",
        infuraId: "2b677656bad14a3db4592ffdb69e7805",
        rpc: "",
        chainId: 5,
        appLogoUrl: null,
        darkMode: true,
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: "private",
    theme: "dark",
    cacheProvider: true,
    providerOptions,
  });

  function openTransak() {
    const transak = new transakSDK(settings);

    transak.init();
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data);
    });
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData) => {
      console.log(eventData);
      transak.close();
    });
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      window.alert("Payment Success");
      transak.close();
    });
  }

  let loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  function getNotifications(start, end) {
    dispatch(getHeaderNotification({ start, end, setNotificationsList }));
    // setNotificationsList(notification);
    // setNotificationCount(notification.length);
  }

  function readNotification(notificationId) {
    let data = {
      notificationId,
    };

    axios.patch("/notifications/hide", data).then(
      (response) => {
        getNotifications(0, 2000);
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);
      }
    );
  }

  async function handleLogin() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();

    if (network !== "private") {
      setNetwork(network);
      setIsLoading(false);
      handleShow();
    } else {
      let account = accounts[0];
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      console.log("In the starting");

      console.log("Provider: ", provider);

      await provider.send("eth_requestAccounts", []);
      let signer = provider.getSigner();
      console.log("account", account);
      const address = await signer.getAddress();
      const message = `Welcome to Xlantis! \n\nClick to sign in and accept the Xlantis Terms of Service: https://RobotDrop.io/tos \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours. \n\nWallet address: ${address}`;
      console.log("Address: ", await signer.getAddress());
      let signatureHash = await web3.eth.personal.sign(message, address);
      console.log("Signature hash ", signatureHash);
      let ethBalance = await web3.eth.getBalance(account);

      let loginData = {
        walletAddress: address,
        signature: signatureHash,
      };
      let route;
      if (props.role === "admin") {
        route = "v2-wallet-login/user/auth/admin-login";
      } else {
        route = "v2-wallet-login/user/auth/login";
      }

      console.log(route);
      axios.post(route, loginData).then(
        (response) => {
          console.log("response", response);
          if (props.role === "admin") {
            console.log("admin sett");
            console.log("admin data set");
            Cookies.set("Version", "v2-wallet-login", {});
            console.log("version set");
            Cookies.set("InfoAdded", response.data.isInfoAdded, {});
            Cookies.set("Verified", response.data.isVerified, {});
            sessionStorage.setItem(
              "Authorization",
              response.data.raindropToken,
              {}
            );
            if (
              response.data.isInfoAdded === true &&
              response.data.isVerified === true
            ) {
              sessionStorage.setItem("Address", accounts[0]);
              window.location.reload(false);
            }
            setAdminSignInData(response.data);
          } else {
            console.log("Running user", response.data);
            Cookies.set("Version", "v2-wallet-login", {});
            sessionStorage.setItem(
              "Authorization",
              response.data.raindropToken,
              {}
            );
            sessionStorage.setItem("Address", accounts[0]);
            setUserId(accounts[0]);
            window.location.reload();
          }
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
            if (error) setTokenVerification(false);
          }
        }
      );
    }

    setMOdalOpen(false);
  }

  function handleNotificationsIcon(event) {
    console.log("I was called");
    setAnchorElPopper(anchorElPopper ? null : event.currentTarget);
    console.log("event", event);
  }

  const selectedStyling = {
    border: "1px solid #F64D04",
    padding: "10px 20px",
    borderRadius: "0px 10px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#F64D04",
    cursor: "pointer",
  };
  const defaultStyling = {
    padding: "10px 20px",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
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

  let Logout = (e) => {
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("Address");
    Cookies.remove("InfoAdded");
    Cookies.remove("Verified");
    Cookies.remove("Version");
    sessionStorage.clear();
    setUserId("");
    navigate("/");
    window.location.reload(false);
  };

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    navigate("/user/settings");
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  let jwtDecoded, jwt;
  if (props.role === null) {
    jwt = sessionStorage.getItem("Authorization");
    if (jwt !== null) {
      jwtDecoded = jwtDecode(jwt);
    }
  }

  let getProfile = () => {
    let userLogin = sessionStorage.getItem("Authorization");
    if (userLogin !== "undefined") {
      dispatch(getUserProfile());
      userData.imageURL && setProfileImg(userData.imageURL);
    }
  };

  return (
    <header className={`header ${menuOpenedClass}`}>
      {adminSignInData !== null && adminSignInData.isInfoAdded === false && (
        <Navigate to="/admin-signup-details" />
      )}
      <nav
        className="navbar navbar-expand-lg header-nav px-3 mainNav"
        style={{ width: "100%" }}
      >
        <div className="navbar-header justify-content-center">
          <a
            id="mobile_btn"
            href="/"
            style={{ color: "#fff" }}
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
            style={{ color: "#fff", width: "auto" }}
            to="/"
            className="navbar-brand logo pr-sm-2 mr-sm-4"
          >
            <img
              src={Logo}
              alt="Logo"
              width="120"
              height="34"
              style={{
                width: "210px",
                height: "30px",
                padding: "5px 15px",
              }}
            />
          </Link>
        </div>

        <div className="main-menu-wrapper">
          <div className="menu-header">
            <a
              id="menu_close"
              className="menu-close"
              style={{ color: "#fff" }}
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
            className="main-nav"
            style={{
              marginTop: "4px",
            }}
          >
            <li className="login-link" style={{ padding: "10px 35px" }}>
              {(sessionStorage.getItem("Address") && props.role === "admin") ||
              sessionStorage.getItem("Address") ||
              (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
                <div
                  className="header-profile-image"
                  onClick={handleClick}
                  style={{ backgroundImage: `url(${profileImg})` }}
                ></div>
              ) : null}
            </li>
            <li>
              <a href="/" style={{ color: "#fff" }}>
                <span
                  className={hoverClassStyleTest(props.selectedNav).Home}
                  style={selectedNavStyle.Home}
                >
                  Home
                </span>
              </a>
            </li>
            {marketPlace !== undefined && (
              <li>
                <Link
                  to={`/${marketPlace}/marketPlace`}
                  state={{ marketplaceId: props.marketplaceId }}
                  style={{ color: "#fff" }}
                >
                  <span
                    className={hoverClassStyleTest(props.selectedNav).Market}
                    style={selectedNavStyle.Market}
                  >
                    Market
                  </span>
                </Link>
              </li>
            )}

            <li className="login-link">
              <Link to={`/dashboard`}>
                <span
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                >
                  Dashboard
                </span>
              </Link>
            </li>

            {location.pathname.match("/dashboard") ||
            location.pathname.match("/user/settings") ? (
              <>
                <li className="sidebar-items">
                  <Link to={`/dashboard/myNFTs`}>
                    <span
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                    >
                      My NFTs
                    </span>
                  </Link>
                </li>
                <li className="sidebar-items">
                  <Link to={`/dashboard/notifications`}>
                    <span
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                    >
                      Notfications
                    </span>
                  </Link>
                </li>
                <li className="sidebar-items">
                  <Link to={`/user/settings`}>
                    <span
                      style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                    >
                      Profile
                    </span>
                  </Link>
                </li>
              </>
            ) : null}

            <li
              className="login-link"
              style={{ padding: "15px 20px" }}
              onClick={handleOpenCart}
            >
              <span
                style={{
                  padding: "10px 20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                View Cart
              </span>
            </li>

            {(sessionStorage.getItem("Address") && props.role === "admin") ||
            sessionStorage.getItem("Address") ||
            (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
              <li
                className="login-link"
                style={{ padding: "15px 20px" }}
                onClick={Logout}
              >
                <span
                  style={{
                    padding: "10px 20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </span>
              </li>
            ) : (
              <li
                className="login-link"
                style={{ padding: "15px 20px" }}
                onClick={() => {
                  setMenuOpenedClass("");
                  handleOpenModal();
                }}
              >
                <span
                  style={{
                    padding: "10px 20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Login/SignUp
                </span>
              </li>
            )}
          </ul>
        </div>
        <ul className="nav header-navbar-rht" style={{ paddingRight: "5px" }}>
          <li>
            {isLoading ? (
              <div className="text-center">
                <CircularProgress sx={{ color: "#FFFFFF" }} />
              </div>
            ) : sessionStorage.getItem("Address") &&
              props.role === "admin" ? null : sessionStorage.getItem(
                "Address"
              ) ||
              (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
              <div
                className="header-profile-image"
                onClick={handleClick}
                style={{
                  backgroundImage: `url(${profileImg})`,
                  marginRight: "20px",
                  cursor: "pointer",
                }}
              ></div>
            ) : null}
          </li>
          <li className="header-item-rht">
            {sessionStorage.getItem("Address") &&
            props.role === "admin" ? null : sessionStorage.getItem("Address") ||
              (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
              <>
                <Link
                  to="/dashboard"
                  style={{ color: "#fff", marginRight: "20px" }}
                  state={{ notification: notificationsList }}
                >
                  Dashboard
                </Link>
              </>
            ) : props.role === "admin" ? (
              <>
                <span
                  className={hoverClassStyleTest(props.selectedNav).Community}
                  style={selectedNavStyle.Community}
                  onClick={() => {
                    setWorkProgressModalShow(true);
                  }}
                >
                  Sign in with wallet
                </span>
              </>
            ) : (
              <>
                <span
                  className={hoverClassStyleTest(props.selectedNav).Community}
                  style={selectedNavStyle.Community}
                  onClick={handleOpenModal}
                >
                  Login/SignUp
                </span>

                {userSignOut && <Navigate to="/" />}
              </>
            )}
          </li>

          <li className="header-item-rht">
            {sessionStorage.getItem("Address") &&
            props.role === "admin" ? null : sessionStorage.getItem("Address") ||
              (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
              <span
                style={{ cursor: "pointer", marginRight: "20px" }}
                onClick={() => Logout()}
              >
                Logout
              </span>
            ) : null}
          </li>
          {marketPlace !== undefined && (
            <li className="header-item-rht">
              <ShoppingCartIcon
                onClick={() => setWorkProgressModalShow(true)}
                style={{ cursor: "pointer", marginRight: "20px" }}
              />
            </li>
          )}
          <li>
            {sessionStorage.getItem("Address") ||
            (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
              <ClickAwayListener
                onClickAway={() => {
                  setAnchorElPopper(null);
                }}
              >
                <div>
                  <Badge
                    color="secondary"
                    badgeContent={notificationsList.length}
                  >
                    <NotificationsIcon
                      type="button"
                      onClick={(event) => {
                        setAnchorElPopper(
                          anchorElPopper ? null : event.currentTarget
                        );
                      }}
                    />
                  </Badge>

                  <Popper
                    key={notificationsList}
                    id={openPopper ? "simple-popper" : undefined}
                    open={openPopper}
                    anchorEl={anchorElPopper}
                    placement="bottom-end"
                    style={{
                      zIndex: 2500,
                      paddingTop: 15,
                    }}
                  >
                    <div>
                      <Paper elevation={10} variant="outlined" square>
                        <NotificationList
                          itemCount={notificationsList.length}
                          notifications={notificationsList}
                          close={readNotification}
                        />
                      </Paper>
                    </div>
                  </Popper>
                </div>
              </ClickAwayListener>
            ) : null}
          </li>
        </ul>
        <NetworkErrorModal
          show={show}
          handleClose={handleClose}
          network={network}
        ></NetworkErrorModal>
      </nav>
      <SSOWalletModal
        handleClose={handleCloseModal}
        open={modalOpen}
        metamaskLogin={handleLogin}
        openWorkProgressModal={() => {
          setMOdalOpen(false);
          setWorkProgressModalShow(true);
        }}
      />
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <CartModal handleClose={handleOpenCart} open={cartOpen} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </header>
  );
}

export default HeaderHome;
