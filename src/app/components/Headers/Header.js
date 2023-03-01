import Person from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, matchPath, Redirect,useLocation } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Logo from "../../assets/img/logo.png";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import NetworkErrorModal from "../Modals/NetworkErrorModal";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";
import Settings from "@material-ui/icons/Settings";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";
import Web3 from "web3";
import { providers, ethers } from "ethers";
import money from "../../assets/img/wallet.png";
import man from "../../assets/img/man.png";
import SSOWalletModal from "../Modals/SSOWalletModal";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";

import jwtDecode from "jwt-decode";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import axios from "axios";
import transakSDK from "@transak/transak-sdk";
import { UserAuth } from "../context/AuthContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CartModal from "../Modals/CartModal";
import BusinessIcon from "@material-ui/icons/Business";
import ListAltIcon from "@material-ui/icons/ListAlt";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { io } from "socket.io-client";
import zIndex from "@material-ui/core/styles/zIndex";
import NotificationList from "../Cards/NotificationList Card";
import Badge from "@material-ui/core/Badge";

const customTheme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        margin: "0 !important",
        backgroundColor: "transparent !important",
        border: "none",
        '"&:hover"': {
          boxShadow: "none",
        },
      },
    },
  },
});

function HeaderHome(props) {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(props.updateProfile);
  let [menuOpenedClass, setMenuOpenedClass] = useState();
  const [userSignOut, setUserSignOut] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  let { path } = useRouteMatch();
  let history = useHistory();
  const [modalOpen, setMOdalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminSignInData, setAdminSignInData] = useState(null);
  const [tokenVerification, setTokenVerification] = useState(true);
  let [profileImg, setProfileImg] = useState("https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png");
  let location = useLocation();
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const [anchorElPopper, setAnchorElPopper] = React.useState(null);
  const openPopper = Boolean(anchorElPopper);
  const [notificationsList, setNotificationsList ] = useState();
  let [isSaving, setIsSaving] = useState(false);


  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    console.log("socket was set");
  }, []);
  useEffect(() => {
    if (userId !== "" && socket !== null) {
      socket.emit("user-logged-in", userId);
    } else if (userId === "" && socket !== null) {
      socket.emit("user-logged-out", userId);
    }
  }, [socket, userId]);

  const handleOpenModal = () => {
    setMOdalOpen(!modalOpen);
  };

  const handleCloseModal = () => {
    setMOdalOpen(false);
  };

  const handleOpenCart = () => {
    setCartOpen(!cartOpen);
  };
  const { enqueueSnackbar } = useSnackbar();

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412", // Your API Key
    environment: "STAGING", // STAGING/PRODUCTION
    defaultCryptoCurrency: "ETH",
    themeColor: "000000", // App theme color
    hostURL: window.location.origin,
    widgetHeight: "700px",
    widgetWidth: "500px",
  };

  let [isLoading, setIsLoading] = useState(false);

  let [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

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
    
    axios.get(`/notifications/${start}/${end}`).then(
      (response) => {
        console.log("response", response);
        setNotificationsList(response.data.notifications);

      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            // window.location.reload(false);
          }
        }
      }
    );
  }

  function readNotification(e, notificationId) {
    e.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();
    // setIsUploadingData(true);

    //sending data to backend
    let data = {
      notificationId
    };

    console.log("data", data);

    axios.patch("/notifications/hide", data).then(
      (response) => {
        console.log("notification hide response: ", response);
        handleCloseBackdrop();
        setIsSaving(false);
        // getNotifications(0, 10);
        // setIsUploadingData(false);
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);

        // setIsUploadingData(false);

        handleCloseBackdrop();

        // let variant = "error";
        // enqueueSnackbar("Unable to Verify Admin.", { variant });
      }
    );
    
  }
  async function handleLogin() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();

    console.log(network);
    console.log("role", props.role);
    console.log("Account test: ", accounts[0], network);

    if (network !== "private") {
      setNetwork(network);
      setIsLoading(false);
      handleShow();
    } else {
      // var provider = await web3Modal.connect();
      // var web3 = new Web3(provider);
      // const newProvider = new providers.Web3Provider(provider)
      // await newProvider.send('eth_requestAccounts');
      // var accounts = await web3.eth.getAccounts();
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
      const message = `Welcome to RobotDrop! \n\nClick to sign in and accept the RobotDrop Terms of Service: https://RobotDrop.io/tos \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours. \n\nWallet address: ${address}`;
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

      console.log(route)
      axios.post(route, loginData).then(
        (response) => {
          console.log("response", response);
          if (props.role === "admin") {
            setAdminSignInData(response.data);
            Cookies.set("Version", "v2-wallet-login", {});
              Cookies.set("InfoAdded", response.data.isInfoAdded, {});
              Cookies.set("Verified", response.data.isVerified, {});
              sessionStorage.setItem("Authorization", response.data.raindropToken, {});
              if (
                response.data.isInfoAdded === true &&
                response.data.isVerified === true
              ) {
                sessionStorage.setItem("Address", accounts[0]);
                window.location.reload(false);
              }
          } 
          else {
            console.log("Running user", response.data)
            Cookies.set("Version", "v2-wallet-login", {});
            sessionStorage.setItem("Authorization", response.data.raindropToken, {});
            sessionStorage.setItem("Address", accounts[0]);
            setUserId(accounts[0]);
            window.location.reload(); 
          // }
        }},
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
            if (error) setTokenVerification(false);
          }
          if (error.response !== undefined) {
            if (error.response.status === 400) {
              let variant = "error";
              enqueueSnackbar(error.response.data.message, { variant });
              // setMsg(error.response.data.message);
            } else {
              // setMsg("Unknown Error Occured, try again.");
            }
          } else {
            // setMsg("Unknown Error Occured, try again.");
          }
          // setIsLoading(false);
        }
      );
    }

    setMOdalOpen(false);
    // contract = new web3.eth.Contract(ABI, ADDRESS);
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
    // backgroundImage:
    //   "linear-gradient(90deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
    // boxShadow: "0 10px 6px -6px #777",
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
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("Address");
    Cookies.remove("InfoAdded");
    Cookies.remove("Verified");
    Cookies.remove("Version");
    sessionStorage.clear();
    // web3Modal.clearCachedProvider();
    setUserId("");
     history.push({ pathname: '/' });
    window.location.reload(false);

    // setTimeout(() => { }, 1);
  };

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    history.push("/user/settings");
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
    if(props.role === null) {
      jwt = sessionStorage.getItem("Authorization");
      if (jwt !== null) {jwtDecoded = jwtDecode(jwt)
    };
  }
  

if(adminSignInData !== null) {
      if (
        adminSignInData.isInfoAdded === true &&
        adminSignInData.isVerified === false
      ) {
         // Case 2
         let variant = "info";
         enqueueSnackbar("Your request is under process. Waiting for approval by the Super Admin", { variant })
      }
}

  adminSignInData &&
  console.log("jwt after submission in HeaderHome: //// ", adminSignInData.raindropToken);

  let getProfile = () => {
    let userLogin = sessionStorage.getItem("Authorization");
    if (userLogin !== "undefined") {
      let version = Cookies.get("Version");

      console.log("userLogin", userLogin);
      console.log("version", version);
      console.log(sessionStorage.getItem("Authorization"), " --- Authorization from user")
      axios
        .get(`${version}/user/profile`)
        .then((response) => {
          console.log("profile data image:", response.data.userData.imageURL);
          response.data.userData.imageURL && setProfileImg(response.data.userData.imageURL);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
    }

  }


  useEffect(() => {
    getProfile();
    getNotifications(0,10);
    console.log("In Hook");
  },[]);

  return (
    <header className={`header ${menuOpenedClass}`}>
    {adminSignInData !== null &&
                        adminSignInData.isInfoAdded === false && (
                          <Redirect to="/admin-signup-details" />
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

            {/* <a
                href="/"
                style={{ paddingLeft: "5px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpenedClass("");
                }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </a> */}


            <li className="login-link" style={{ padding: "10px 35px" }}>
              {/* <Link to="/dashboard" style={{ color: 'rgb(167,0,0)' }} > */}

              {(sessionStorage.getItem("Address") && props.role === "admin") || (sessionStorage.getItem("Address")) || (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
                //   <a
                //   href={
                //     "https://ropsten.etherscan.io/address/" +
                //     sessionStorage.getItem("Address")
                //   }
                //   target="_blank"
                //   rel="noopener noreferrer"
                //   style={{ color: "#fff" }}
                // >
                //   <span style={{ cursor: "pointer" }}>
                //     {sessionStorage.getItem("Address").substr(0, 10)}. . .
                //   </span>
                // </a>
                <div className="header-profile-image" onClick={handleClick} style={{ backgroundImage: `url(${profileImg})` }}></div>

              ) : ( null
              )}
              {/* </Link> */}
            </li>
            <li>
              <a href="/" style={{ color: "#fff" }}>
                <span
                  className={hoverClassStyle.Home}
                  style={selectedNavStyle.Home}
                >
                  Home
                </span>
              </a>
            </li>
            <li>
              <Link to="/marketPlace" style={{ color: "#fff" }}>
                <span
                  className={hoverClassStyle.Market}
                  style={selectedNavStyle.Market}
                >
                  Market
                </span>
              </Link>
            </li>
            <li className="login-link">
                  <Link to={`/dashboard`}>
                    <span style={{
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}>Dashboard</span>
                  </Link>
                </li>

            {
             location.pathname.match("/dashboard") || location.pathname.match("/user/settings")
           ?(
              <><li className="sidebar-items">
                    <Link to={`/dashboard/myNFTs`}>
                      <span style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}>My NFTs</span>
                    </Link>
                  </li><li className="sidebar-items">
                    <Link to={`/dashboard/marketPlace`}>
                      <span style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}>MarketPlace</span>
                    </Link>
                  </li><li className="sidebar-items">
                    <Link to={`/user/settings`}>
                      <span style={{
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}>Profile</span>
                    </Link>
                  </li></>
            ):
            null
           }
            {/* <li
              className="login-link"
              style={{ padding: "15px 20px" }}
              onClick={openTransak}
            >
              <span
                style={{
                  padding: "10px 20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Buy Crypto
              </span>
            </li> */}
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
            {
              (sessionStorage.getItem("Address") && props.role === "admin") || (sessionStorage.getItem("Address")) || (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
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
              ) : null
            }   
          </ul>
        </div>
        <ul className="nav header-navbar-rht" style={{ paddingRight: "5px" }}>
          <li>
            {
              isLoading ? (
                <div className="text-center">
                  <Spinner
                    animation="border"
                    role="status"
                    style={{ color: "#fff" }}
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              ) : sessionStorage.getItem("Address") && props.role === "admin" ? (
                null
                
              ) : sessionStorage.getItem("Address") || (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
                <div className="header-profile-image" onClick={handleClick} style={{ backgroundImage: `url(${profileImg})`, cursor: "pointer" }}>
                  {/* <Avatar
                    aria-owns={anchorEl ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    // onMouseOver={handleClick}
                    alt="Remy Sharp"
                    src={man}
                    sx={{ width: 24, height: 24 }}
                  /> */}

                  {/* <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{ onMouseLeave: handleMenuClose }}
                >
                  <MenuItem>
                    <div>
                      <Link to = "/profilesettings"></Link><Person /><span>Profile</span>
                    </div>
                  </MenuItem>
                  <MenuItem component={Link} to="/user/settings">Settings</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu> */}
                {/* </div> */}
              {/* // <a href={"https://ropsten.etherscan.io/address/" + localStorage.getItem("Address")} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(167,0,0)' }}>
              //   <span style={{ cursor: 'pointer' }}>{localStorage.getItem("Address").substr(0, 10)}. . .</span>
              // </a> */}
                </div>
              ) : // <a href={"https://ropsten.etherscan.io/address/" + localStorage.getItem("Address")} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(167,0,0)' }}>
                //   <span style={{ cursor: 'pointer' }}>{localStorage.getItem("Address").substr(0, 10)}. . .</span>
                // </a>
                null
              //   <>
              //     <div>
              //       <Avatar
              //       aria-owns={anchorEl ? "simple-menu" : undefined}
              //       aria-haspopup="true"
              //       onClick={handleLogin}
              //       // onMouseOver={handleClick}
              //       alt="Remy Sharp"
              //       src="/static/images/avatar/1.jpg"
              //       sx={{ width: 24, height: 24 }}
              //     />
              //     </div>
              //     <span  style={{ color: 'rgb(167,0,0)' }} onClick = {handleLogin} >
              //       <span style={{ cursor: 'pointer' }}>
              //         Login/Signup
              // </span>
              //     </span>
              //     </>
           }
          </li>
          <li className="header-item-rht">
            {
              sessionStorage.getItem("Address") && props.role === "admin" ? null  : sessionStorage.getItem("Address") || (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
                <>
                  {/* <div>
                  <Avatar
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleLogin}
                  // onMouseOver={handleClick}
                  alt="Remy Sharp"
                  src={money}
                  sx={{ width: 24, height: 24 }}
                />
                </div> */}
                  {/* <span style={{ color: "#fff" }} onClick={handleLogin}> */}
                  {/* <Link to="/login" style={{ color: "#fff" }}> */}
                  
                  <Link to="/dashboard" style={{ color: "#fff" }}>
                  Dashboard
                </Link>
                  {/* (
                  <span
                    className={hoverClassStyle.Community}
                    style={selectedNavStyle.Community}
                    onClick={handleOpenModal}
                  >
                    Login/SignUp
                    Connect Wallet
                  </span>
                )} */}
                {/* <span
                  style={{ cursor: "pointer", color: "#fff" }}
                  onClick={handleOpenModal}
                >
                  Login/SignUp */}
                  {/* Connect Wallet */}
                  {/* </span> */}
                  {/* </Link> */}
                  {/* </span> */}
                </>
              ) : props.role === "admin" ? (
                <>
                <span
                      className={hoverClassStyle.Community}
                      style={selectedNavStyle.Community}
                      onClick={handleLogin}
                    >
                      Sign in with wallet
                      {/* Connect Wallet */}
                    </span>
                </>
              ) : (
                <>
                    <span
                      className={hoverClassStyle.Community}
                      style={selectedNavStyle.Community}
                      onClick={handleOpenModal}
                    >
                      Login/SignUp
                      {/* Connect Wallet */}
                    </span>
                    {userSignOut && <Redirect to="/" />}
                  </>
                
              ) 
              // <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            }
          </li>

          {/* <li className="header-item-rht">
            <span style={{ color: "#fff" }} onClick={openTransak}>
              <span style={{ cursor: "pointer" }}>Buy Crypto</span>
            </span>
          </li> */}
          <li className="header-item-rht">
            {sessionStorage.getItem("Address") && props.role === "admin" ? null  : sessionStorage.getItem("Address") || (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (<span style={{ cursor: "pointer" }} onClick={() => Logout()}>
                Logout
              </span>) : null }
          </li>
          <li className="header-item-rht">
            <ShoppingCartIcon
              onClick={handleOpenCart}
              style={{ cursor: "pointer" }}
            />
          </li>
          <li>
            {sessionStorage.getItem("Address") ? (
              <div>
                <Badge color="secondary" badgeContent={1}>
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
                    <Paper elevation={3} variant="outlined" square>
                      <NotificationList itemCount={10}  notifications = {notificationsList} />
                      {/* <ul
                        style={{
                          listStyleType: "none",
                          padding: 10,
                          margin: 0,
                        }}
                      >
                        <li>
                          <div>Congratulations! John accepted your bid</div>
                        </li>
                        {/* <Divider />
                        <li>
                          <div style={{ padding: 2 }}>
                            Congratulations! Amy accepted your bid
                          </div>
                        </li>
                        <Divider />
                        <li>
                          <div style={{ padding: 2 }}>
                            Congratulations! Amy accepted your bid
                          </div>
                        </li>
                      </ul> */}
                    </Paper>
                  </div>
                </Popper>
              </div>
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
      />
      <CartModal handleClose={handleOpenCart} open={cartOpen} />
   
    </header>
  );
}

export default HeaderHome;